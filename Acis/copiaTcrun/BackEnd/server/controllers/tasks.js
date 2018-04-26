const tasks = require('../models').Task;
const User_story = require('../models').User_story;
const Member = require('../models').Member;

module.exports = {
  create(req, res) {

    if (!req.body.duration || (isNaN(req.body.duration)))
      return res.status(400).send({
        message: 'The post body must contain a valid duration field. '
      });

    if (!req.body.name)
      return res.status(400).send({
        message: 'The post body must contain a valid name field.'
      });

    if (!req.body.completed)
      return res.status(400).send({
        message: 'The post body must contain a valid completed field.'
      });

    if (!req.body.user_story_id || (isNaN(req.body.user_story_id)))
      return res.status(400).send({
        message: 'The post body must contain a valid user_story_id field.'
      });

    return tasks
      .create({
        duration: req.body.duration,
        name: req.body.name,
        completed: req.body.completed,
        user_story_id: req.body.user_story_id,
      })
      .then(tasks => res.status(200).send(tasks))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return tasks
      .findAll({
        include: [
          {
            model: User_story,
            as: 'user_story'
          },
          {
            model: Member,
            as: 'members'
          }
        ],
      })
      .then(tasks => res.status(200).send(tasks))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {

    if (!req.params.id || (isNaN(req.params.id)))
      return res.status(400).send({
        message: 'The id field must be a valid integer.'
      });

    return tasks
      .findById(req.params.id, {
        include: [
          {
            model: User_story,
            as: 'user_story'
          },
          {
            model: Member,
            as: 'members'
          }
        ],
      })
      .then(tasks => {
        if (!tasks) {
          return res.status(400).send({
            message: 'Task not found',
          });
        }
        return res.status(200).send(tasks);
      })
      .catch(error => res.status(400).send(tasks));
  },
  listTaskWithUsers(req, res) //All users (members) that participate in a particular task
  {
    if (!req.params.id || isNaN(req.params.id))
      return res.status(400).send({
        message: 'The must contain a valid id field.'
      });

    return tasks.findById(req.params.id, {
        include: [{
          model: Member,
          as: 'users'
        }]
      })
      .then(tasks => {
        if (!tasks) {
          return res.status(400).send({
            message: 'Task not found',
          });
        }
        return res.status(200).send(tasks);
      })
      .catch(error => res.status(400).send(tasks));
  },
  update(req, res) {

    if (!req.params.id || isNaN(req.params.id))
      return res.status(400).send({
        message: 'The id is invalid'
      });

    if (req.body.user_story_id && isNaN(req.body.user_story_id))
      return res.status(400).send({
        message: 'The post body must contain a valid user_story_id field.'
      });

    return tasks
      .findById(req.params.id, {})
      .then(tasks => {
        if (!tasks) {
          return res.status(400).send({
            message: 'Task not found',
          });
        }
        return tasks
          .update({
            duration: req.body.duration || tasks.duration,
            name: req.body.name || tasks.name,
            completed: req.body.completed || tasks.completed,
            user_story_id: req.body.user_story_id || tasks.user_story_id,
          })
          .then(() => res.status(200).send(tasks)) // Send back the updated tuple.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {

    if (!req.params.id || isNaN(req.params.id))
      return res.status(400).send({
        message: 'The provided id field is invalid.'
      });

    return tasks
      .findById(req.params.id)
      .then(tasks => {
        if (!tasks) {
          return res.status(400).send({
            message: 'Task not found',
          });
        }
        return tasks
          .destroy()
          .then(() => res.status(200).send({
            message: 'Task deleted.'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};