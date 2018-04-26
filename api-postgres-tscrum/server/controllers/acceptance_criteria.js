const Acceptance_criteria = require('../models').Acceptance_criteria;
const User_story = require('../models').User_story;

module.exports = {
    create(req, res) {

        if(!req.body.name){
            return res.status(400).send({message: 'The post body must contain a valid name field.'});
        }

        if(!req.body.type){
            return res.status(400).send({message: 'The post body must contain a valid type field.'});
        }

        if(!req.body.user_story_id){
            return res.status(400).send({message: 'The post body must contain a valid user_story_id field.'});
        }

        return Acceptance_criteria
            .create({
                name: req.body.name,
                type: req.body.type,
                user_story_id: req.body.user_story_id,
            })
            .then(Acceptance_criteria => res.status(200).send(Acceptance_criteria))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Acceptance_criteria
            .findAll({
                include: [{
                    model: User_story,
                    as: 'user_story'
                }],
            })
            .then(Acceptance_criteria => res.status(200).send(Acceptance_criteria))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {
        // check that id is not null, undefined, not an integer or 0
        if(!req.params.id) { 
            return res.status(400).send({message: 'The request must contain the parameter id field.'});
        }

        return Acceptance_criteria
            .findById(req.params.id, {
                include: [{
                    model: User_story,
                    as: 'user_story'
                }],
            })
            .then(Acceptance_criteria => {
                if(!Acceptance_criteria) {
                    return res.status(400).send({ message: 'Acceptance criterium not found.'});
                }
                return res.status(200).send(Acceptance_criteria);
            })
            .catch(error => res.status(400).send(error));
    },
  
    update(req, res) {

        if(req.body.user_story_id && isNaN(req.body.user_story_id)){
            return res.status(400).send({message: 'The post body must contain a valid (positive integer) user_story_id field.'});
        }

        return Acceptance_criteria
            .findById(req.params.id, {})
            .then(Acceptance_criteria => {
                if (!Acceptance_criteria) {
                    return res.status(400).send({
                        message: 'Acceptance Criteria Not Found',
                    });
                }
        
                return Acceptance_criteria
                    .update({
                        name: req.body.name || Acceptance_criteria.name,
                        type: req.body.type || Acceptance_criteria.type,
                        user_story_id: req.body.user_story_id || Acceptance_criteria.user_story_id,
                    })
                    .then(() => res.status(200).send(Acceptance_criteria))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    
    destroy(req, res) {
        return Acceptance_criteria
        .findById(req.params.id, {})
        .then(Acceptance_criteria => {
            if (!Acceptance_criteria) {
                return res.status(400).send({
                    message: 'Acceptance Criteria Not Found',
                });
            }
    
            return Acceptance_criteria
            .destroy()
            .then(() => res.status(200).send({message: 'Acceptance criteria deleted successfully'}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
  
};
