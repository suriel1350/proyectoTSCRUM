'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_proyecto';

exports.createToken = function(user){
	var payload = {
		sub: user.id,
		matricula: user.matricula,
		nombre: user.nombre,
		carrera: user.carrera,
		fotografia: user.fotografia,
		role: user.role,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};

	return jwt.encode(payload, secret);
};