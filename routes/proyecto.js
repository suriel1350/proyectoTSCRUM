'use strict'

var express = require('express');
var ProyectoController = require('../controllers/proyecto');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

api.get('/proyecto/:id', md_auth.ensureAuth, ProyectoController.getProyecto);
api.post('/proyecto', md_auth.ensureAuth, ProyectoController.saveProyecto);
api.get('/proyecto/:page?', md_auth.ensureAuth, ProyectoController.getProyectos);
api.put('/proyecto/:id', md_auth.ensureAuth, ProyectoController.updateProyecto);
api.delete('/proyecto/:id', md_auth.ensureAuth, ProyectoController.deleteProyecto);

module.exports = api;