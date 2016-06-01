"use strict";
let express = require('express');
let app = new express();
let cities = require('./cities.json');
/*
app.get('/api',(req,res)=>{
	res.send(`
		<h1>API Docs</h1>
		<h2>api/cities</h2>
	`);
})
*/

let serverError = (m)=>{return {error:true,message:m}}
let isInteger = v=>v.match(/^[0-9]*$/);

// Set up static routes. Each static route is like a server of olden times.
app.use(express.static(`./client`));
app.use('/api',express.static(`./docs`));

let encodePassword = (p)=>{
	let SHA256 = require("crypto-js/sha256");
	let cryptoJS = require('crypto-js');
	let hash = SHA256(p);
	let encoded = hash.toString(cryptoJS.enc.Base64);
	return encoded;
}

let getAuthToken = (userId)=>{
	return "abcd";
}

;
console.log("message?",encodePassword("OK"));

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

let users = [{
	id:1,
	username:'floyd',
	password:encodePassword('floyd1')
},{
	id:2,
	username:'dave',
	password:encodePassword('dave1')
}]

// Custom authentication script
function isAuthenticated(req, res, next) 
{
	if (req.headers['authorization']) 
	{
		if (req.headers['authorization'] == "abcd") {
			return next();	
		} else {
			res.status(403).json(serverError("Failed to validate authentication token"));	
		}
		
	} else {
		res.status(401)
			.header({"WWW-Authenticate": 'Basic realm="User Visible Realm"'})
			.json(serverError("No Authorization header provided"));
	}
}

app.route('/api/login')
	.post((req,res)=>{
		if (!req.body.username) {
			return res
				.status(401)
				.header({"WWW-Authenticate": 'Basic realm="User Visible Realm"'})
				.json(serverError("No username provided"));
		}
	
		if (!req.body.password) {
			return res
				.status(401)
				.header({"WWW-Authenticate": 'Basic realm="User Visible Realm"'})
				.json(serverError("No password provided"));
		}
		let user = users.find(u=>u.username===req.body.username);
		if (!user) {
			return res
				.status(404)
				.json(serverError("No user found matching those credentials"));
		}
	
		if (user.password !== encodePassword(req.body.password)) {
			return res
				.status(401)
				.header({"WWW-Authenticate": 'Basic realm="User Visible Realm"'})
				.json(serverError("Incorrect password provided"));
		}
	
		res
			.status(200)
			.send({token:getAuthToken(user.id)})
	})

app.route('/api/cities')
	.get(isAuthenticated,(req,res)=>{
	console.log(typeof req.query.start);
		if (req.query.start > cities.length) {
			res.status(500).json(serverError("Index is too high"));
		}
		else if (req.query.start && !isInteger(req.query.start)) {
			res.status(500).json(serverError("Invalid start parameter"));
		}
		else if (req.query.count && !isInteger(req.query.count)) {
			res.status(500).json(serverError("Invalid count parameter"));
		} else {
			let count = parseInt(req.query.count) || 50;
			let start = parseInt(req.query.start) || 0;
			res.status(200).json(cities.slice(start,start+count));	
		}
	})

app.route('/api/cities/:id')
	.get(isAuthenticated,(req,res)=>{
		// Find the city in the database with the matching ID
		let city = cities.find(c=>c.id==req.params.id);
		if (city) {
			// Return the city to the client with a 300 (OK) status
			res.status(300).json(city);	
		} else {
			// Let the client know its search was invalid.
			res.status(404).json(serverError("No city by that ID found"));
		}
	})

app.listen(7777,()=>{
	console.log("App listnin.")
})