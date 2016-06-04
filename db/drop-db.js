"use strict"
let mongoose = require('mongoose');

module.exports = (cb)=>{
	mongoose.connection.db.dropDatabase(()=>{
    cb();
  })
}