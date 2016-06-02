"use strict"
let mongoose = require('mongoose');

module.exports = ()=>{
	mongoose.connection.db.dropDatabase(()=>{
		console.log("Initializing database entries");
		let User = require('./models/User.js');
		let users = require('./seed/users.json');
		
		createUser(users.pop(),()=>{
			console.log("All users initialized");
			User.find((error,users)=>{
				console.log(JSON.stringify(users));
			})
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
		}
	});
}