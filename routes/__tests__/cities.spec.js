var request = require('supertest');
var express = require('express');

var app = require('./../../main');

describe('GET /api/cities', function() {
	it('responds with json', function(done) {
		request(app)
			.get('/api/cities')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/,done)
	});
});