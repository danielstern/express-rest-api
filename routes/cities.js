"use strict"

let isInteger = require('./../util/filters/isInteger.js');
let getUserByAuthToken = require('./../auth/getUserByAuthToken.js');


module.exports = function(app){

	app.route('/api/cities')
	.get((req,res)=>{

		if (req.query.start && !isInteger(req.query.start)) {
			return res.status(500).json("Invalid start parameter");
		}
		if (req.query.count && !isInteger(req.query.count)) {
			return res.status(500).json("Invalid count parameter");
		}
		
		getUserByAuthToken(req.headers.authorization,(user)=>{

			if (req.query.start >= user.cities.length) {
				return res.status(500).json("Index is too high");
			}
			let count = parseInt(req.query.count) || 50;
			let start = parseInt(req.query.start) || 0;
			
			res.status(200).json(user.cities.slice(start,start+count));	
		})
	})
	.post((req,res)=>{
		console.log("Receive request");
		let city = req.body;
		let User = require('./../db/models/User.js')();
		getUserByAuthToken(req.headers.authorization,(user)=>{
			console.log("finding...")
			User.findOne({id:user.id},function(err,userModel){
				//console.log("Found user model.",userModel)
				
				userModel.cities.push(city);
				console.log("city?",err,userModel);
				userModel.save((err,obj)=>{
					console.log("Saved user",err,obj);
					console.log("Sending response");
					res.status(300).send();	
				})
			})
		})
	});

	require('./cities/city.route.main.js')(app);
	/*
	app.route('/api/cities/:id')
		.get((req,res)=>{
		console.log("App route cgo now!");
			// Find the city in the database with the matching ID
			getUserByAuthToken(req.headers.authorization,(user)=>{
				let city = user.cities.find(c=>c.id==req.params.id);
				if (city) {
					// Return the city to the client with a 300 (OK) status
					res.status(300).json(city);	
				} else {
					// Let the client know its search was invalid.
					res.status(404).json("No city by that ID found");
				}	
			})
		})
*/
}