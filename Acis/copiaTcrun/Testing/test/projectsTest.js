const expect  = require('chai').expect;
const request = require('request');
const URL = 'http://localhost:8000/api';



// Search a Project in a list of projectss
function findProject(projects, project){
    let found = false;
    projects.array.forEach(element => { // check that the object we tryed to insert is different to every object in the DB
        if(element.vision === project.vision
                && element.name === project.name
                && element.begin_date === project.end_date
                && element.background === project.background
                && element.risks === project.risks
                && element.reach === project.reach
                && element.scrum_master_id == project.scrum_master_id){
            found = true;
            break;
        }     
    });

    return found;
}

/**
 * Tests for Project model and controller.
 */

describe('Projectos model', () => {

    // Create operation
    describe('Create: #create(vision, name, begin_date, end_date, background, risks, reach) | body: vision, name, begin_date, end_date, background, risks, reach', () => {
        
        // complete and correct parameters, expects successful insertion
        it('Valid request', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/projects',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    vision: 'Test vision',
                    name: 'Test name',
                    begin_date: '2018-01-01 01:01:01',
                    end_date: '2019-01-01 01:01:01',
                    background: 'Test background',
                    risks: 'Test risks',
                    reach: 'Test reach',
                    scrum_master_id: 'a00000000'
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newProyecto = JSON.parse(body);

                // Make get request to get the inserted object
                request.get( URL + '/projects/' + newProyecto.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    let retrievedProyect = JSON.parse(body);
                    expect(newProyecto.vision).to.be.equal(retrievedProyect.vision); // check that the object we created and the one obtain are equal
                    expect(newProyecto.name).to.be.equal(retrievedProyect.name);
                    expect(newProyecto.begin_date).to.be.equal(retrievedProyect.begin_date);
                    expect(newProyecto.end_date).to.be.equal(retrievedProyect.end_date);
                    expect(newProyecto.background).to.be.equal(retrievedProyect.background);
                    expect(newProyecto.risks).to.be.equal(retrievedProyect.risks);
                    expect(newProyecto.reach).to.be.equal(retrievedProyect.reach);
                    expect(newProyecto.scrum_master_id).to.be.equal(retrievedProyect.scrum_master_id);
                });

                done();
            });
        });

        //Invalid begin_date and end_date parameter, expects unsuccessful insertion
        it('Invalid begin_date and end_date', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/projects',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    vision: 'Test vision',
                    name: 'Test name',
                    begin_date: '2019-01-01 01:01:01', //Invalid begin
                    end_date: '2018-01-01 01:01:01', //Invalid end
                    background: 'Test background',
                    risks: 'Test risks',
                    reach: 'Test reach',
                    scrum_master_id: 'A00000000'
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newProject = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + '/projects', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findProject(list, newProyecto);
                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });
        
        //Null vision parameter, expects unsuccessful insertion
        it('Null vision', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/projects',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    vision: null,
                    name: 'Test name',
                    begin_date: '2018-01-01 01:01:01',
                    end_date: '2019-01-01 01:01:01',
                    background: 'Test background',
                    risks: 'Test risks',
                    reach: 'Test reach',
                    scrum_master_id: 'A00000000'
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newProject = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + '/projects', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findProject(list, newProyecto);
                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });

        //Null name parameter, expects unsuccessful insertion
        it('Null name', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/projects',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    vision: 'Test vision',
                    name: null,
                    begin_date: '2018-01-01 01:01:01',
                    end_date: '2019-01-01 01:01:01',
                    background: 'Test background',
                    risks: 'Test risks',
                    reach: 'Test reach',
                    scrum_master_id: 'A00000000'
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newProject = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + '/projects', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findProject(list, newProyecto);
                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });

        //Null background, expects unsuccessful insertion
        it('Null background', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/projects',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    vision: 'Test vision',
                    name: 'Test name',
                    begin_date: '2019-01-01 01:01:01',
                    end_date: '2018-01-01 01:01:01',
                    background: null,
                    risks: 'Test risks',
                    reach: 'Test reach',
                    scrum_master_id: 'A00000000'
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newProject = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + '/projects', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findProject(list, newProyecto);
                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });

        //Null risks, expects unsuccessful insertion
        it('Null risks', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/projects',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    vision: 'Test vision',
                    name: 'Test name',
                    begin_date: '2019-01-01 01:01:01',
                    end_date: '2018-01-01 01:01:01',
                    background: 'Test background',
                    risks: null,
                    reach: 'Test reach',
                    scrum_master_id: 'A00000000'
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newProject = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + '/projects', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findProject(list, newProyecto);
                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });

        //Null reach, expects unsuccessful insertion
        it('Null reach', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/projects',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    vision: 'Test vision',
                    name: 'Test name',
                    begin_date: '2019-01-01 01:01:01',
                    end_date: '2018-01-01 01:01:01',
                    background: 'Test background',
                    risks: 'Test risks',
                    reach: null,
                    scrum_master_id: 'A00000000'
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newProject = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + '/projects', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findProject(list, newProyecto);
                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });

        //Null scrum master, expects unsuccessful insertion
        it('Null scrum master', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/projects',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    vision: 'Test vision',
                    name: 'Test name',
                    begin_date: '2019-01-01 01:01:01',
                    end_date: '2018-01-01 01:01:01',
                    background: 'Test background',
                    risks: 'Test risks',
                    reach: null,
                    scrum_master_id: null
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newProject = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + '/projects', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findProject(list, newProyecto);
                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });

        //INvalid scrum master, expects unsuccessful insertion
        it('Invalid scrum master', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/projects',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    vision: 'Test vision',
                    name: 'Test name',
                    begin_date: '2019-01-01 01:01:01',
                    end_date: '2018-01-01 01:01:01',
                    background: 'Test background',
                    risks: 'Test risks',
                    reach: null,
                    scrum_master_id: '99999'
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newProject = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + '/projects', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findProject(list, newProyecto);
                    expect(found).to.be.false; // check that no coincidence is found
                });

                done();
            });
        });
    });

    //Retrieve opertion
    describe('Retrieve: #retrieve() | parameters: id', () => {

        // Retrieve an existent project, a successfull response conataining the project
        it('Retrieve existent project', (done) => {
            let project = { 
                id: 1, 
                vision: 'Test vision',
                name: 'Test name',
                begin_date: '2018-01-01 01:01:01',
                end_date: '2019-01-01 01:01:01',
                background: 'Test background',
                risks: 'Test risks',
                reach: 'Test reach',
                scrum_master_id: 'A00000000'
            };

            request.get(URL + '/projects/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let retrived = JSON.parse(body);

                expect(proyecto.vision).to.be.equal(retrieved.vision); // check that the object we created and the one obtain are equal
                expect(proyecto.name).to.be.equal(retrieved.name);
                expect(proyecto.begin_date).to.be.equal(retrieved.begin_date);
                expect(proyecto.end_date).to.be.equal(retrieved.end_date);
                expect(proyecto.background).to.be.equal(retrieved.background);
                expect(proyecto.risks).to.be.equal(retrieved.risks);
                expect(proyecto.reach).to.be.equal(retrieved.reach);
                expect(proyecto.scrum_master_id).to.be.equal(retrieved.scrum_master_id);
            });
            done();
        });

        // Retrieve a non-existent project , an unsuccessfull response
        it('Retrieve non existent project', (done) => {
            request.get(URL + '/projects/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
            });
            done();
        });
    });

    //Update opertion
    describe('Update: #update(vision, name, begin_date, end_date, background, risks, reach) | parameters: id, body: vision, name, begin_date, end_date, background, risks, reach', () => {

        // Update with wrong begin_date 
        it('Update with wrong dates', (done) => {

            request.get(URL + '/projects/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful

                let oldProject = { 
                    id: body.id, 
                    vision: body.vision,
                    name: body.name,
                    begin_date: body.begin_date,
                    end_date: body.end_date,
                    background: body.background,
                    risks: body.risks,
                    reach: body.reach,
                    scrum_master_id: body.scrum_master_id
                };

                let newProject = { 
                    id: body.id, 
                    vision: body.vision,
                    name: body.name,
                    begin_date: body.end_date, //Begin_date is now end_date
                    end_date: body.begin_date, //End_date is now begin_date
                    background: body.background,
                    risks: body.risks,
                    reach: body.reach,
                    scrum_master_id: body.scrum_master_id
                };

                let putOptions = {
                    url: URL + '/projects',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newProject)
                };

                // Make put request
                request.put(putOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // response should be 400

                    // Make get request to check that the object was not inserted
                    request.get( URL + '/projects', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful
                        
                        let list = JSON.parse(body);
                        let found1 = findProject(list, newProject);
                        expect(found1).to.be.false; // check that no coincidence is found

                        let found2 = findProject(list, oldProject);
                        expect(found2).to.be.true; // check that a coincidence is found
                    });

                    done();
                });
            });

        });

        
        // Update with invalid scrum master
        it('Update with inavalid scrum master', (done) => {

            request.get(URL + '/projects/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful

                let oldProject = { 
                    id: body.id, 
                    vision: body.vision,
                    name: body.name,
                    begin_date: body.begin_date,
                    end_date: body.end_date,
                    background: body.background,
                    risks: body.risks,
                    reach: body.reach,
                    scrum_master_id: body.scrum_master_id
                };

                let newProject = { 
                    id: body.id, 
                    vision: body.vision,
                    name: body.name,
                    begin_date: body.end_date,
                    end_date: body.begin_date,
                    background: body.background,
                    risks: body.risks,
                    reach: body.reach,
                    scrum_master_id: '999999'
                };

                let putOptions = {
                    url: URL + '/projects',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newProject)
                };

                // Make put request
                request.put(putOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // response should be 400

                    // Make get request to check that the object was not inserted
                    request.get( URL + '/projects', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful
                        
                        let list = JSON.parse(body);
                        let found1 = findProject(list, newProject);
                        expect(found1).to.be.false; // check that no coincidence is found

                        let found2 = findProject(list, oldProject);
                        expect(found2).to.be.true; // check that a coincidence is found
                    });

                    done();
                });
            });
        });
    });

    //Delete opertion
    describe('Delete: #delete() | parameters: id', () => {

        // Delete a non-existent project, response: unsuccesfull 
        it('Delete non existent project', (done) => {
            request.delete(URL + '/projects/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); //response should be unsuccesfull
            });
            done();
        });

        // Delete an existent project
        it('Delete existent project', (done) => {
            // Define POST request parameters and body
            let postOptionsProject = {
                url: URL + '/projects',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    vision: 'Test vision',
                    name: 'Test name',
                    begin_date: '2018-01-01 01:01:01',
                    end_date: '2019-01-01 01:01:01',
                    background: 'Test background',
                    risks: 'Test risks',
                    reach: 'Test reach',
                    scrum_master_id: 'A00000000'
                })
            };

            var projectID;

            // Make post request
            request.post(postOptionsProject, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newProyecto = JSON.parse(body);
                projectID = newProyecto.id;
            });

            let postOptionsUser_stories = {
                url: URL + '/user-stories',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    weight: 1,
                    scrum_board_status: 2,
                    description: 'Test description',
                    priority: 2,
                    sprint_id: 1,
                    project_id: projectID
                })
            };

            var user_storyID;

            // Make post request
            request.post(postOptionsUser_stories, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newUser_story = JSON.parse(body);
                user_storyID = newUser_story.id;
            });

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

            // Make post request
            request.post(postOptionsTasks, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newTask = JSON.parse(body);
                taskID = newTask.id;
            });
            
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

            // Make post request
            request.post(postOptionsAcceptance_criteria, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newAcceptance = JSON.parse(body);
                acceptanceID = newAcceptance.id;
            });
            
            // Make delete request to delte the inserted project
            request.delete( URL + '/projects/' + projectID, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
            });


            // Make get request to get the deleted project
            request.get( URL + '/projects/' + projectID, (error, response, body) => {
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
            done();
        });
    });
});
