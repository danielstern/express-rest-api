var request = require('supertest');
var express = require('express');

jest.mock('./../../auth/getUserByAuthToken.js');

describe('GET /api/cities', function() {
	it('responds with json', function(done) {
		var app = new express();
		require('./../cities.js')(app);
		request(app)
			.get('/api/cities')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/,done)
	});
});