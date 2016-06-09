module.exports = function(app){
	var route = app.route('/api/cities/:id');
	require('./city.route.get.js')(route);
	return route;
}