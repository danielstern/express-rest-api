let getUserByAuthToken = require('./../../auth/getUserByAuthToken.js');

module.exports = function(route){
	route.get((req,res)=>{
		console.log("City route get");
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
}
