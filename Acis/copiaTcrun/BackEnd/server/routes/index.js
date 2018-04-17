const authMiddleware = require('../middlewares/authentication');

const tasksController = require('../controllers').tasks;
const logsController = require('../controllers').logs;
const sprintsController = require('../controllers').sprints;
const membersController = require('../controllers').members;
const acceptance_criteriaController = require('../controllers').acceptance_criteria;
const member_taskController = require('../controllers').member_task;
const member_projectController = require('../controllers').member_project;
const projectsController = require('../controllers').projects;
const project_technologyController = require('../controllers').project_technology;
const userStoriesController = require('../controllers').user_stories;
const authenticationController = require('../controllers').authentication;
const technologiesController = require('../controllers').technology;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the TCRUM Project API!',
  }));

  //Autentication routes
  app.post('/api/login', authenticationController.login);

  //Routes for the TASKS table
  app.post('/api/tasks', tasksController.create);  
  app.get('/api/tasks', tasksController.list);
  app.get('/api/tasks-members/:id', tasksController.listTaskWithUsers);
  app.get('/api/tasks/:id', tasksController.retrieve);
  app.put('/api/tasks/:id', tasksController.update);
  app.delete('/api/tasks/:id', tasksController.destroy);

  //Routes for the LOGS table
  app.post('/api/logs', logsController.create);  
  app.get('/api/logs', logsController.list);
  app.get('/api/logs/:id', logsController.retrieve);

  //Routes fot the SPRINTS table
  app.post('/api/sprints', sprintsController.create);  
  app.get('/api/sprints', sprintsController.list);
  app.get('/api/sprints/:id', sprintsController.retrieve);
  app.put('/api/sprints/:id', sprintsController.update);
  app.delete('/api/sprints/:id', sprintsController.destroy);

  //Routes for the MEMBERS table
  app.post('/api/members', membersController.create);
  app.get('/api/members', membersController.list);
  app.get('/api/members/:id', membersController.retrieve);
  app.put('/api/members/:id', membersController.update);
  app.delete('/api/members/:id', membersController.destroy);

  //Routes for the Project table
  app.post('/api/projects', projectsController.create);  
  app.get('/api/projects', projectsController.list);
  app.get('/api/projects/:id', projectsController.retrieve);
  app.put('/api/projects/:id', projectsController.update);
  app.delete('/api/projects/:id', projectsController.destroy);
  
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

  //Routes for the MEMBER_PROJECT table
  app.post('/api/member-project', member_projectController.create);  
  app.get('/api/member-project', member_projectController.list);
  app.get('/api/member-project/:id', member_projectController.retrieve);
  app.put('/api/member-project/:id', member_projectController.update);
  app.delete('/api/member-project/:id', member_projectController.destroy);

  //Routes for the PROJECT_TECHNOLOGY table
  app.post('/api/project-technology', project_technologyController.create);  
  app.get('/api/project-technology', project_technologyController.list);
  app.get('/api/project-technology/:id', project_technologyController.retrieve);
  app.put('/api/project-technology/:id', project_technologyController.update);
  app.delete('/api/project-technology/:id', project_technologyController.destroy);

  //Routes for the USER_STORIES table
  app.post('/api/user-stories', userStoriesController.create);  
  app.get('/api/user-stories', userStoriesController.list);
  app.get('/api/user-stories/:id', userStoriesController.retrieve);
  app.put('/api/user-stories/:id', userStoriesController.update);
  app.delete('/api/user-stories/:id', userStoriesController.destroy);
  
  //Routes for the TECHNOLOGIES table
  app.post('/api/technologies', technologiesController.create);  
  app.get('/api/technologies', technologiesController.list);
  app.get('/api/technologies/:id', technologiesController.retrieve);
  app.put('/api/technologies/:id', technologiesController.update);
  app.delete('/api/technologies/:id', technologiesController.destroy);
};