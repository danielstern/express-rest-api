// Custom authentication script
"use strict"
let argv = require('optimist').argv;
let disableAuthentication = argv.noAuth;
//let tokens = require('./../db/seed/tokens.json');

module.exports = function isAuthenticated(req, res, next) 
{
	console.log("Checking request authentication...");
	
	if (disableAuthentication) {
		return next();
	}
	
	if (!req.headers['authorization']) {
		return res.status(401)
			.header({"WWW-Authenticate": 'Basic realm="User Visible Realm"'})
			.json({error:true,message:"No Authorization header provided"});
	}
	
	let Token = require('./../db/models/Token.js');
	
	Token.findOne({value:req.headers['authorization']},(err,token)=>{
		if (token) 
		{
			console.log("Token?",token);
			return next();	
		} else {
			res.status(403).json({error:true,message:"Failed to validate authentication token"});	
		}
	})
}
