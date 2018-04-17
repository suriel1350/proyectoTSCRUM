const Sprint = require('../models').Sprint;
const UserStory = require('../models').User_story;
const Project = require('../models').Project;

module.exports = {
    create(req, res) {
        if (!req.body.days) {
            return res.status(400).send({ message: 'Days attribute can not be an empty field.' });
        }

        if (!req.body.project_id){
            return res.status(400).send({message: 'The post body must contain a valid project id field.'})
        }

        return Sprint
            .create({
                days: req.body.days,
                comment: req.body.comment,
                project_id: req.body.project_id,
            })
            .then(Sprint => res.status(200).send(Sprint))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {

        return Sprint
            .findAll({
                include: [
                    { 
                        model: UserStory,
                        as: 'user_stories'
                    },
                    {
                        model: Project,
                        as: 'project',
                        required: true,
                        attributes : ['id', 'vision', 'name', 'begin_date', 'end_date', 'background', 'risks', 'reach', 'createdAt', 'updatedAt', 'scrum_master_id']
                    },
                ],
            })
            .then(Sprints => res.status(200).send(Sprints))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {

        // check that Sprint_id is not null
        if (!req.params.id && !req.params.id === parseInt(req.params.id, 10)) {
            return res.status(400).send({ message: 'ID attribute can not be an empty field.' });
        }

        return Sprint
            .findById(req.params.id, {
                include: [{ 
                        model: UserStory,
                        as: 'user_stories'
                    },
                    {
                        // association: 'projects'
                        model: Project,
                        as: 'project',
                        required: true,
                        //Without this line of attributes, it fails!!
                        attributes : ['id', 'vision', 'name', 'begin_date', 'end_date', 'background', 'risks', 'reach', 'createdAt', 'updatedAt', 'scrum_master_id']
                    }],
            })
            .then(Sprint => {
                if (!Sprint) {
                    return res.status(404).send({ message: 'Sprint not found.' });
                }
                return res.status(200).send(Sprint);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {

        // If user is passing days parameter, we have to validate that it is a positive number
        if (req.body.days && !req.body.days === parseInt(req.body.days, 10)){
            return res.status(400).send({ message: 'Days attribute must be a valid field' });
        }

        if (req.body.project_id && isNaN(req.body.project_id)){
            return res.status(400).send({message: 'Project_id must be a valid and positive number field.'})
        }
    
        return Sprint
            .findById(req.params.id, {})
            .then(Sprint => {

                if (!Sprint) {
                    return res.status(404).send({
                        message: 'Sprint Not Found',
                    });
                }

                return Sprint
                    .update({
                        days: req.body.days || Sprint.days,
                        comment: req.body.comment || Sprint.comment,
                        project_id: req.body.project_id || Sprint.project_id,
                    })
                    .then(() => res.status(200).send(Sprint)) // Send back the updated member
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {

        return Sprint
            .findById(req.params.id, {})
            .then(Sprint => {

                if (!Sprint) {
                    return res.status(404).send({message: 'Sprint Not Found',
                    });
                }

                return Sprint
                    .destroy()
                    .then(() => res.status(200).send({ message: 'Sprint deleted successfully.' }))
                    .catch(error => res.status(400).send(error));
            })

            .catch(error => res.status(400).send(error));
    },
};