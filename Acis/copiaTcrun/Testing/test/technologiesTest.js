const expect  = require('chai').expect;
const request = require('request');
const URL = 'http://localhost:8080/api';


/**
 * Tests for technology model and controller.
 */

 // Search a tehnology in a list of technologies

 function findTechnology(technology, newTechnology){
    let found = false; 
    technology.array.forEach(element => { //check that the object we tried to insert is different to every object in the DB
        if(element.name === newTechnology.name){
            found = true;
            break;
        }
    });

    return found;
 }

describe('Technology model', () => {

    // Create operation
    describe('Create: #create(name) | body: name', () => {
        
        // complete and correct parameters, expects successful insertion
        it('valid request', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/technology',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: 'NODEJS'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newTechnologie = JSON.parse(body);

                // Make get request to get the inserted object
                request.get( URL + 'technology/' + newTechnologie.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    expect(newTechnologie).to.deep.equal(JSON.parse(body)); // check that the object we created and the one obtain are equal
                });

                done();
            });
        });

        // empty name is passed as parameter, expects error in insertion
        it('empty name', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/technology',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: ''}) //Empty name field

            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // if response is successful
                let newTechnologie = postOptions.body;

                // Make get request to get the inserted object
                request.get( URL + 'technology/', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful

                    let list = JSON.parse(body);
                    let found = findTechnology(list, newTechnologie);
                    expect(found).to.be.false;

                });

                done();
            });
        });
    });
    //Retrieve operation
    describe('Retrieve: #retrieve() | parameters: id', () => {

        // Retrieve an existent technology, a successful response containing the technology
        it('Retrieve existent technology', (done) => {
            let technology = {
                id : 1,
                name : 'NODEJS'
            };

            request.get(URL + '/technology/' + newTechnologie.id, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); //If response is successful
                expect(JSON.parse(body)).to.be.deep(newTechnologie);
            });

            done();
        });

        //Try to retrieve a technology that does not exist
        it('Retrieve a non-existent technology', (done) => {

            //Try to retrieve a member whose ID is 0 (fake id)
            request.get(URL + '/technology/0', (error, response, body) => {

                expect(response.statusCode).to.be.equal(400); //If response failed
            });

            done();
        });
    });

    // Update operation
    describe('Update: #update(id, name) | body: id, name', () => {

        // Try to update a technology. Make the name field a non-existent value.
        it('Update a technology with a non-existent name field', (done) => {
            
            request.get(URL + '/technology/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldTechnology = {

                    id: body.id,
                    name: body.name
                };

                let newTechnology = {

                    id: body.id,
                    name: "NON_EXISTENT_VALUE" //non-existent value of a name
                };

                let putOptions = {

                    url: URL + '/technology',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTechnologie)
                };

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Make a get request to verify that the object was not inserted
                    request.get(URL + '/technology', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findTechnology(list, newTechnology);
                        expect(found1).to.be.false; //Check that the technology was not updated

                        let found2 = findTechnology(list, oldTechnology);
                        expect(found2).to.be.true; //Check that the technology with old values still exists
                    });

                    done();
                });                
            });
        });
    });

    //Delete operation
    describe('Delete: #delete() | parameters: id', () => {

        // Delete an existent technology, response: successful
        // Careful: Cascade deletion should be implemented and verified!
        it('Delete an existent technology', (done) => {
            
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/technology',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: '1',
                    name: 'NODEJS',
                })
            };

            // Make post request to create a new technology
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(201); // if response is successful
                let newTechnologie = JSON.parse(body);

                // Make get request to get the inserted object
                request.get(URL + 'technology/' + newTechnologie.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    expect(newTechnologie).to.deep.equal(JSON.parse(body)); // check that the object we created and the one obtain are equal
                });
            });

            // Make delete request to delete the inserted member
            request.delete( URL + '/technology/' + postOptions.id, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
            });

            done();
        });


        // Try to delete a non-existent technology, response: unsuccesful
        it('Delete a non-existent technology', (done) => {
            request.delete(URL + '/technology/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); //response should be unsuccesful
            });
            done();
        });
    });
});