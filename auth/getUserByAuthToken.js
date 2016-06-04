"use strict"
let Token = require('./../db/models/Token.js');
let User = require('./../db/models/User.js');
console.log("Real get user by auth token");

module.exports = function getUserByAuthToken(token,cb) {
	// If authorization is disabled, just get first user. 
	// TODO: change this
	if (require('optimist').argv.noAuth) {
		return User.findOne({},(err,user)=>{
			cb(user);
		})
	}
	
	Token.findOne({value:token},(err,token)=>{
		User.findOne({id:token.userID},(err,user)=>{
			cb(user);
		})
	})
}
