module.exports = function(app,cb) {
	let port = process.env.PORT || 7777;
	require('./db/connect.js')(()=>{
		console.log("Listening");
		app.listen(port,()=>{
			console.log(`App is listening on port ${port}.`)
			if (cb){cb()};
		})
	})
}