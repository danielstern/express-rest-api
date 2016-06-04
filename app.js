"use strict";
let express = require('express');
let app = new express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

module.exports = app;