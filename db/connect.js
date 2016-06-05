"use strict"
let mongoose = require('mongoose');


module.exports = (cb,uri)=>{
	let mongoURI = uri ||
	process.env.MONGODB_URI || 
	process.env.MONGOLAB_URI || 
	process.env.MONGOHQ_URL ||
	`mongodb://localhost/restExpressAPIData`;

	console.log(`DB connecting to ${mongoURI}`);
	var db = mongoose.connect(mongoURI ,(error)=>{
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
