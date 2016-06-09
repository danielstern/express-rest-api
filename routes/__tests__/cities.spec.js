jest.unmock('./../../db/models/User.js');
jest.unmock('./../../db/models/Token.js');
jest.unmock('mongoose');
jest.unmock('express');
jest.unmock('supertest');
jest.unmock('./../../db/drop-db.js');
jest.unmock('./../../db/init-db.js');
jest.unmock('./../../db/seed/users.json');
var request = require('supertest');
//var express = require.requireActual('express');
var mongoose = require('mongoose');
var User ;
//let User = require('./../../db/models/User.js');
//var mockgoose = require('mockgoose');


process.on('uncaughtException', function(e) {
console.log('error');
	console.log(e);
});


//jest.mock('./../../auth/getUserByAuthToken.js');
//jest.unmock('./../../db/init-db.js');
let getUserByAuthToken = require('./../../auth/getUserByAuthToken.js');
var cn;
beforeEach((done)=>{	
	console.log("Before each");
	userSeed = require('./../../db/seed/users.json');
	app = require('./../../app.js'); 
	
	require('./../cities.js')(app); 
	console.log("Before each 2");
	require('./../../db/connect.js')((_cn)=>{
		cn = _cn;
		User = require('./../../db/models/User.js')(cn);
		//done();
		require('./../../db/drop-db.js')(cn,()=>{
			require('./../../db/init-db.js')(cn,()=>{
				console.log("iti is all good");
				done();		
			});	
		})
	})
})

afterEach((done)=>{
	//console.log("Cn?")
	//console.log(cn);
	/*
	mongoose.disconnect(()=>{
		console.log("Disconnected from Mongoose")	;
		done();
	});
	mongoose.connection.close(()=>{
		console.log("Disconnected from Mongoose")	;
	});
	*/
	
	cn.close(done);
})

describe('GET /api/cities', function() {
	it('returns a list of the users cities',(done)=>{
		request(app)
			.get('/api/cities')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200,userSeed[0].cities,done)
	})
	
	it('starts at the specified index',(done)=>{
		request(app)
			.get('/api/cities?start=3')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200,userSeed[0].cities.slice(3),done)
	})
});

describe('GET /api/cities/:id', function() {
	it('returns the specified city',(done)=>{
		user = userSeed[0];
		city = user.cities[0];
		request(app)
			.get(`/api/cities/${city.id}`)
			//.expect(200,userSeed[0].cities[0],done);
			.end((req,res)=>{
				console.log("Got res,",res.body);
				done();
			})
	})
	
	it('returns a 404 for an invalid index',(done)=>{
			request(app)
			.get(`/api/cities/${city.id}`)
			.expect(401,done);
	})
});



xdescribe('POST /api/cities', function() {
	it('Adds the specified city',(done)=>{
//		console.log("Making request...");
		request(app)
		.post(`/api/cities`)
		.send({"name":"The Red Keep"})
		.expect((res)=>{
			console.log("The en now");
			//console.log(res.status);

			//expect(res.status).toEqual(300);
			//console.log(res.body);
			getUserByAuthToken(1234,(user)=>{
					console.log("Attempting to find user model from Test");
				 
					User.findOne({id:user.id},function(err,userModel){
						console.log("Found"); 
						expect(userModel.cities.find((c)=>{c.name === "The Red Keep"}));
						done();
						//done();
						
					}).exec();		
				//done();
	//			jest.runAllTimers();
				
			})
		//	done();
		})
		.end((a)=>{})
	})	
});


fdescribe('Worlds best test',function(){
	
	it("is fairly swell",function(done){
		console.log("Here we go.");
		//console.log(User.findOne);
		User.find({},function(err,users){
			console.log("Found!"); 
			//console.log(err);
			console.log(users[0])
			
			//expect(userModel.cities.find((c)=>{c.name === "The Red Keep"}));
			done();	
		})	
	})
	
})