"use strict"
//let users = require('./../db/seed/users.json');
let User = require('./../db/models/User.js');
let Token = require('./../db/models/Token.js');
let cryptoJS = require('crypto-js');

let encodePassword = (p)=>{
	let SHA256 = require("crypto-js/sha256");
	
	let hash = SHA256(p);
	let encoded = hash.toString(cryptoJS.enc.Base64);
	return encoded;
}

let getAuthToken = (userId)=>{

	var deferred = new Promise(function(resolve,reject){
		require('crypto').randomBytes(48, function(err, buffer) {
		var token = buffer.toString('hex');
			resolve(token);
		});	
	});
	
	return deferred;
}


module.exports = function(app){
	app.route('/api/login')
	.post((req,res)=>{
		console.log("Logging in...");
		if (!req.body.username) {
			return res
				.status(401)
				.header({"WWW-Authenticate": 'Basic realm="User Visible Realm"'})
				.json({error:true,message:"No username provided"});
		}
	
		if (!req.body.password) {
			return res
				.status(401)
				.header({"WWW-Authenticate": 'Basic realm="User Visible Realm"'})
				.json({error:true,message:"Incorrect password provided"});
		}
		
		//let user = users.find(u=>u.username===req.body.username);
			User.findOne({username:req.body.username},(err,user)=>{
				console.log(user);
				if (!user) {
				return res
					.status(404)
					.json({error:true,message:"No user found matching those credentials"});
			}

			if (user.password !== encodePassword(req.body.password)) {
				return res
					.status(401)
					.header({"WWW-Authenticate": 'Basic realm="User Visible Realm"'})
					.json({error:true,message:"Incorrect password provided"})
			}

			getAuthToken(user.id)
			.then((token)=>{
				new Token({userID:user.id,value:token}).save((err,t)=>{
					console.log("Created user token in DB",t);
					res
						.status(200)
						.send({token});
				})
				
			}).catch((e)=>{
				console.log("WTF?!?!");
				console.log(e);
			});
		})
		
		
	})
}