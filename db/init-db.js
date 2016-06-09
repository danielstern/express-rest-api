"use strict"
let mongoose = require('mongoose');

module.exports = (cn,cb)=>{
	
  console.log("Initializing database entries");
  let User = require('./models/User.js')(cn);
  let users = require('./seed/users.json');
	
	console.log(User.create);
		console.log("User seed?",users);
		User.create(users,(err,res)=>{
    console.log("All users initialized",err,res);

    // TODO: remove inline testing after tests are implemented
    /*User.find((error,users)=>{
      console.log(JSON.stringify(users,null,2));
    })*/

    let Token = require('./models/Token.js');
    let tokens = require('./seed/tokens.json');

    // TODO: remove inline testing after tests are implemented
    Token.create(tokens,(err)=>{
      console.log("All tokens initialized");
			if (cb) {cb()};
      Token.find((error,tokens)=>{
        console.log(JSON.stringify(tokens,null,2));
      })

    })
	});	
	
  
}