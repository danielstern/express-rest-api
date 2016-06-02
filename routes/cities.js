"use strict"

//let cities = require('./../db/seed/cities.json');
let isInteger = v=>v.match(/^[0-9]*$/);
let getUserByAuthToken = require('./../auth/getUserByAuthToken.js');

module.exports = function(app){

	app.route('/api/cities')
	.get((req,res)=>{

		if (req.query.start > cities.length) {
			res.status(500).json(serverError("Index is too high"));
		}
		else if (req.query.start && !isInteger(req.query.start)) {
			res.status(500).json(serverError("Invalid start parameter"));
		}
		else if (req.query.count && !isInteger(req.query.count)) {
			res.status(500).json(serverError("Invalid count parameter"));
		} else {
			let user = getUserByAuthToken(req.headers.authorization);
			//console.log("User?",user,req.headers.authorization);
			// todo... fix this. not working.
			let userCities = cities[user.id];
			let count = parseInt(req.query.count) || 50;
			let start = parseInt(req.query.start) || 0;
			//console.log("User cities?",userCities,userCities.slice(start,start+count));
			res.status(200).json(userCities.slice(start,start+count));	
		}
	})

	
	app.route('/api/cities/:id')
		.get((req,res)=>{
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
		.post((req,res)=>{
			//let currentUserId = getUserToken;
		})

}