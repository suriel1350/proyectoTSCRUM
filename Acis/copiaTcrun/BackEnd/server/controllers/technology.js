const Technology = require('../models').Technology;

module.exports = {
    create(req, res) {
       if(!req.body.name)
			return res.status(400).send({message: 'The attribute name is invalid. It must match a value in the enum.'});

        return Technology
            .create({
                name: req.body.name
            })
            .then(Technology => res.status(200).send(Technology))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {

        return Technology
        .findAll()
        .then(Technology => res.status(200).send(Technology))
        .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {

        // check that log_id is not null, undefined, not an integer or 0
        if(!req.params.id) { 
            return res.status(400).send({message: 'ID attribute can not be an empty field.'});
        }

        return Technology
            .findById(req.params.id, {})
            .then(Technology => {
                if(!Technology) {
                    return res.status(404).send({ message: 'Technology not found.'});
                }
                return res.status(200).send(Technology);
            })
            .catch(error => res.status(400).send(error));
    },

 	update(req, res) {

        if (!req.params.id)
            return res.status(400).send({message: 'ID attribute can not be an empty field.'});

        if(!req.body.name)
            return res.status(400).send({message: 'The attribute name is invalid. It must match a value in the enum.'});


        return Technology
            .findById(req.params.id, {})
            .then(Technology => {
                if (!Technology) {
                    return res.status(400).send({
                    message: 'Technology not found',
                  });
                }

                return Technology
                    .update({
                        name: req.body.name
                    })

                    .then(() => res.status(200).send(Technology))
                    .catch((error) => res.status(400).send(error));
            })

            .catch((error) => res.status(400).send(error));
    },
    
    destroy(req, res) {
        console.log("Technologies delete method");
        if(!req.params.id && req.params.id === parseInt(req.params.id, 10)) { 
            return res.status(400).send({message: 'ID must be an integer bigger than 0'});
        }

        return Technology
            .findById(req.params.id)
            .then(Technology => {
                if (!Technology) {
                    return res.status(400).send({
                    message: 'Technology not found.',
                    });
                }
                
                return Technology
                  .destroy()
                  .then(() => res.status(200).send({message: 'Technology deleted successfully.'}))
                  .catch(error => res.status(400).send(error));
            })
            
        .catch(error => res.status(400).send(error));
    },
};