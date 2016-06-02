"use strict";
let express = require('express');
let app = new express();
let isAuthenticated = require('./auth/auth.js');
let bodyParser = require('body-parser');

console.info("Initialize REST API App");

// Set up static routes. Each static route is like a server of olden times.
app.use(express.static(`./client`));
app.use('/api',express.static(`./docs`));

app.use('/api/cities',isAuthenticated);
app.use('/api/cities/:id',isAuthenticated);
// Add plugins to our express app to allow it to interpret POST requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


require('./routes/login.js')(app);
require('./routes/cities.js')(app);

let port = process.env.PORT || 7777;
require('./db/connect.js')(()=>{
	console.log("Listening");
	app.listen(port,()=>{
		console.log(`App is listening on port ${port}.`)
	})
})
