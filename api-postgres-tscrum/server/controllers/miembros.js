const Miembros = require('../models').Miembros;
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
//var fileUpload = require('express-fileupload');

function pruebas(req, res){
	res.status(200).send({
		message: 'Probando una accion del controlador de usuarios del api rest con Node y Postgres'
	});
}

function saveUser(req, res){
	var params = req.body;
	var pass;
	console.log(params);

	Miembros.findOne({
		where: {
			matricula: params.matricula,
		}
	})
	.then(user => {
		if(!user){
			//Aqui ya podemos registrar al usuario
			if(params.password){
				//Encriptar contraeeña y guardar datos
				bcrypt.hash(params.password, null, null, function(err, hash){
					pass = hash;

					if(params.matricula != null && params.nombre != null && params.carrera != null){
						//GUaradar el usuario 				
						return Miembros
					      .create({
					        matricula: params.matricula,
					        nombre: params.nombre,
					        carrera: params.carrera,			      
					        fotografia: 'null',
					        role: 'ROLE_USER',
					        password: pass,
					      })
					      .then(user => res.status(201).send(user))
					      .catch(error => res.status(400).send(error));

					}else{
						res.status(500).send({message: 'Rellena todos los campos'});
					}
				});
			}else{
				res.status(200).send({message: 'Introduce la contraseña'});
			}			
		}
		else
		{
			res.status(200).send({message: 'El miembro ya existe'});	
		}
	})
	.catch(error => res.status(400).send(error));
}

function allMiembros(req, res){
	return Miembros
		.all()
		.then(user => res.status(200).send(user))
		.catch(error => res.status(400).send(error));
}

function loginUser(req, res){
	var params = req.body;

	var matricula = params.matricula;
	var password = params.password;


	Miembros.findOne({
		where: {
			matricula: matricula.toLowerCase(),
		}
	})
	.then(user => {
		if(!user){
			res.status(404).send({message: 'El usuario no existe'});			
		}else{
			bcrypt.compare(password, user.password, function(err, check){
				if(check){
					//devolver los datos del usuarip logueado
					if(params.gethash){
						//devolver un token de jwt
						res.status(200).send({
							token: jwt.createToken(user)
						});
					}else{
						res.status(200).send({user});							
					}
				}else{
					res.status(404).send({message: 'El usuario no ha podido loguearse'});						
				}
			});		
		}
	})
	.catch(error => res.status(500).send({message: 'Error en la peticion'}));
}

function uploadImage(req, res){
	var userId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('/');
		var file_name = file_split[3];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		console.log(file_path);

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif')
		{		
			var oldpath = req.files.image.path;
		      var newpath = './server/uploads/users/' + file_name;
		      fs.rename(oldpath, newpath, function (err) {
		        if (err){
		        	res.status(404).send({message: 'Error subiendo file'});
		        }
		        else{
		        	return Miembros
					    .findById(userId)
					    .then(user => {
					      if (!user) {
					        return res.status(404).send({message: 'El miembro no existe',});
					      }
					      else{
						      return user
						        .update({
						          fotografia: file_name || user.fotografia,
						        })
						        .then(() => {
						        	res.status(200).send(user)			        	
						        	  
						        })  // Send back the updated user
						        .catch((error) => res.status(400).send({message: 'Error en Update'}));
						  }
					    })
					    .catch((error) => res.status(400).send(error));			        	
		        }
		      });	
					
		}
		else
		{
			res.status(200).send({message: 'Extensión del archivo no válida'});
		}
	}
	else
	{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './server/uploads/users/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen'});
		}
	});
}

function updateUser(req, res){
	var userId = req.params.id;
	var update = req.body;
	var params = req.body;
	var pass;

	if(params.matricula){		
		Miembros.findOne({
			where: {
				matricula: params.matricula,
			}
		})
		.then(user => {
			if(!user){
				//Aqui ya podemos actualizar al usuario
				if(params.password){
					bcrypt.hash(params.password, null, null, function(err, hash){
						pass = hash;

						if(params.matricula != null && params.nombre != null && params.carrera != null){
							//Actualizar el usuario 				
							return Miembros
							    .findById(userId)
							    .then(user => {
							      if (!user) {
							        return res.status(404).send({message: 'El miembro no existe',});
							      }
							      else{
								      return user
								        .update({					          	
								          	matricula: params.matricula || user.matricula,
									        nombre: params.nombre || user.nombre,
									        carrera: params.carrera || user.carrera,						        
									        password: pass,
								        })
								        .then(() => {
								        	res.status(200).send(user)			        	
								        	  
								        })  // Send back the updated user
								        .catch((error) => res.status(400).send({message: 'Error en Update'}));
								  }
							    })
							    .catch((error) => res.status(400).send(error));

						}else{
							res.status(500).send({message: 'Rellena todos los campos'});
						}
					});
				}else{
					if(params.matricula != null && params.nombre != null && params.carrera != null){
						//Actualizar el usuario 				
						return Miembros
						    .findById(userId)
						    .then(user => {
						      if (!user) {
						        return res.status(404).send({message: 'El miembro no existe',});
						      }
						      else{
							      return user
							        .update({					          	
							          	matricula: params.matricula || user.matricula,
								        nombre: params.nombre || user.nombre,
								        carrera: params.carrera || user.carrera,
							        })
							        .then(() => {
							        	res.status(200).send(user)			        	
							        	  
							        })  // Send back the updated user
							        .catch((error) => res.status(400).send({message: 'Error en Update'}));
							  }
						    })
						    .catch((error) => res.status(400).send(error));

					}else{
						res.status(500).send({message: 'Rellena todos los campos'});
					}
				}

			}else{
				res.status(200).send({message: 'El miembro ya existe'});				
			}
		})
		.catch(error => res.status(400).send(error));
	}else{
		if(params.password){
					bcrypt.hash(params.password, null, null, function(err, hash){
						pass = hash;

						if(params.nombre != null && params.carrera != null){
							//Actualizar el usuario 				
							return Miembros
							    .findById(userId)
							    .then(user => {
							      if (!user) {
							        return res.status(404).send({message: 'El miembro no existe',});
							      }
							      else{
								      return user
								        .update({					          	
								          	matricula: params.matricula || user.matricula,
									        nombre: params.nombre || user.nombre,
									        carrera: params.carrera || user.carrera,						        
									        password: pass,
								        })
								        .then(() => {
								        	res.status(200).send(user)			        	
								        	  
								        })  // Send back the updated user
								        .catch((error) => res.status(400).send({message: 'Error en Update'}));
								  }
							    })
							    .catch((error) => res.status(400).send(error));

						}else{
							res.status(500).send({message: 'Rellena todos los campos'});
						}
					});
				}else{
					if(params.nombre != null && params.carrera != null){
						//Actualizar el usuario 				
						return Miembros
						    .findById(userId)
						    .then(user => {
						      if (!user) {
						        return res.status(404).send({message: 'El miembro no existe',});
						      }
						      else{
							      return user
							        .update({					          	
							          	matricula: params.matricula || user.matricula,
								        nombre: params.nombre || user.nombre,
								        carrera: params.carrera || user.carrera,
							        })
							        .then(() => {
							        	res.status(200).send(user)			        	
							        	  
							        })  // Send back the updated user
							        .catch((error) => res.status(400).send({message: 'Error en Update'}));
							  }
						    })
						    .catch((error) => res.status(400).send(error));

					}else{
						res.status(500).send({message: 'Rellena todos los campos'});
					}
				}	
	}
}

module.exports = {
  pruebas,
  saveUser,
  allMiembros,
  loginUser,
  uploadImage,
  getImageFile,
  updateUser,
};