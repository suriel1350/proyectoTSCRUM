const miembrosController = require('../controllers').miembros;
const proyectoController = require('../controllers').proyecto;

const technologiesController = require('../controllers').technology;
const project_technologyController = require('../controllers').project_technology;
const sprintsController = require('../controllers').sprints;
const userStoriesController = require('../controllers').user_stories;
const tasksController = require('../controllers').tasks;
const acceptance_criteriaController = require('../controllers').acceptance_criteria;
const member_taskController = require('../controllers').member_task;


var md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: '../uploads/users'});

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the TSCRUM API!',
  }));

  // Api Routes para Miembros
  app.post('/api/register', miembrosController.saveUser); 	//Ruta para registrar a un miembro
  app.post('/api/login', miembrosController.loginUser); 	//Ruta para loguearse (gethash devuelve el token)
  app.post('/api/upload-image-user/:id', [md_auth.ensureAuth, md_upload], miembrosController.uploadImage);  
  app.get('/api/miembros/:idUser', md_auth.ensureAuth, miembrosController.allMiembros); //Ruta para obtener todos los miembros
  app.get('/api/miembro/:idUser', md_auth.ensureAuth, miembrosController.getMiembro);	//Ruta para obtener un miembro
  app.get('/api/probando-controlador', md_auth.ensureAuth,miembrosController.pruebas);  
  app.get('/api/get-image-user/:imageFile', miembrosController.getImageFile);
  app.put('/api/update-user/:id', md_auth.ensureAuth, miembrosController.updateUser);  

  //Api Routes para Proyecto
  app.post('/api/proyecto/:idUser/crear', md_auth.ensureAuth,proyectoController.saveProject);
  app.get('/api/proyectos/:idUser', md_auth.ensureAuth, miembrosController.allProjects);
  
  //Api Rotes by Us
  app.get('/api/proyectos-inscrito/:idUser', md_auth.ensureAuth, proyectoController.getProjectsToMe);
  app.get('/api/proyectos-technos', md_auth.ensureAuth, proyectoController.getProjectsAndTechno);
  app.get('/api/proyecto-sprint/:idProject', md_auth.ensureAuth, proyectoController.getProjectAndSprint);
  
  app.get('/api/proyecto/get/:idProject', md_auth.ensureAuth, proyectoController.getProject);
  app.get('/api/proyecto-tecno/get/:idProject', md_auth.ensureAuth, proyectoController.getProjectAndTechno);
  app.post('/api/proyecto/agregar-miembros', md_auth.ensureAuth, proyectoController.agregaMiembros);
  app.delete('/api/proyecto/eliminar/:idProject', md_auth.ensureAuth, proyectoController.deleteProject);
  app.delete('/api/proyecto/eliminar-miembro/:idProject/:idUser', md_auth.ensureAuth, proyectoController.deleteMiembro);
  app.put('/api/update-project/:idProject', md_auth.ensureAuth, proyectoController.updateProject);   

  //Routes for the TECHNOLOGIES table
  app.post('/api/technologies', technologiesController.create);  
  app.get('/api/technologies', technologiesController.list);
  app.get('/api/technologies/:id', technologiesController.retrieve);
  app.put('/api/technologies/:id', technologiesController.update);
  app.delete('/api/technologies/:id', technologiesController.destroy);

  //Routes for the PROJECT_TECHNOLOGY table
  app.post('/api/project-technology', project_technologyController.create);  
  app.get('/api/project-technology', project_technologyController.list);
  app.get('/api/project-technology/:id', project_technologyController.retrieve);
  app.put('/api/project-technology/:id', project_technologyController.update);
  app.delete('/api/project-technology/:id', project_technologyController.destroy);

  //Routes fot the SPRINTS table
  app.post('/api/sprints', md_auth.ensureAuth, sprintsController.create);  
  app.get('/api/sprints', sprintsController.list);
  app.get('/api/sprints/:id', md_auth.ensureAuth, sprintsController.retrieve);
  app.put('/api/sprints/:id', sprintsController.update);
  app.delete('/api/sprints/:id', md_auth.ensureAuth, sprintsController.destroy);

  //Routes for the USER_STORIES table
  app.post('/api/user-stories', md_auth.ensureAuth, userStoriesController.create);  
  app.get('/api/user-stories', userStoriesController.list);
  app.get('/api/user-stories/:id', md_auth.ensureAuth, userStoriesController.retrieve);
  app.put('/api/user-stories/:id', md_auth.ensureAuth, userStoriesController.update);
  app.delete('/api/user-stories/:id', md_auth.ensureAuth, userStoriesController.destroy);

  //Routes for the ACCEPTANCE_CRITERIA table
  app.post('/api/acceptance-criteria', acceptance_criteriaController.create);  
  app.get('/api/acceptance-criteria', acceptance_criteriaController.list);
  app.get('/api/acceptance-criteria/:id', acceptance_criteriaController.retrieve);
  app.put('/api/acceptance-criteria/:id', acceptance_criteriaController.update);
  app.delete('/api/acceptance-criteria/:id', acceptance_criteriaController.destroy);

  //Routes for the MEMBER_TASK table
  app.post('/api/member-task', member_taskController.create);  
  app.get('/api/member-task', member_taskController.list);
  app.get('/api/member-task/:id', member_taskController.retrieve);
  app.put('/api/member-task/:id', member_taskController.update);
  app.delete('/api/member-task/:id', member_taskController.destroy);
};