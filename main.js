"use strict"
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

app.use(express.static(`./client`));
app.use('/api',express.static(`./docs`));
app.route('/api/cities')
	.get((req,res)=>{
		let count = 50 || req.query.count;
		let start = 0 || req.query.start;
		
		res.status(200)
			.json(cities.slice(start,count));
	})

app.route('/api/cities/:id')
	.get((req,res)=>{
		// Find the city in the database with the matching ID
		let city = cities.find(c=>c.id==req.params.id);
		if (city) {
			res.status(300)
				.json(city);	
		} else {
			// Let the client know its search was invalid.
			res.status(404)
				.json({message:"No city by that ID found"})
		}
		
	})

app.listen(7777,()=>{
	console.log("App listnin.")
})