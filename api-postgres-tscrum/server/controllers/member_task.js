const member_task = require('../models').Member_task;

module.exports = {
  create(req, res) {

    if (!req.body.member_id)
      return res.status(400).send({message: 'The post body must contain a valid member_id field.'});

    if (!req.body.task_id || !Numbers.isInteger(req.body.task_id))
      return res.status(400).send({message: 'The post body must contain a valid task_id field.'});

    return member_task
      .create({
        member_id: req.body.member_id,
        task_id: req.body.task_id,
      })
      .then(member_task => res.status(200).send(member_task))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return member_task
      .findAll( {
      })
      .then(member_task => res.status(200).send(member_task))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {

    if (!req.params.id || !Numbers.isInteger(req.params.id))
      return res.status(400).send({message: 'The post body must contain a valid id field.'});

    return member_task
      .findById(req.params.id, {
      })
      .then(member_task => {
        if (!member_task) {
          return res.status(400).send({
            message: 'Member_task not found',
          });
        }
        return res.status(200).send(member_task);
      })
      .catch(error => res.status(400).send(member_task));
  },
  update(req, res) {

    if (!req.body.member_id)
      return res.status(400).send({message: 'The post body must contain a valid member_id field.'});

    if (!req.body.task_id || !Numbers.isInteger(req.body.task_id))
      return res.status(400).send({message: 'The post body must contain a valid task_id field.'});

    return member_task
      .findById(req.params.id, {
      })
      .then(member_task => {
        if (!member_task) {
          return res.status(400).send({
            message: 'Member_task not found',
          });
        }
        return member_task
          .update({
            member_id: req.body.member_id,
            task_id: req.body.task_id,
          })
          .then(() => res.status(200).send(member_task))  // Send back the updated tuple.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {

    if (!req.params.id || !Numbers.isInteger(req.params.id))
      return res.status(400).send({message: 'The post body must contain a valid id field.'});

    return member_task
      .findById(req.params.id)
      .then(member_task => {
        if (!member_task) {
          return res.status(400).send({
            message: 'Member_task not found',
          });
        }
        return member_task
          .destroy()
          .then(() => res.status(200).send({message: 'Member_task deleted.'}))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};