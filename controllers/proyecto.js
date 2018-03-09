'use strict'

var path  = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Proyecto = require('../models/proyecto');

function getProyecto(req, res){
	var proyectoId = req.params.id;

	Proyecto.findById(proyectoId, (err, proyecto) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});			
		}else{
			if(!proyecto){
				res.status(404).send({message: 'El proyecto no existe'});
			}else{
				res.status(200).send({proyecto});
			}
		}
	});
}

function getProyectos(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerPage = 4;

	Proyecto.find().sort('nombre').paginate(page, itemsPerPage, function(err, proyectos, total){
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!proyectos){
				res.status(404).send({message: 'No hay proyectos!!'});
			}else{
				return res.status(200).send({
					items_total: total,
					proyectos : proyectos
				});	
			}
		}
	});
}	

function saveProyecto(req, res){
	var proyecto = new Proyecto();

	var params = req.body;
	proyecto.nombre = params.nombre;
	proyecto.fecha_inicio = params.fecha_inicio;
	proyecto.fecha_final = params.fecha_final;
	proyecto.descripcion = params.descripcion;
	proyecto.background = params.background;
	proyecto.risk = params.risk;
	proyecto.vision = params.vision;
	proyecto.scope = params.scope;
	proyecto.tecnologias = params.tecnologias;

	proyecto.save((err, proyectoStored) => {
		if(err){
			res.status(500).send({message: 'Error al guardar el proyecto'});
		}else{
			if(!proyectoStored){
				res.status(404).send({message: 'El proyecto no ha sido guardado'});
			}else{
				res.status(200).send({proyecto: proyectoStored});
			}
		}
	});
}

function updateProyecto(req, res){
	var proyectoId = req.params.id;
	var update = req.body;

	Proyecto.findByIdAndUpdate(proyectoId, update, (err, proyectoUpdated) =>{
		if(err){
			res.status(500).send({message: 'Error al actualizar el proyecto'});
		}else{
			if(!proyectoUpdated){
				res.status(404).send({message: 'El proyecto no ha sido actualizado'});				
			}else{
				res.status(200).send({proyecto: proyectoUpdated});
			}
		}
	});
}	

function deleteProyecto(req, res){
	var proyectoId = req.params.id;

	Proyecto.findByIdAndRemove(proyectoId, (err, proyectoRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el proyecto'});
		}else{
			if(!proyectoRemoved){
				res.status(404).send({message: 'El proyecto no ha sido eliminado'});				
			}else{
				res.status(200).send({proyecto: proyectoRemoved});				
			}
		}
	});
}

module.exports = {
	getProyecto,
	saveProyecto,
	getProyectos,
	updateProyecto,
	deleteProyecto
};