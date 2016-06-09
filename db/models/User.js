"use strict";
let mongoose = require(`mongoose`);
let user;
module.exports = function(cn){
	if (user) {
		return user;
	}
	user = cn.model(`User`, {
		username:String,
		password:String,
		id:String,
		cities:[{
			area:String,
			userHasVisited:String,
			id:String
		}]
	});
	return user;
};