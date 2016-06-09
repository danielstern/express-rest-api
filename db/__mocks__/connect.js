"use strict"
let mongoose = require('mongoose');


module.exports = (cb,uri)=>{
	let mongoURI = 	process.env.MONGODB_URI || 
	`mongodb://localhost/restExpressAPIDataTestData`;
	var db = mongoose.createConnection(mongoURI ,(error)=>{
		if (error) 
		{
			throw error;
		} 
		else 
		{
			console.log("Connected successfully");
			cb(db);	
		}	
	});
}
