"use strict"
let express = require('express');
let app = new express();
let cities = require('./cities.json');
/*
app.get('/api',(req,res)=>{
	res.send(`
		<h1>API Docs</h1>
		<h2>api/cities</h2>
	`);
})
*/

app.use(express.static(`./client`));
app.use('/api',express.static(`./docs`));
app.route('/api/cities')
	.get((req,res)=>{
		res.status(200)
			.json(cities);
	})

app.route('/api/cities/:id')
	.get((req,res)=>{
		console.log(req.params);
		//res.send('ok');
		let city = cities.find(c=>c.id=req.params.id);
		res.json(city);
	})

app.listen(7777,()=>{
	console.log("App listnin.")
})