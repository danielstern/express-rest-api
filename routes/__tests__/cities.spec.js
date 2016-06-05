jest.unmock('./../../db/models/User.js');
jest.unmock('mongoose');

var request = require('supertest');
var express = require('express');
var mongoose = require('mongoose');
//var mockgoose = require('mockgoose');


let bodyParser = require('body-parser');

jest.mock('./../../auth/getUserByAuthToken.js');
//jest.unmock('./../../db/init-db.js');

/*
beforeEach(function(done) {
    mockgoose(mongoose).then(function() {
        mongoose.connect('mongodb://example.com/TestingDB', function(err) {
            done(err);
        });
    });
});
*/
beforeEach((done)=>{	
	userSeed = require('./../../db/seed/users.json');
	app = require('./../../app.js');
	require('./../cities.js')(app);
	require('./../../db/connect.js')(()=>{
		require('./../../db/init-db.js')(()=>{
			done();		
		});	
	})
})

afterEach((done)=>{
	mongoose.disconnect(()=>{
		console.log("Disconnected from Mongoose")	;
		done();
	});
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
		.end((err,res)=>{
			console.log(res.status);
			
		  console.error(err);
			expect(res.status).toEqual(300);
			console.log(res.body);
			console.log(res.body.cities);
			done();
		})
	})	
});