"use strict"
let mongoose = require('mongoose');

module.exports = (cn,cb)=>{
	cn.db.dropDatabase(()=>{
    cb();
  })
}