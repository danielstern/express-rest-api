"use strict";
let app = require('./app.js');
let express = require('express');
let isAuthenticated = require('./auth/auth.js');

console.info("Initialize REST API App");

// Set up static routes. Each static route is like a server of olden times.
app.use(express.static(`./client`));
app.use('/api',express.static(`./docs`));

app.use('/api/cities',isAuthenticated);
app.use('/api/cities/:id',isAuthenticated);
// Add plugins to our express app to allow it to interpret POST requests

if (require('optimist').argv.clearDB) {
  require('./init-db.js')();
}

require('./routes/login.js')(app);
require('./routes/cities.js')(app);

require('./app-listen.js')(app);
module.exports = app;