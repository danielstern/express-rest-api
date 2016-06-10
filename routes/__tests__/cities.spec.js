jest.unmock('./../../db/models/User.js');
jest.unmock('./../../db/models/Token.js');
jest.unmock('mongoose');
jest.unmock('express');
jest.unmock('supertest');
jest.unmock('./../../db/drop-db.js');
jest.unmock('./../../db/init-db.js');
jest.unmock('./../../db/seed/users.json');
jest.unmock('./../../app.js');
jest.unmock('./../cities.js');
jest.unmock('./../cities/city.route.main.js');
jest.unmock('./../cities/city.route.get.js');
var request = require('supertest');
var mongoose = require('mongoose');
var User ;
var getUserByAuthToken = require('./../../auth/getUserByAuthToken.js');

process.on('uncaughtException', function(e) {
console.log('error');
	console.log(e);
});


var cn;
beforeEach((done)=>{	
	//console.log("Before each");
	userSeed = require('./../../db/seed/users.json');
	app = require.requireActual('./../../app.js'); 
	
	require('./../cities.js')(app); 
	//console.log("Before each 2");
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
	cn.close(done);
})

describe('GET /api/cities', function() {
	it('returns a list of the users cities',(done)=>{
		request(app)
			.get('/api/cities')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200,userSeed[0].cities)
			.end(function(err,res){
				console.log("err res?",err,res.status);
				done();
			})
	})
	
	it('starts at the specified index',(done)=>{
		request(app)
			.get('/api/cities?start=3')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200,userSeed[0].cities.slice(3),done)
	})
});




describe('POST /api/cities', function() {
	it('Adds the specified city',(done)=>{
		let testNewCity = {"area":"The Red Keep"};
		console.log("Making request...");
		request(app)
		.post(`/api/cities`)
		.send(testNewCity)
		.set('Accept', /application\/json/)
		.expect(300)
		.end(function(err,res){
			getUserByAuthToken(null,(user)=>{
					User.findOne({id:user.id},function(err,userModel){
						var orig = userModel.cities.find(c=>c.area === testNewCity.area);
						expect(orig.area).toEqual(testNewCity.area);
						expect(orig).not.toBeUndefined();
						done();						
					})
			})
		})
	})	
});


xdescribe('Worlds best test',function(){
	
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