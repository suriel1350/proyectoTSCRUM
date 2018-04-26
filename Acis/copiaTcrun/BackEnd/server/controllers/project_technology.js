const Project_technology = require('../models').Project_technologies;

module.exports = {
  create(req, res) {

    if (!req.body.technology_id)
      return res.status(400).send({message: 'The post body must contain a valid technology_id field.'});

    if (!req.body.project_id)
      return res.status(400).send({message: 'The post body must contain a valid project_id field.'});

    if (!req.body.version)
        return res.status(400).send({message: 'The post body must contain a valid version field.'});

    return Project_technology
      .create({
        technology_id: req.body.technology_id,
        project_id: req.body.project_id,
        version: req.body.version
      })
      .then(Project_technology => res.status(200).send(Project_technology))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Project_technology
      .findAll( {
    })
      .then(Project_technology => res.status(200).send(Project_technology))
      .catch(error => res.status(400).send(error));
  },
  
  retrieve(req, res) {

    if (!req.params.id)
      return res.status(400).send({message: 'The post body must contain a valid id field.'});

    return Project_technology
      .findById(req.params.id, {
      })
      .then(Project_technology => {
        if (!Project_technology) {
          return res.status(400).send({
            message: 'Project_technology not found',
          });
        }
        return res.status(200).send(Project_technology);
      })
      .catch(error => res.status(400).send(Project_technology));
  },
  
  update(req, res) {

    if (!req.body.technology_id)
      return res.status(400).send({message: 'The post body must contain a valid technology_id field.'});

    if (!req.body.project_id)
      return res.status(400).send({message: 'The post body must contain a valid project_id field.'});

    if (!req.body.version)
      return res.status(400).send({message: 'The post body must contain a valid version field.'});

    return Project_technology
      .findById(req.params.id, {
      })
      .then(Project_technology => {
        if (!Project_technology) {
          return res.status(400).send({
            message: 'Project_technology not found',
          });
        }
        return Project_technology
          .update({
            technology_id: req.body.technology_id,
            project_id: req.body.project_id,
            version: req.body.version
          })
          .then(() => res.status(200).send(Project_technology))  // Send back the updated tuple.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  
  destroy(req, res) {

    if (!req.params.id)
      return res.status(400).send({message: 'The post body must contain a valid id field.'});

    return Project_technology
      .findById(req.params.id)
      .then(Project_technology => {
        if (!Project_technology) {
          return res.status(400).send({
            message: 'Project_technology not found',
          });
        }
        return Project_technology
          .destroy()
          .then(() => res.status(200).send({message: 'Project_technology deleted.'}))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};