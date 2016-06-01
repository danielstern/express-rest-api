// Custom authentication script
"use strict"
let argv = require('optimist').argv;
let disableAuthentication = argv.noAuth;
let tokens = require('./../db/seed/tokens.json');

module.exports = function isAuthenticated(req, res, next) 
{
	console.log("running is authenticated...");
	if (disableAuthentication) {
		return next();
	}
	if (req.headers['authorization']) 
	{
		//if (req.headers['authorization'] == "abcd") {
		if (tokens.find(t=>t.token === req.headers['authorization']))
		{
			return next();	
		} else {
			res.status(403).json({error:true,message:"Failed to validate authentication token"});	
		}
		
	} else {
		res.status(401)
			.header({"WWW-Authenticate": 'Basic realm="User Visible Realm"'})
			.json(serverError({error:true,message:"No Authorization header provided"}));
	}
}
