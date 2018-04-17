const expect  = require('chai').expect;
const request = require('request');
const URL = 'http://localhost:8000/api';

/**
 * Tests for Acceptance Criteria model and controller.
 */

// Search an acceptance criterion in a list of acceptance criteria
function findAcceptanceCriteria(acceptanceCriteria, newAcceptanceCriterion){
    let found = false;
    acceptanceCriteria.array.forEach(criterion => {
        if(criterion.name === newAcceptanceCriterion.name && criterion.type === newAcceptanceCriterion.type && criterion.user_story_id === newAcceptanceCriterion.user_story_id){
            found = true;
            break;
        }     
    });

    return found;
}

describe('Acceptance_criteria model', () => {

    // Create operation
    describe('Create: #create(name, type, user_story_id) | body: name, type, user_story_id', () => {
        
        // complete and correct parameters, expects successful insertion
        it('valid request', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/acceptance-criteria',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Criterion1',
                    type: 'ac type 1',
                    user_story_id: 1
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // should be successful
                let newAcceptance_criteria = JSON.parse(body);

                // Make get request to get the inserted object
                request.get( URL + '/acceptance-criteria/' + newAcceptance_criteria.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // should be successful
                    expect(newAcceptance_criteria).to.deep.equal(JSON.parse(body)); // checks that the object we created and the one obtained are equal
                });

                done();
            });
        });

        // The name for the acceptance criterion is empty, expects failure in insertion.
        it('empty name', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/acceptance-criteria',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: '', //Empty name
                    type: 'ac type 1',
                    user_story_id: 1
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); //response should be code 400
                let newAcceptance_criteria = JSON.parse(body);

                // Make get request to get the inserted object
                request.get(URL + 'acceptance-criteria/', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // should be successful

                    let list = JSON.parse(body);
                    let found = findAcceptanceCriteria(list, newAcceptance_criteria);
                    expect(found).to.be.false;
                });

                done();
            });
        });

        // The type for the acceptance criterion is empty, expects failure in insertion.
        it('empty type', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/acceptance-criteria',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Criterion1',
                    type: '', //Empty type
                    user_story_id: 1
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); //response should be code 400
                let newAcceptance_criteria = JSON.parse(body);

                // Make get request to get the inserted object
                request.get(URL + 'acceptance-criteria/', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // should be successful

                    let list = JSON.parse(body);
                    let found = findAcceptanceCriteria(list, newAcceptance_criteria);
                    expect(found).to.be.false;
                });

                done();
            });
        });

        // No id provided for user story, expects failure in insertion.
        it('empty user_story_id', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/acceptance-criteria',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Criterion1',
                    type: 'ac type 1', 
                    // Missing user_story_id
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); //response should be code 400
                let newAcceptance_criteria = JSON.parse(body);

                // Make get request to get the inserted object
                request.get(URL + 'acceptance-criteria/', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // should be successful

                    let list = JSON.parse(body);
                    let found = findAcceptanceCriteria(list, newAcceptance_criteria);
                    expect(found).to.be.false;
                });

                done();
            });
        });

        // The provided id for user_story is a wrong reference, expects failure in insertion.
        it('wrong user_story_id', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/acceptance-criteria',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Criterion1',
                    type: 'ac type 1', 
                    user_story_id: 0 //Non-existant id for user_story
                })
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); //response should be code 400
                let newAcceptance_criteria = JSON.parse(body);

                // Make get request to get the inserted object
                request.get(URL + 'acceptance-criteria/', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // should be successful

                    let list = JSON.parse(body);
                    let found = findAcceptanceCriteria(list, newAcceptance_criteria);
                    expect(found).to.be.false;
                });

                done();
            });
        });
    });

    //Retrieve opertion
    describe('Retrieve: #retrieve() | parameters: id', () => {

        // Retrieve an existent acceptance criterium , a successfull response conataining the log
        it('Retrieve existent acceptance criteria', (done) => {
            
            request.get(URL + '/acceptance-criteria/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // should be successful
            });
            done();

        });

        // Retrieve a non-existing acceptance criterium, expected to fail.
        it('Retrieve non existent log', (done) => {
            request.get(URL + '/acceptance-criteria/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
            });
            done();
        });
    });

    // Update operation
    describe('Update: #update('+
        'id, name, type, user_story_id) | '+
        'body: id, name, type, user_story_id', () => {
        
        // update contains empty name, expected to fail update. Old values should be unaffected.
        it('empty name', (done) => {

            request.get(URL + '/acceptance-criteria/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // should be successful
                let oldAcceptance_criteria = JSON.parse(body);//Old values

                //Define update values
                let putOptions = {
                    url: URL + '/acceptance-criteria/' + body.id,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: '',
                        type: body.type,
                        user_story_id: 1
                    })
                };

                request.put(putOptions, (error, response, body) => {
                    
                    expect(response.statusCode).to.be.equal(400);//Put should fail
                    
                    // Make get request to get the object with the old id, which should be unchanged.
                    request.get( URL + '/acceptance-criteria/' + oldAcceptance_criteria.id, (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // should be successful
                        expect(oldAcceptance_criteria).to.deep.equal(JSON.parse(body)); // checks that the object we created and the one obtained are equal
                    });
                    
                });

                done();
            });
           
        });

        // update contains empty type, expected to fail update. Old values should be unaffected.
        it('empty type', (done) => {

            request.get(URL + '/acceptance-criteria/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // should be successful
                let oldAcceptance_criteria = JSON.parse(body);//Old values

                //Define update values
                let putOptions = {
                    url: URL + '/acceptance-criteria/' + body.id,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: body.name,
                        type: '',
                        user_story_id: 1
                    })
                };

                request.put(putOptions, (error, response, body) => {
                    
                    expect(response.statusCode).to.be.equal(400);//Put should fail
                    
                    // Make get request to get the object with the old id, which should be unchanged.
                    request.get( URL + '/acceptance-criteria/' + oldAcceptance_criteria.id, (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // should be successful
                        expect(oldAcceptance_criteria).to.deep.equal(JSON.parse(body)); // checks that the object we created and the one obtained are equal
                    });
                    
                });

                done();
            });
           
        });

        // update contains empty user_Story_id, expected to fail update. Old values should be unaffected.
        it('empty user_story_id', (done) => {

            request.get(URL + '/acceptance-criteria/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // should be successful
                let oldAcceptance_criteria = JSON.parse(body);//Old values

                //Define update values
                let putOptions = {
                    url: URL + '/acceptance-criteria/' + body.id,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: body.name,
                        type: body.type
                        //user_story_id is missing, and will be undefined.
                    })
                };

                request.put(putOptions, (error, response, body) => {
                    
                    expect(response.statusCode).to.be.equal(400);//Put should fail
                    
                    // Make get request to get the object with the old id, which should be unchanged.
                    request.get( URL + '/acceptance-criteria/' + oldAcceptance_criteria.id, (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // should be successful
                        expect(oldAcceptance_criteria).to.deep.equal(JSON.parse(body)); // checks that the object we created and the one obtained are equal
                    });
                    
                });

                done();
            });
           
        });

        // update contains wrong user_story_id, expected to fail update. Old values should be unaffected.
        it('empty user_story_id', (done) => {

            request.get(URL + '/acceptance-criteria/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // should be successful
                let oldAcceptance_criteria = JSON.parse(body);//Old values

                //Define update values
                let putOptions = {
                    url: URL + '/acceptance-criteria/' + body.id,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: body.name,
                        type: body.type,
                        user_story_id: 0
                    })
                };

                request.put(putOptions, (error, response, body) => {
                    
                    expect(response.statusCode).to.be.equal(400);//Put should fail
                    
                    // Make get request to get the object with the old id, which should be unchanged.
                    request.get( URL + '/acceptance-criteria/' + oldAcceptance_criteria.id, (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // should be successful
                        expect(oldAcceptance_criteria).to.deep.equal(JSON.parse(body)); // checks that the object we created and the one obtained are equal
                    });
                    
                });

                done();
            });
           
        });
        
    });

    //Delete operation
    describe('Delete: #delete() | parameters: id', () => {

        // Delete an acceptance criterium
        // Nothing cascades here!
        it('Existing acceptance_criteria ', (done) => {
            
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/acceptance-criteria',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'Criterium 1',
                    type: 'ac type 1',
                    user_story_id: 1
                })
            };

            // Use post request to get new acceptance criterium
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // response should be succesful
                let newAcceptance_criteria = JSON.parse(body);

                // Make get request to get the inserted object
                request.get(URL + '/acceptance-criteria/' + newAcceptance_criteria.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // response should be succesful
                    expect(newAcceptance_criteria).to.deep.equal(JSON.parse(body)); // New object was properly created.
                });

                // Make delete request to delete the inserted criterium
                request.delete( URL + '/acceptance-criteria/' + newAcceptance_criteria.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // response should be succesful
                });

                // Make get request to see if deleted criterium is still available.
                request.get( URL + '/acceptance-criteria/' + newAcceptance_criteria.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400);
                });
            });

            done();
        });


        // Try to delete a non-existent member, response: unsuccesful
        it('Non-existing acceptance_criteria', (done) => {
            request.delete(URL + '/acceptance-criteria/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); //response should be unsuccesful
            });
            done();
        });
    });
});
