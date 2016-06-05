jest.unmock('./../../db/models/User.js');
jest.unmock('mongoose');

var request = require('supertest');
var express = require('express');
var mongoose = require('mongoose');
let User = require.requireActual('./../../db/models/User.js');
//var mockgoose = require('mockgoose');



let bodyParser = require('body-parser');

jest.mock('./../../auth/getUserByAuthToken.js');
//jest.unmock('./../../db/init-db.js');
let getUserByAuthToken = require('./../../auth/getUserByAuthToken.js');
var cn;
beforeEach((done)=>{	
	userSeed = require('./../../db/seed/users.json');
	app = require('./../../app.js');
	require('./../cities.js')(app);
	require('./../../db/connect.js')((_cn)=>{
		cn = _cn;
		require('./../../db/drop-db.js')(()=>{
			require('./../../db/init-db.js')(()=>{
				done();		
			});	
		})
	})
})

afterEach((done)=>{
	mongoose.disconnect(()=>{
		console.log("Disconnected from Mongoose")	;
		done();
	});
	mongoose.connection.close(()=>{
		console.log("Disconnected from Mongoose")	;
	});
	
	cn.disconnect();
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

fdescribe('POST /api/cities', function() {
	it('Adds the specified city',(done)=>{
		console.log("Making request...");
		request(app)
		.post(`/api/cities`)
		.send({"name":"The Red Keep"})
		.expect((err,res)=>{
			console.log(res.status);
			/*require('./../../db/connect.js')((_cn)=>{
				console.log("test?");
				User.find({},function(err,all){
					console.log("All results..",all);
				});
			});*/
			
			
			
		 // console.error(err);
			expect(res.status).toEqual(300);
		//	console.log(res.body);
			getUserByAuthToken(1234,(user)=>{
				console.log("Auth token...");
					console.log("Attempting to find user model from Test",user.id,User);
				
					User.findOne({id:user.id},function(err,userModel){
						console.log("Found user model.",userModel)
						console.log(userModel.cities)
						
					});	
					jest.runAllTimers();
				
				
				
			})
			
		//	console.log(res.body.cities);
			
		})
		.end(()=>{
			console.log("The en now");
			done();
		})
	})	
});