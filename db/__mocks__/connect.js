"use strict"
let mongoose = require('mongoose');


module.exports = (cb,uri)=>{
	console.log("Mock connect");
	let mongoURI = 	process.env.MONGODB_URI || 
	`mongodb://localhost/restExpressAPIDataTestData`;
	console.log(`DB connecting to ${mongoURI}`);
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
