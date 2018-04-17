const Project = require('../models').Project;
const Sprint = require('../models').Sprint;
const Member = require('../models').Member;
const Technology = require('../models').Technology;

module.exports = {
    create(req, res) {
        // check that params are not null, undefined or empty string
        if (!req.body.vision) {
            return res.status(400).send({
                message: 'Attribute vision cannot be empty'
            });
        }
        if (!req.body.name) {
            return res.status(400).send({
                message: 'Attribute name cannot be empty'
            });
        }
        if (!req.body.begin_date) {
            return res.status(400).send({
                message: 'Attribute begin date cannot be empty'
            });
        }
        if (!req.body.end_date) {
            return res.status(400).send({
                message: 'Attribute end date cannot be empty'
            });
        }

        var begin = new Date(req.body.begin_date);
        var end = new Date(req.body.end_date);

        if (begin > end) {
            return res.status(400).send({
                message: 'End date cannot be before begin date'
            });
        }
        if (!req.body.background) {
            return res.status(400).send({
                message: 'Attribute background cannot be empty'
            });
        }
        if (!req.body.risks) {
            return res.status(400).send({
                message: 'Attribute risks cannot be empty'
            });
        }
        if (!req.body.reach) {
            return res.status(400).send({
                message: 'Attribute reach cannot be empty'
            });
        }
        if (!req.body.scrum_master_id) {
            return res.status(400).send({
                message: 'Attribute scrum master cannot be empty'
            });
        }
        return Project
            .create({
                vision: req.body.vision,
                name: req.body.name,
                begin_date: req.body.begin_date,
                end_date: req.body.end_date,
                background: req.body.background,
                risks: req.body.risks,
                reach: req.body.reach,
                scrum_master_id: req.body.scrum_master_id
            })
            .then(Project => res.status(200).send(Project))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Project
            .findAll({
                include: [{
                        model: Sprint,
                        as: 'sprints',
                        required: false
                    },
                    {
                        model: Member,
                        as: 'scrum_master',
                        required: false,
                        attributes: ['id', 'department_major', 'name', 'photo_URL', 'system_role', 'createdAt', 'updatedAt']
                    },
                    {
                        model: Member,
                        as: 'members',
                        through: {

                            attributes: ['project_role'],
                        },
                        required: false,
                        attributes: ['id', 'department_major', 'name', 'photo_URL', 'system_role', 'createdAt', 'updatedAt']
                    },
                    {
                        model: Technology,
                        as: 'technologies',
                        through: {
                            attributes: ['version']
                        },
                        required: false
                    }
                ],
                attributes: ['id', 'vision', 'name', 'begin_date', 'end_date', 'background', 'risks', 'reach', 'createdAt', 'updatedAt', 'scrum_master_id']
            })
            .then(projects => res.status(200).send(projects))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {
        // check that project id is not null, undefined, not an integer or 0
        if (!req.body.id && req.body.id === parseInt(req.body.id, 10)) {
            return res.status(400).send({
                message: 'ID must be an integer bigger than 0'
            });
        }

        return Project
            .findById(req.params.id, {
                include: [{
                        model: Sprint,
                        as: 'sprints',
                        required: false
                    },
                    {
                        model: Member,
                        as: 'scrum_master',
                        required: false,
                        attributes: ['id', 'department_major', 'name', 'photo_URL', 'system_role', 'createdAt', 'updatedAt']
                    },
                    {
                        model: Member,
                        as: 'members',
                        through: {

                            attributes: ['project_role'],
                        },
                        required: false,
                        attributes: ['id', 'department_major', 'name', 'photo_URL', 'system_role', 'createdAt', 'updatedAt']
                    },
                    {
                        model: Technology,
                        as: 'technologies',
                        through: {
                            attributes: ['version']
                        },
                        required: false
                    }
                ],
                //Without this attributes, it fails bacuse its trying to search for project_id that doesn exists
                attributes: ['id', 'vision', 'name', 'begin_date', 'end_date', 'background', 'risks', 'reach', 'createdAt', 'updatedAt', 'scrum_master_id']
            })
            .then(Project => {
                if (!Project) {
                    return res.status(400).send({
                        message: 'Project not found.'
                    });
                }
                return res.status(200).send(Project);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Project
            .findById(req.params.id, {
                //Without this attributes, it fails bacuse its trying to search for project_id that doesn exists
                attributes: ['id', 'vision', 'name', 'begin_date', 'end_date', 'background', 'risks', 'reach', 'createdAt', 'updatedAt', 'scrum_master_id']
            })
            .then(Project => {
                if (!Project) {
                    return res.status(400).send({
                        message: 'Not Found',
                    });
                } else {
                    //If im trying to update any date, the datea must be correct
                    var begin;
                    var end;
                    if (req.body.begin_date && req.body.end_date) {
                        begin = new Date(req.body.begin_date);
                        end = new Date(req.body.end_date);
                    } else {
                        if (req.body.begin_date) {
                            begin = new Date(req.body.begin_date);
                            end = new Date(Project.end_date);
                        } else {
                            if (req.body.end_date) {
                                begin = new Date(Project.begin_date);
                                end = new Date(req.body.end_date);
                            } else {
                                begin = new Date(Project.begin_date);
                                end = new Date(Project.end_date);
                            }
                        }
                    }
                    if (begin > end) {
                        return res.status(400).send({
                            message: 'End date cannot be before begin date'
                        });
                    }
                }
                return Project
                    .update({
                        vision: req.body.vision || Project.vision,
                        name: req.body.name || Project.name,
                        begin_date: req.body.begin_date || Project.begin_date,
                        end_date: req.body.end_date || Project.end_date,
                        background: req.body.background || Project.background,
                        risks: req.body.risks || Project.risks,
                        reach: req.body.reach || Project.reach,
                        scrum_master_id: req.body.scrum_master_id || Project.scrum_master_id
                    })
                    .then(() => res.status(200).send(Project)) // Send back the updated tuple.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
        // check that project id is not null, undefined, not an integer or 0
        if (!req.params.id && req.params.id === parseInt(req.params.id, 10)) {
            return res.status(400).send({
                message: 'ID must be an integer bigger than 0'
            });
        }
        return Project
            .findById(req.params.id, {
                attributes: ['id', 'vision', 'name', 'begin_date', 'end_date', 'background', 'risks', 'reach', 'createdAt', 'updatedAt', 'scrum_master_id']
            })
            .then(Project => {
                if (!Project) {
                    return res.status(400).send({
                        message: 'Not Found',
                    });
                }
                return Project
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'Project deleted'
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};