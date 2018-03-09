'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas para los diferentes modelos que hemos ido creando
var user_routes = require('./routes/user');
var proyecto_routes = require('./routes/proyecto');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http para los diferetes CRUDs
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

//rutas base
app.use('/api', user_routes);
app.use('/api', proyecto_routes);
	//middleware
	
/*app.get('/pruebas', function(req, res){
	res.status(200).send({message: 'Bienvenido al curso de Aplicaciones Web'});
})*/

module.exports = app;