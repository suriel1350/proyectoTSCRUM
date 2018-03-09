'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProyectoSchema = Schema({
	nombre: String,
	fecha_inicio: String,
	fecha_final: String,
	descripcion: String,
	background: String,
	risk: String,
	vision: String,	
	scope: String,	
	tecnologias: String
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);