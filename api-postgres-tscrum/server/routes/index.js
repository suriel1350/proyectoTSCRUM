const miembrosController = require('../controllers').miembros;
var md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: '../uploads/users'});

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the TSCRUM API!',
  }));

  app.post('/api/register', miembrosController.saveUser); 	//Ruta para registrar a un miembro
  app.post('/api/login', miembrosController.loginUser); 	//Ruta para loguearse (gethash devuelve el token)
  app.post('/api/upload-image-user/:id', [md_auth.ensureAuth, md_upload], miembrosController.uploadImage);  
  app.get('/api/miembros', miembrosController.allMiembros);	//Ruta para obtener todos los miembros
  app.get('/api/probando-controlador', md_auth.ensureAuth,miembrosController.pruebas);  
  app.get('/api/get-image-user/:imageFile', miembrosController.getImageFile);
  app.put('/api/update-user/:id', md_auth.ensureAuth, miembrosController.updateUser);  
};