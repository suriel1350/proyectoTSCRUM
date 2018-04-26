const member_project = require('../models').Member_projects;

module.exports = {
  create(req, res) {

    if (!req.body.member_id)
      return res.status(400).send({message: 'El atributo member_id no puede estar vacio y debe ser un numero entero.'});

    if (!req.body.project_id)
      return res.status(400).send({message: 'El atributo project_id no puede estar vacio y debe ser un numero entero.'});

    return member_project
      .create({
        member_id: req.body.member_id,
        project_id: req.body.project_id,
        project_role: req.body.project_role
      })
      .then(member_project => res.status(200).send(member_project))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return member_project
      .findAll( {
      })
      .then(member_project => res.status(200).send(member_project))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {

    if (!req.params.id)
      return res.status(400).send({message: 'El atributo id no puede estar vacio y debe ser un numero entero.'});

    return member_project
      .findById(req.params.id, {
      })
      .then(member_project => {
        if (!member_project) {
          return res.status(400).send({
            message: 'Member_project not found',
          });
        }
        return res.status(200).send(member_project);
      })
      .catch(error => res.status(400).send(member_project));
  },
  update(req, res) {

    if (!req.body.member_id)
      return res.status(400).send({message: 'El atributo member_id no puede estar vacio y debe ser un numero entero.'});

    if (!req.body.project_id)
      return res.status(400).send({message: 'El atributo project_id no puede estar vacio y debe ser un numero entero.'});

    return member_project
      .findById(req.params.id, {
      })
      .then(member_project => {
        if (!member_project) {
          return res.status(400).send({
            message: 'Member_project not found',
          });
        }
        return member_project
          .update({
            member_id: req.body.member_id,
            project_id: req.body.project_id,
          })
          .then(() => res.status(200).send(member_project))  // Send back the updated tuple.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {

    if (!req.params.id)
      return res.status(400).send({message: 'El atributo id no puede estar vacio y debe ser un numero entero.'});

    return member_project
      .findById(req.params.id)
      .then(member_project => {
        if (!member_project) {
          return res.status(400).send({
            message: 'Member_project not found',
          });
        }
        return member_project
          .destroy()
          .then(() => res.status(200).send({message: 'Member_project deleted.'}))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};