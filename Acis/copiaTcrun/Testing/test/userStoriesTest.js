const expect  = require('chai').expect;
const request = require('request');
const URL = 'http://localhost:8000/api';

/**
 * Tests for User Story model and controller.
 */

// Search a user story in a list of stories
function findUserStory(user_stories, user_story){
    let found = false;
    user_stories.array.forEach(element => { // check that the object we tryed to insert is different to every object in the DB
        if(element.weight === user_story.weight 
            && element.scrum_board_status === user_story.scrum_board_status
            && element.description === user_story.description
            && element.priority === user_story.priority
            && element.sprint_id === user_story.sprint_id    
            && element.project_id=== user_story.project_id){
            found = true;
            break;
        }     
    });

    return found;
}

describe('User_story model', () => {

    // Create operation
    describe('Create: #create('+
        'weight, scrum_board_status, description, priority, sprint_id, project_id) | ' +
        'body: weight, scrum_board_status, description, priority, sprint_id, project_id', () => {
        
        // complete and correct parameters, expects successful insertion
        it('valid request', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/user-stories',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ weight: '2', scrum_board_status: '1', description: 'This is a description', priority: '2', sprint_id: '1', project_id: '1'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newUser_story = JSON.parse(body);

                // Make get request to get the inserted object
                request.get( URL + 'user-stories/' + newUser_story.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    expect(newUser_story).to.deep.equal(JSON.parse(body)); // check that the object we created and the one obtain are equal
                });

                done();
            });
        });

        // null weight parameter, expects unsuccessful insertion
        it('Null weight', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/user-stories',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ weight: null, scrum_board_status: '1', description: 'This is a description', priority: '2', sprint_id: '1', project_id: '1'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newUser_story = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + 'user_stories', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findUserStory(list, newUser_story);
                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });

        // null scrum_board_status, expects unsuccessful insertion
        it('Null scrum_board_status', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/user-stories',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ weight: '2', scrum_board_status: null, description: 'This is a description', priority: '2', sprint_id: '1', project_id: '1'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newUser_story = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + 'user-stories', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findUserStory(list, newUser_story);

                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });

        // null description, expects unsuccessful insertion
        it('Null description', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/description',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ weight: '2', scrum_board_status: '1', description: null, priority: '2', sprint_id: '1', project_id: '1'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newUser_story = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + 'user-stories', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findLog(list, newUser_story);

                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });


        // null priority, expects unsuccessful insertion
        it('Null priority', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/user-stories',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ weight: '2', scrum_board_status: '1', description: 'This is a description', priority: null, sprint_id: '1', project_id: '1'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newUser_story = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + 'user-stories', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findUserStory(list, newUser_story);
                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });


        // null sprint_id, expects unsuccessful insertion
        it('Null sprint_id', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/user-stories',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ weight: '2', scrum_board_status: '1', description: 'This is a description', priority: '2', sprint_id: null, project_id: '1'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newUser_story = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + 'user-stories', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findUserStory(list, newUser_story);
                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });

        // Incorrect sprint_id parameter, expects unsuccessful insertion
        it('Incorrect sprint_id', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/user-stories',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ weight: '2', scrum_board_status: '1', description: 'This is a description', priority: '2', sprint_id: 'one', project_id: '1'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newUser_story = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + 'user-stories', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findUserStory(list, newUser_story);

                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });

        // null project_id, expects unsuccessful insertion
        it('Null project_id', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/user-stories',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ weight: '2', scrum_board_status: '1', description: 'This is a description', priority: '2', sprint_id: '1', project_id: null})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newUser_story = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + 'user-stories', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findUserStory(list, newUser_story);
                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });

        // Incorrect project_id parameter, expects unsuccessful insertion
        it('Incorrect project_id', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/user-stories',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ weight: '2', scrum_board_status: '1', description: 'This is a description', priority: '2', sprint_id: '1', project_id: 'one'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newUser_story = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + 'user-stories', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findUserStory(list, newUser_story);

                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });


    });

    //Retrieve opertion
    describe('Retrieve: #retrieve() | parameters: id', () => {

        // Retrieve an existent user_story , a successfull response containing the user_story
        it('Retrieve existent user_story', (done) => {
            let user_story = { id: 1, weight: '2', scrum_board_status: '1', description: 'This is a description', priority: '2', sprint_id: '1', project_id: '1' };

            request.get(URL + '/user-stories/' + user_story.id, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful

                expect(JSON.parse(body)).to.be.deep.equal(log);
            });
            done();
        });

        // Retrieve a non existent user_story, an unsuccessfull response is expected
        it('Retrieve non existent user_story', (done) => {
            request.get(URL + '/user-stories/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
            });
            done();
        });
    });

     // Update operation
    describe('Update: #update('+
        'weight, scrum_board_status, description, priority, sprint_id, project_id) | ' +
        'body: weight, scrum_board_status, description, priority, sprint_id, project_id', () => {

        // Update user_story. Make the weight a non-existent value.
        it('Update a user_story with non-existent weight', (done) => {
            
            request.get(URL + '/user-stories/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: body.project_id
                };

                let newUser_story = {

                    weight: "NON_EXISTENT_VALUE",
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: body.project_id

                };

                let putOptions = {

                    url: URL + '/user-stories',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser_story)
                }

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Check that the object was not inserted
                    request.get(URL + '/user-stories', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findUserStory(list, newUser_story);
                        expect(found1).to.be.false; //Check that the member was not updated

                        let found2 = findUserStory(list, oldUser_story);
                        expect(found2).to.be.true; //Check that the member with old values still exists
                    });

                    done();
                });                
            });
        });

        // Update user_story. Make the scrum_board_status a non-existent value.
        it('Update user_story with non-existent scrum_board_status', (done) => {
            
            request.get(URL + '/user-stories/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: body.project_id
                };

                let newUser_story = {

                    weight: body.weight,
                    scrum_board_status: "NON_EXISTENT_VALUE",
                    description: body.description,
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: body.project_id

                };

                let putOptions = {

                    url: URL + '/user-stories',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser_story)
                }

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Make a get request to verify that the object was not inserted
                    request.get(URL + '/user-stories', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findUserStory(list, newUser_story);
                        expect(found1).to.be.false; //Check that the member was not updated

                        let found2 = findUserStory(list, oldUser_story);
                        expect(found2).to.be.true; //Check that the member with old values still exists
                    });

                    done();
                });                
            });
        });

        // Update user_story. Make the description a non-existent value.
        it('Update a user_story with non-existent description', (done) => {
            
            request.get(URL + '/user-stories/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: body.project_id
                };

                let newUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: "NON_EXISTENT_VALUE",
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: body.project_id

                };

                let putOptions = {

                    url: URL + '/user-stories',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser_story)
                }

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Check that the object was not inserted
                    request.get(URL + '/user-stories', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findUserStory(list, newUser_story);
                        expect(found1).to.be.false; //Check that the member was not updated

                        let found2 = findUserStory(list, oldUser_story);
                        expect(found2).to.be.true; //Check that the member with old values still exists
                    });

                    done();
                });                
            });
        });

        // Update user_story. Make the priority a non-existent value.
        it('Update a user_story with non-existent priority', (done) => {
            
            request.get(URL + '/user-stories/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: body.project_id
                };

                let newUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: "NON_EXISTENT_VALUE",
                    sprint_id: body.sprint_id,
                    project_id: body.project_id

                };

                let putOptions = {

                    url: URL + '/user-stories',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser_story)
                }

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Check that the object was not inserted
                    request.get(URL + '/user-stories', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findUserStory(list, newUser_story);
                        expect(found1).to.be.false; //Check that the member was not updated

                        let found2 = findUserStory(list, oldUser_story);
                        expect(found2).to.be.true; //Check that the member with old values still exists
                    });

                    done();
                });                
            });
        });

        // Update user_story. Make the sprind_id a non-existent value.
        it('Update a user_story with non-existent sprint_id', (done) => {
            
            request.get(URL + '/user-stories/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: body.project_id
                };

                let newUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: "NON_EXISTENT_VALUE",
                    project_id: body.project_id

                };

                let putOptions = {

                    url: URL + '/user-stories',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser_story)
                }

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Check that the object was not inserted
                    request.get(URL + '/user-stories', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findUserStory(list, newUser_story);
                        expect(found1).to.be.false; //Check that the member was not updated

                        let found2 = findUserStory(list, oldUser_story);
                        expect(found2).to.be.true; //Check that the member with old values still exists
                    });

                    done();
                });                
            });
        });

        // Update user_story. Make the sprint_id an incorrect value.
        it('Update a user_story with an incorrect sprint_id', (done) => {
            
            request.get(URL + '/user-stories/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: body.project_id
                };

                let newUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: 0, //Should be between '' or just 0 !?!?
                    project_id: body.project_id

                };

                let putOptions = {

                    url: URL + '/user-stories',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser_story)
                }

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Check that the object was not inserted
                    request.get(URL + '/user-stories', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findUserStory(list, newUser_story);
                        expect(found1).to.be.false; //Check that the member was not updated

                        let found2 = findUserStory(list, oldUser_story);
                        expect(found2).to.be.true; //Check that the member with old values still exists
                    });

                    done();
                });                
            });
        });

        // Update user_story. Make the project_id a non-existent value.
        it('Update a user_story with non-existent project_id', (done) => {
            
            request.get(URL + '/user-stories/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: body.project_id
                };

                let newUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: "NON_EXISTENT_VALUE"

                };

                let putOptions = {

                    url: URL + '/user-stories',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser_story)
                }

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Check that the object was not inserted
                    request.get(URL + '/user-stories', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findUserStory(list, newUser_story);
                        expect(found1).to.be.false; //Check that the member was not updated

                        let found2 = findUserStory(list, oldUser_story);
                        expect(found2).to.be.true; //Check that the member with old values still exists
                    });

                    done();
                });                
            });
        });

        // Update user_story. Make the project_id an incorrect value.
        it('Update a user_story with an incorrect project_id', (done) => {
            
            request.get(URL + '/user-stories/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: body.project_id
                };

                let newUser_story = {

                    weight: body.weight,
                    scrum_board_status: body.scrum_board_status,
                    description: body.description,
                    priority: body.priority,
                    sprint_id: body.sprint_id,
                    project_id: 0 //Should be between '' or just 0 !?!?

                };

                let putOptions = {

                    url: URL + '/user-stories',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser_story)
                }

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Check that the object was not inserted
                    request.get(URL + '/user-stories', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findUserStory(list, newUser_story);
                        expect(found1).to.be.false; //Check that the member was not updated

                        let found2 = findUserStory(list, oldUser_story);
                        expect(found2).to.be.true; //Check that the member with old values still exists
                    });

                    done();
                });                
            });
        });
});

    //Delete operation
    describe('Delete: #delete() | parameters: id', () => {

        // Delete an existent user_story
        it('Delete an existent user_story', (done) => {
            
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/user-stories',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ weight: '2', scrum_board_status: '1', description: 'This is a description', priority: '2', sprint_id: '1', project_id: '1'})
            };

            // Make post request to create a new member
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(201); // if response is successful
                let newUser_story = JSON.parse(body);

                // Make get request to get the inserted object
                request.get(URL + 'user-stories/' + newUser_story.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    expect(newUser_story).to.deep.equal(JSON.parse(body)); // check that the object we created and the one obtain are equal
                });
            });

            // Make delete request to delete the inserted member
            request.delete( URL + '/user-stories/' + postOptions.id, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
            });
            done();
        });


        // Try to delete a non-existent user_story
        it('Delete a non-existent user_story', (done) => {
            request.delete(URL + '/user-stories/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); //response should be unsuccesful
            });
            done();
        });
});
});