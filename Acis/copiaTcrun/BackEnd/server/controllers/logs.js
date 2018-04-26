const Log = require('../models').Log;
const Member = require('../models').Member;

module.exports = {
    create(req, res) {
        // check that params are not null, undefined or empty string
        if(!req.body.query){ 
            return res.status(400).send({message: 'The post body must contain a query field.'});
        }

        if(!req.body.member_id){
            return res.status(400).send({message: 'The post body must contain a member_id field.'});
        }

        return Log
            .create({
                query: req.body.query,
                member_id: req.body.member_id
            })
            .then(log => res.status(200).send(log))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Log
            .findAll({
                include: [
                    { model: Member, as: 'member' }
                ],
            })
            .then(logs => res.status(200).send(logs))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {
        // check that id is not null, undefined, not an integer or 0
        if(!req.params.id) { 
            return res.status(400).send({message: 'The request must contain the parameter id field.'});
        }

        return Log
            .findById(req.params.id, {
                include: [
                    { model: Member, as: 'member' }
                ],
            })
            .then(log => {
                if(!log) {
                    return res.status(400).send({ message: 'Log not found.'});
                }
                return res.status(200).send(log);
            })
            .catch(error => res.status(400).send(error));
    }
};