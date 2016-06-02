"use strict"
let mongoose = require('mongoose');

module.exports = ()=>{
	mongoose.connection.db.dropDatabase(()=>{
		console.log("Initializing database entries");
		let User = require('./models/User.js');
		let users = require('./seed/users.json');
		
		User.create(users,(err)=>{
			console.log("All users initialized");
			User.find((error,users)=>{
				console.log(JSON.stringify(users));
			})
			
			let Token = require('./models/Token.js');
			let tokens = require('./seed/tokens.json');
			
			Token.create(tokens,(err)=>{
				console.log("All tokens initialized");
				Token.find((error,tokens)=>{
					console.log(JSON.stringify(tokens));
				})
				
			})
		})
		
		/*
		createUser(users.pop(),()=>{
			
		})
		
		function createUser(user,cb) {
			new User(user).save(()=>{
				if (users.length > 0) 
				{
					createUser(users.pop(),cb);
				} 
				else 
				{
					cb();	
				}
			});
		}*/
	});
}