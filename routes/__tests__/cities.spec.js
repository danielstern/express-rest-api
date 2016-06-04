var request = require('supertest');
var express = require('express');

jest.mock('./../../auth/getUserByAuthToken.js');

beforeEach(()=>{
	app = new express();
	userSeed = require('./../../db/seed/users.json');
	require('./../cities.js')(app);
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
			.expect(200,userSeed[0].cities[0],done);
	})
	
	it('returns a 404 for an invalid index',(done)=>{
		request(app)
			request(app)
			.get(`/api/cities/${city.id}`)
			.expect(401,done);
	})
});