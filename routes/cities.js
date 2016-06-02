"use strict"

//let cities = require('./../db/seed/cities.json');
let isInteger = v=>v.match(/^[0-9]*$/);
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
			console.log("User?",user,req.headers.authorization);
			let userCities = user.cities;	

			if (req.query.start >= user.cities.length) {
				return res.status(500).json("Index is too high");
			}
			let count = parseInt(req.query.count) || 50;
			let start = parseInt(req.query.start) || 0;
//			console.log("count,start",count,start,user.cities,user.cities.slice(start,start+count));
			res.status(200).json(user.cities.slice(start,start+count));	
		})

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