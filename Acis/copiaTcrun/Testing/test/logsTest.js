const expect  = require('chai').expect;
const request = require('request');
const URL = 'http://localhost:8000/api';

/**
 * Tests for Log model and controller.
 */

// Search a log in a list of logs
function findLog(logs, newLog){
    let found = false;
    logs.array.forEach(log => { // check that the object we tryed to insert is different to every object in the DB
        if(log.query === newLog.query && log.member_id === newLog.member_id){
            found = true;
            break;
        }     
    });

    return found;
}

describe('Log model', () => {

    //Retrieve opertion
    describe('Retrieve: #retrieve() | parameters: id', () => {

        // Retrieve an existent log , a successfull response conataining the log
        it('Retrieve existent log', (done) => {
            let log = {
                query: 'CREATE project',
                member_id: 'A00000000'
            }
            
            request.get(URL + '/logs/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                expect(body.member_id).to.be.equal(log.member_id);
                expect(body.query).to.be.equal(log.query);
            });
            done();
        });

        // Retrieve an existent log , a successfull response conataining the log
        it('Retrieve non existent log', (done) => {
            request.get(URL + '/logs/50', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
            });
            done();
        });
    });

    // Create operation
    describe('Create: #create(query, member_id) | body: query, member_id', () => {
        
        // complete and correct parameters, expects successful insertion
        it('valid request', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/logs',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: 'INSERT INTO logs', member_id: 'A01329447'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
                let newLog = body;

                // Make get request to get the inserted object
                request.get( URL + '/logs/' + newLog.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    expect(body.id).to.be.equal(newLog.id);
                    expect(body.member_id).to.be.equal(log.member_id);
                    expect(body.query).to.be.equal(log.query);
                    
                }); 
            });
            done();
        });

        // null query parameter, expects unsuccessful insertion
        it('Null query', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/logs',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: null, member_id: 'A01329447'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newLog = JSON.parse(postOptions.body);

                // Make get request to check that the object was not inserted
                request.get( URL + '/logs', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findLog(list, newLog);
                    expect(found).to.be.false; // check that no coincidence is found
                    
                });    
            });
            done();
        });

        // Incorrect member_id parameter, expects unsuccessful insertion
        it('Incorrect member_id', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/logs',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: 'INSERT INTO LOGS ...', member_id: 'B01324568'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newLog = JSON.parse(postOptions.body);

                // Make get request to check that the object was not inserted
                request.get( URL + '/logs', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findLog(list, newLog);

                    expect(found).to.be.false; // check that no coincidence is found
                    
                });
            });
            done();
        });

        // null member_id parameter, expects unsuccessful insertion
        it('Null member_id', (done) => {
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/logs',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: 'INSERT INTO LOGS ...', member_id: 'A01329447'})
            };

            // Make post request
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); // response should be error 400
                let newLog = postOptions.body;

                // Make get request to check that the object was not inserted
                request.get( URL + '/logs', (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    
                    let list = JSON.parse(body);
                    let found = findLog(list, newLog);

                    expect(found).to.be.false; // check that no coincidence is found
                });
            });
            done();
        });
    });
});
