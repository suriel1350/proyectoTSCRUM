const expect  = require('chai').expect;
const request = require('request');
const URL = 'http://localhost:8000/api';


/**
 * Tests for Sprints model and controller.
 */

// Search a sprint in a list of sprints
function findSprint(sprints, sprint){

	let found = false;

	sprints.array.forEach(element => {

		// check that the object we tryed to insert is different to every object in the DB
		if(element.days === newSprint.days && element.comment === newSprint.comment){
			found = true;
			break;
		}
	});

	return found;
}

describe('Sprints model', () => {

    // Create operation
    describe('Create: #create(days, comment) | body: days, comment', () => {
        
        // complete and correct parameters, expects successful insertion
        it('valid request', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/sprints',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ days: 3, comment: 'Test comment'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newSprint = JSON.parse(body);

                // Make get request to get the inserted object
                request.get( URL + 'sprints/' + newSprint.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    expect(newSprint).to.deep.equal(JSON.parse(body)); // check that the object we created and the one obtain are equal
                });

                done();
            });
        });

        // null days parameter, expects unsuccessful insertion
        it('null days', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/sprints',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ days: null, comment: 'Test comment' })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newSprint = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + 'sprints', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findSprint(list, newSprint);

                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });

        // no positive days parameter, expects unsuccessful insertion
        it('no positive days', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/sprints',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ days: -2, comment: 'Test comment' })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newSprint = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + 'sprints', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findSprint(list, newSprint);

                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });
    });

    //Retrieve opertion
    describe('Retrieve: #retrieve() | parameters: id', () => {

        // Retrieve an existent sprint, a successfull response conataining the sprint
        it('Retrieve existent log', (done) => {
            let sprint = { id: 1, days: 3, comment: 'Test comment' };

            request.get(URL + '/sprints/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful

                expect(JSON.parse(body)).to.be.deep.equal(sprint);
            });
            done();
        });

        // Retrieve a non existent log, an unsuccessfull response conataining the log
        it('Retrieve non existent log', (done) => {
            request.get(URL + '/sprints/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
            });
            done();
        });
    });

    // Update opertion
    describe('Update: #retrieve(days, comment) | parameters: id, body: days, comment', () => {

    	// Update days with an empty field.
        it('Update with no days', (done) => {

            request.get(URL + '/sprints/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful

                let oldSprint = { 
                    id: body.id, 
                    days: body.days,
                    comment: body.comment
                };

                let newSprint = { 
                    id: body.id,
                    //Update days with an empty field 
                    days: null,
                    comment: body.comment
                };

                let putOptions = {
                    url: URL + '/sprints',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newSprint)
                };

                // Make put request
                request.put(putOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // response should be 400

                    // Make get request to check that the object was not inserted
                    request.get( URL + '/sprints', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful
                        
                        let list = JSON.parse(body);
                        let found1 = findSprint(list, newSprint);
                        expect(found1).to.be.false; // check that no coincidence is found

                        let found2 = findSprint(list, oldSprint);
                        expect(found2).to.be.true; // check that a coincidence is found
                    });

                    done();
                });
            });
        });

        // Update days with a no positive number.
        it('Update with no positive days', (done) => {

            request.get(URL + '/sprints/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful

                let oldSprint = { 
                    id: body.id, 
                    days: body.days,
                    comment: body.comment
                };

                let newSprint = { 
                    id: body.id,
                    //Update days with a no positive number
                    days: -2,
                    comment: body.comment
                };

                let putOptions = {
                    url: URL + '/sprints',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newSprint)
                };

                // Make put request
                request.put(putOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // response should be 400

                    // Make get request to check that the object was not inserted
                    request.get( URL + '/sprints', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful
                        
                        let list = JSON.parse(body);
                        let found1 = findSprint(list, newSprint);
                        expect(found1).to.be.false; // check that no coincidence is found

                        let found2 = findSprint(list, oldSprint);
                        expect(found2).to.be.true; // check that a coincidence is found
                    });

                    done();
                });
            });
        });

        // Update comments
        it('Update comments', (done) => {

            request.get(URL + '/sprints/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful

                let oldSprint = { 
                    id: body.id, 
                    days: body.days,
                    comment: body.comment
                };

                let newSprint = { 
                    id: body.id,
                    days: body.days,
                    comment: 'Test comment'
                };

                let putOptions = {
                    url: URL + '/sprints',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newSprint)
                };

                // Make put request
                request.put(putOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // response should be 400

                    // Make get request to check that the object was not inserted
                    request.get( URL + '/sprints', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful
                        
                        let list = JSON.parse(body);
                        let found1 = findSprint(list, newSprint);
                        expect(found1).to.be.false; // check that no coincidence is found

                        let found2 = findSprint(list, oldSprint);
                        expect(found2).to.be.true; // check that a coincidence is found
                    });

                    done();
                });
            });
        });
    });

	describe('Delete: #delete() | parameters: id', () => {

		// Delete a non-existent sprint, response: unsuccesfull 
        it('Delete non existent sprint', (done) => {
            request.delete(URL + '/sprints/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); //response should be unsuccesfull
            });
            done();
        });

        // Delete an existent sprint, response: succesfull
        it('Delete existent sprint', (done) => {

            // Define POST request parameters and body: sprint table
            let postOptionsSprint = {
                url: URL + '/sprints',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    days: 3,
                    comment: 'Test comment'
                })
            };

            var sprintID;

            // Make post request: sprint table
            request.post(postOptionsSprint, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newSprint = JSON.parse(body);
                sprintID = newSprint.id;
            });

            // Define POST request parameters and body: user_stories table
            let postOptionsUser_stories = {
                url: URL + '/user-stories',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    weight: 1,
                    scrum_board_status: 2,
                    description: 'Test description',
                    priority: 2,
                    sprint_id: sprintID,
                    project_id: 1
                })
            };

            var user_storyID;

            // Make post request: user_stories table
            request.post(postOptionsUser_stories, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newUser_story = JSON.parse(body);
                user_storyID = newUser_story.id;
            });

            // Define POST request parameters and body: tasks table
            let postOptionsTasks = {
                url: URL + '/tasks',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    duration: 1,
                    name: 'Test name',
                    completed: 'False',
                    user_story_id: user_storyID
                })
            };

            var taskID;

            // Make post request: tasks table
            request.post(postOptionsTasks, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newTask = JSON.parse(body);
                taskID = newTask.id;
            });
            
            // Define POST request parameters and body: acceptance_criteria table
            let postOptionsAcceptance_criteria = {
                url: URL + '/acceptance-criteria',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: 'Test name',
                    type: 'Test type',
                    user_story_id: user_storyID
                })
            };

            var acceptanceID;

            // Make post request: acceptance_criteria table
            request.post(postOptionsAcceptance_criteria, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newAcceptance = JSON.parse(body);
                acceptanceID = newAcceptance.id;
            });

            // Define POST request parameters and body: members table
            let postOptionsMember = {
                url: URL + '/member',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    department_major: 'Test department_major',
                    name: 'Test name',
                    photo_URL: 'Test photo_URL',
                    password: 'Test_password'
                })
            };

            var memberID;

            // Make post request: members table
            request.post(postOptionsMember, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newMember = JSON.parse(body);
                memberID = newMember.id;
            });

            // Define POST request parameters and body: member_task table
            let postOptionsMemberTask = {
                url: URL + '/member-task',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    member_id: memberID,
                    task_id: taskID
                })
            };

            var memberTaskID;

            //Make post request: member_task table
            request.post(postOptionsMemberTask, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newMemberTask = JSON.parse(body);
                memberTaskID = newMemberTask.id;
            });
            
            // Make delete request to delte the inserted sprint
            request.delete( URL + '/sprints/' + sprintID, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
            });

            // Make get request to get the deleted sprint
            request.get( URL + '/sprints/' + sprintID, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // if response is unsuccessful
            });

            // Make get request to get the deleted user_story
            request.get( URL + '/user-stories/' + user_storyID, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // if response is unsuccessful
            });

            // Make get request to get the deleted task
            request.get( URL + '/tasks/' + taskID, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // if response is unsuccessful
            });

            // Make get request to get the deleted acceptance_criteria
            request.get( URL + '/acceptance-criteria/' + taskID, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // if response is unsuccessful
            });

            // Make get request to get the deleted member_task
            request.get( URL + '/member-task/' + memberTaskID, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // if response is unsuccessful
            });

            done();
        });
    });
});