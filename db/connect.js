"use strict"
let mongoose = require('mongoose');

let mongoURI = process.env.MONGODB_URI || 
	process.env.MONGOLAB_URI || 
	process.env.MONGOHQ_URL ||
	`mongodb://localhost/restExpressAPIData`;

module.exports = (cb)=>{
	console.log(`DB connecting to ${mongoURI}`);
	mongoose.connect(mongoURI ,(error)=>{
		if (error) 
		{
			throw error;
		} 
		else 
		{
			console.log("Connected successfully");
			cb();	
		}
		
	});
}
