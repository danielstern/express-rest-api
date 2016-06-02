"use strict";
let mongoose = require(`mongoose`);

module.exports = mongoose.model(`Token`, {
	userID:String,
	value:String,
	date:Date,
	expiry:Date
});