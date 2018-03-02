'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/proyecto_tscrum', (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("La conexion con la base de datos es correcta...");

		app.listen(port, function(){
			console.log("Servidor del api rest en htpp://localhost:" + port);
		});
	}
});