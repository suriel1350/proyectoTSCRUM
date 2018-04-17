const expect  = require('chai').expect;
const request = require('request');
const URL = 'http://localhost:8080/api';


/**
 * Tests for Todo model and controller.
 */

describe('Todo model', () => {

    // Create operation
    describe('Create: #create(title) | body: title', () => {
        
        // complete and correct parameters, expects successful insertion
        it('valid request', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/todos',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'Test title'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(201); // if response is successful
                let newTodo = JSON.parse(body);

                // Make get request to get the inserted object
                request.get( URL + 'todos/' + newTodo.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    expect(newTodo).to.deep.equal(JSON.parse(body)); // check that the object we created and the one obtain are equal
                });

                done();
            });
        });

        // null title is passed as parameter, expects error in insertion
        it('null title', (done) => {
            // test logic
            done();
        });
    });

    //Retrieve opertion
    describe('Retrieve: #retrieve() | parameters: id', () => {

        // Description of this test , what is expected
        it('characteristic', (done) => {
            // test logic
            done();
        });
    });
});
