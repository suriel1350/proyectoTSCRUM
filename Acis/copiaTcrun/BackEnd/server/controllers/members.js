const Member = require('../models').Member;
const Task = require('../models').Task;
const Log = require('../models').Log;
const Project = require('../models').Project;
const bcrypt = require('bcrypt-nodejs');
//const Validation = require('../helpers/validations').Validation;

function isAValidMemberId(memberId) {

    var memberIdStr = String(memberId).toLowerCase();
    var memberIdStrSize = memberIdStr.length;
    var memberIdFirstChar = memberIdStr.charAt(0);

    //All student or professor ids have 9 characters and start with 'A' or 'L'
    return memberIdStrSize == 9 && (memberIdFirstChar == 'a' || memberIdFirstChar == 'l');
}

function isAValidDepartment_Major(department_major) {

    //TODO: implement this function to validate against the department_major enum
    return true;
}

module.exports = {

    //Method for creating a member
    create(req, res) {

        if (!req.body.id || !isAValidMemberId(req.body.id))
            return res.status(400).send({
                message: 'The attribute id must match the format of a student or professor id: 9 characters long and starting with a letter A or L'
            });

        if (!req.body.department_major)
            return res.status(400).send({
                message: 'The attribute department_major is invalid. It must match a value in the enum.'
            });

        if (!req.body.name)
            return res.status(400).send({
                message: 'The attribute name cannot be null or empty.'
            });

        if (!req.body.password)
            return res.status(400).send({
                message: 'The attribute password cannot be null or empty.'
            });

        bcrypt.hash(req.body.password, null, null, (err, hash) => {
            let hashed = hash;

            return Member
                .create({
                    id: String(req.body.id).toLowerCase(), //Store this as lower case
                    department_major: req.body.department_major,
                    name: req.body.name,
                    photo_URL: req.body.photo_URL,
                    password: hashed,
                    system_role: 'user'
                })
                .then(member => res.status(201).send(member))
                .catch(error => res.status(400).send(error));
        });
    },

    //Method for listing members
    list(req, res) {

        return Member
            .findAll( {

                include: [
                    {
                        model: Log,
                        as: 'logs',
                    },
                    {
                        // association: 'tasks'
                        model: Task,
                        as: 'tasks',
                        required: false,
                    },
                    {
                        // association: 'projects'
                        model: Project,
                        as: 'projects',
                        through: {

                            attributes: ['project_role'],
                        },
                        required: false,
                        //Without this line of attributes, it fails!!
                        attributes : ['id', 'vision', 'name', 'begin_date', 'end_date', 'background', 'risks', 'reach', 'createdAt', 'updatedAt', 'scrum_master_id']
                    },
                ],
            })
            .then(members => res.status(200).send(members))
            .catch(error => res.status(400).send(error));
    },

    //Method for retrieving a single member
    retrieve(req, res) {

        return Member
            .findById(req.params.id, {

                include: [
                    {
                        model: Log,
                        as: 'logs',
                    },
                    {
                        // association: 'tasks'
                        model: Task,
                        as: 'tasks',
                        required: false,
                    },
                    {
                        // association: 'projects'
                        model: Project,
                        as: 'projects',
                        through: {

                            attributes: ['project_role'],
                        },
                        required: false,
                        //Without this line of attributes, it fails!!
                        attributes : ['id', 'vision', 'name', 'begin_date', 'end_date', 'background', 'risks', 'reach', 'createdAt', 'updatedAt', 'scrum_master_id']
                    },
                ],
            })
            .then(member => {

                if (!member) {

                    return res.status(404).send({

                        message: 'Member Not Found',
                    });
                }

                return res.status(200).send(member);
            })
            .catch(error => res.status(404).send(error));
    },

    //Method to update a member
    update(req, res) {

        //If I'm trying to update the department_major, it has to exist in the department_major enum
        if (req.body.department_major && !isAValidDepartment_Major(req.body.department_major))
            return res.status(400).send({
                message: 'The attribute department_major is invalid. It must match a value in the enum.'
            });

        return Member
            .findById(req.params.id, {})
            .then(member => {

                if (!member) {

                    return res.status(404).send({

                        message: 'Member Not Found',
                    });
                }

                return member
                    .update({

                        department_major: req.body.department_major || member.deparment_major,
                        name: req.body.name || member.name,
                        photo_URL: req.body.photo_URL || member.photo_URL,
                        password: req.body.password || member.password,
                    })
                    .then(() => res.status(200).send(member)) // Send back the updated member
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    //Method to delete a member
    destroy(req, res) {

        return Member
            .findById(req.params.id)
            .then(member => {

                if (!member) {

                    return res.status(400).send({

                        message: 'Member Not Found',
                    });
                }

                return member
                    .destroy()
                    .then(() => res.status(200).send({

                        message: 'Member deleted successfully',
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(404).send(error));
    }
};