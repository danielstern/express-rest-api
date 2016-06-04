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
			.end(function(err,res){
				//console.log(err,res.body);
				expect(res.body).toEqual(userSeed[0].cities);
				done();
			})
	})
	
	it('starts at the specified index',(done)=>{
		request(app)
			.get('/api/cities?start=3')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err,res){
				expect(res.body).not.toEqual(userSeed[0].cities.slice(0));
				expect(res.body).toEqual(userSeed[0].cities.slice(3));
				done();
			})
	})
});