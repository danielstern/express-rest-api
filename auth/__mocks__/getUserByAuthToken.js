//console.log("Mocked get user auth token");

module.exports = function(token,cb) {
	cb(require('./../../db/seed/users.json')[0]);
}
