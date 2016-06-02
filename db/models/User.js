"use strict";
let mongoose = require(`mongoose`);

module.exports = mongoose.model(`User`, {
	username:String,
	email:String,
	id:String,
	cities:[{
		area:String,
		userHasVisited:String,
	}]
});