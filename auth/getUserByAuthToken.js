"use strict"
module.exports = function getUserByAuthToken(token) {
	let tokens = require('./../db/seed/tokens.json');
	let users = require('./../db/seed/users.json');
	let userId = tokens.find(t=>t.token==token).id;
	console.log("tokens?",tokens,userId);
	let user = users.find(u=>u.id === userId);
	return user;
}
