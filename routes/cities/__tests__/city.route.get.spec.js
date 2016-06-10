jest.unmock('./../../../db/models/User.js');
jest.unmock('mongoose');
jest.unmock('express');
jest.unmock('supertest');
jest.unmock('./../../../db/models/Token.js');
jest.unmock('./../../../db/drop-db.js');
jest.unmock('./../../../db/init-db.js');
jest.unmock('./../../../db/seed/users.json');
jest.unmock('./../../../app.js');
jest.unmock('./../../cities.js');
jest.unmock('./../city.route.main.js');
jest.unmock('./../city.route.get.js');
var request = require('supertest');
var mongoose = require('mongoose');
var cn;
/*
beforeEach((done)=>{	
	//console.log("Before each");
	userSeed = require('./../../../db/seed/users.json');
	app = require.requireActual('./../../../app.js'); 
	
	require('./../../cities.js')(app); 
	//console.log("Before each 2");
	require('./../../../db/connect.js')((_cn)=>{
		cn = _cn;
		User = require('./../../../db/models/User.js')(cn);
		//done();
		require('./../../../db/drop-db.js')(cn,()=>{
			require('./../../../db/init-db.js')(cn,()=>{
				console.log("iti is all good");
				done();		
			});	
		})
	})
})

afterEach((done)=>{
	cn.close(done);
})
*/
beforeEach(function(done){
	app = require('./../../../app.js');
	done();
})
fdescribe('GET /api/cities/:id', function() {
	fit('returns the specified city',(done)=>{
		var app = require('express')();
		require('./../city.route.main.js')(app);
		userSeed = require('./../../../db/seed/users.json');
		user = userSeed[0];
		city = user.cities[0];
		console.log("City?",city);
		request(app)
			.get(`/api/cities/${city.id}`)
			.expect(2000)
			//.expect(userSeed[0].cities[0])
			.end((req,res)=>{
				console.log("Got res,",res.body);
				expect(res.body).toEqual(city);
				done();
			})
	})
	
	it('returns a 404 for an invalid index',(done)=>{
			request(app)
			.get(`/api/cities/${'test'}`)
			.expect(401,done);
	})
});