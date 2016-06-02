"use strict"
let mongoose = require('mongoose');

module.exports = ()=>{
	mongoose.connection.db.dropDatabase(()=>{
		console.log("Initializing database entries");
		let User = require('./models/User.js');
		let users = require('./seed/users.json');
		
		User.create(users,(err)=>{
			console.log("All users initialized");
			
			// TODO: remove inline testing after tests are implemented
			User.find((error,users)=>{
				console.log(JSON.stringify(users,null,2));
			})
			
			let Token = require('./models/Token.js');
			let tokens = require('./seed/tokens.json');
			
			// TODO: remove inline testing after tests are implemented
			Token.create(tokens,(err)=>{
				console.log("All tokens initialized");
				Token.find((error,tokens)=>{
					console.log(JSON.stringify(tokens,null,2));
				})
				
			})
		})
	});
}