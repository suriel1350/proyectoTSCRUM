const expect = require('chai').expect;
const request = require('request');
const URL = 'http://localhost:8000/api';

/**
 * Tests for Member model and controller.
 */

/** 
 * Function to find a member in a list of members
 * 
 * @param members the list of members
 * @param member the member to look for
 * @returns true if the member was found. Else, false.
 */
function findMember(members, member) {

    logs.array.forEach(element => {
        // check that the object we tried to insert is different to every object in the DB
        if (element.id === member.id &&
            element.department_major === member.department_major &&
            element.name === member.name &&
            element.photo_URL === member.photo_URL &&
            element.password === member.password) {

            return true;
        }
    });

    return false;
}

/**
 * Function to retrieve from the DB the password of a given member
 * 
 * @param memberId the id of the member whose password is to be retrieved
 * @returns the password of the member stored in the DB
 */
function getMemberPassword(memberId){

    //TODO: Look how to query the DB inside a test
    return "TEST_VALUE-FIX_THE_FUNCTION_LOGIC: THIS SHOULD BE THE PASSWORD IN THE DB";
}

/**
 * Function to compare two strings
 * 
 * @param str1 the first string
 * @param str2 the second string
 * @returns true is the string are equal. Else, false.
 */
function areEqualStrings(str1, str2){

    return str1.equal(str2);
}

describe('Member model', () => {

    // Create operation
    describe('Create: #create(' +
        'id, department_major, name, photo_URL, password) | ' +
        'body: id, department_major, name, photo_URL, password', () => {

            // complete and correct parameters, expects successful insertion
            it('valid request', (done) => {
                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/members',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: 'ITC',
                        name: 'firstName lastName',
                        photo_URL: 'foto_URL',
                        password: '12345'
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(201); // if response is successful
                    let newMember = JSON.parse(body);

                    // Make get request to get the inserted object
                    request.get(URL + 'members/' + newMember.id, (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful
                        expect(newMember).to.deep.equal(JSON.parse(body)); // check that the object we created and the one obtain are equal
                    });

                    done();
                });
            });

            // empty department_major is passed as parameter, expects error in insertion
            it('empty department_major', (done) => {

                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/members',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: '', //Empty department_major field
                        name: 'firstName lastName',
                        photo_URL: 'foto_URL',
                        password: '12345'
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // if response is successful
                    let newMember = postOptions.body;

                    // Make get request to get the inserted object
                    request.get(URL + 'members/', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful

                        let list = JSON.parse(body);
                        let found = findMember(list, newMember);
                        expect(found).to.be.false;
                    });

                    done();
                });
            });

            // empty name is passed as parameter, expects error in insertion
            it('empty name', (done) => {

                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/members',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: 'ITC', 
                        name: '', //Empty name field
                        photo_URL: 'foto_URL',
                        password: '12345'
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // if response is successful
                    let newMember = postOptions.body;

                    // Make get request to get the inserted object
                    request.get(URL + 'members/', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful

                        let list = JSON.parse(body);
                        let found = findMember(list, newMember);
                        expect(found).to.be.false;
                    });

                    done();
                });
            });

            // empty password is passed as parameter, expects error in insertion
            it('empty password', (done) => {

                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/members',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: 'ITC', 
                        name: 'firstName lastName',
                        photo_URL: 'foto_URL', 
                        password: '' //Empty password field
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // if response is successful
                    let newMember = postOptions.body;

                    // Make get request to get the inserted object
                    request.get(URL + 'members/', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful

                        let list = JSON.parse(body);
                        let found = findMember(list, newMember);
                        expect(found).to.be.false;
                    });

                    done();
                });
            });

            // Test to verify that a password was hashed
            it('password was hashed', (done) => {

                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/members',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: 'ITC',
                        name: 'firstName lastName',
                        photo_URL: 'foto_URL',
                        password: '12345'
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(201); // if response is successful
                    let newMember = JSON.parse(body);

                    // Make get request to get the inserted object
                    request.get(URL + 'members/' + newMember.id, (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful

                        //Compare the password passed by the POST in the body and the 
                        //password stored in the DB after the insertion of the member
                        let storedPassword = getMemberPassword(newMember.id);
                        let areEqualPasswords = areEqualStrings(postOptions.password, storedPassword);
                        expect(areEqualPasswords).to.be.false;
                    });

                    done();
                });
            });
        });

    //Retrieve operation
    describe('Retrieve: #retrieve() | parameters: id', () => {

        // Successfully retrieve a member
        it('Retrieve an existent member', (done) => {
            
            let member = {

                id: 'A00000000',
                department_major: 'ITC',
                name: 'firstName lastName',
                photo_URL: 'photo_URL',
                //Should the password field be here as well?
            };

            request.get(URL + '/members/' + member.id, (error, response, body) => {

                expect(response.statusCode).to.be.equal(200); //If response is successful
                expect(JSON.parse(body)).to.be.deep(member);
            });
            
            done();
        });

        // Try to retrieve a member that does not exist
        it('Retrieve an non-existent member', (done) => {
            
            //Try to retrieve a member whose ID is 0 (fake id)
            request.get(URL + '/members/0', (error, response, body) => {

                expect(response.statusCode).to.be.equal(400); //If response failed
            });
            
            done();
        });
    });

    // Update operation
    describe('Update: #update(' +
        'id, department_major, name, photo_URL, password) | ' +
        'body: id, department_major, name, photo_URL, password', () => {

        // Try to update a member. Make the department_major field a non-existent value.
        it('Update a member with a non-existent department_major field', (done) => {
            
            request.get(URL + '/members/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldMember = {

                    id: body.id,
                    department_major: body.department_major,
                    name: body.name,
                    photo_URL: body.photo_URL,
                    password: body.password
                };

                let newMember = {

                    id: body.id,
                    department_major: "NON_EXISTENT_VALUE", //non-existent value of a department_major
                    name: body.name,
                    photo_URL: body.photo_URL,
                    password: body.password
                };

                let putOptions = {

                    url: URL + '/members',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newMember)
                }

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Make a get request to verify that the object was not inserted
                    request.get(URL + '/members', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findMember(list, newMember);
                        expect(found1).to.be.false; //Check that the member was not updated

                        let found2 = findMember(list, oldMember);
                        expect(found2).to.be.true; //Check that the member with old values still exists
                    });

                    done();
                });                
            });
        });

        // Try to update a member. Make the name field an empty string.
        it('Update a member with an empty name field', (done) => {
            
            request.get(URL + '/members/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldMember = {

                    id: body.id,
                    department_major: body.department_major,
                    name: body.name,
                    photo_URL: body.photo_URL,
                    password: body.password
                };

                let newMember = {

                    id: body.id,
                    department_major: body.department_major, 
                    name: '', //empty string for the name
                    photo_URL: body.photo_URL,
                    password: body.password
                };

                let putOptions = {

                    url: URL + '/members',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newMember)
                }

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Make a get request to verify that the object was not inserted
                    request.get(URL + '/members', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findMember(list, newMember);
                        expect(found1).to.be.false; //Check that the member was not updated

                        let found2 = findMember(list, oldMember);
                        expect(found2).to.be.true; //Check that the member with old values still exists
                    });

                    done();
                });                
            });
        });

        // Update the password and make sure it was hashed
        it('Update the password of a member. Make sure it was hashed.', (done) => {
            
            request.get(URL + '/members/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldMember = {

                    id: body.id,
                    department_major: body.department_major,
                    name: body.name,
                    photo_URL: body.photo_URL,
                    password: body.password
                };

                let newMember = {

                    id: body.id,
                    department_major: body.department_major, 
                    name: body.name, 
                    photo_URL: body.photo_URL,
                    password: body.password + 'other characters' //new password
                };

                let putOptions = {

                    url: URL + '/members',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newMember)
                }

                // Make the put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Make a get request to verify that the password was hashed
                    request.get(URL + '/members/' + oldMember.id, (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful
                        let updatedMember = JSON.parse(body);    

                        //Compare the previously stored password and the currently stored password
                        let areEqualPasswords = areEqualStrings(updatedMember.password, oldMember.password);
                        //They must be different
                        expect(areEqualPasswords).to.be.false;
                    });

                    done();
                });                
            });
        });

        // Update some or all of the fields of a member. Make sure that the update was successful.
        it('Update some or all of the fields of a member. Make sure that the update was successful.', (done) => {
            
            request.get(URL + '/members/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldMember = {

                    id: body.id,
                    department_major: body.department_major,
                    name: body.name,
                    photo_URL: body.photo_URL,
                    password: body.password
                };

                let newMember = {

                    id: body.id,
                    department_major: body.department_major, 
                    name: body.name + ' other characters',
                    photo_URL: body.photo_URL + '/photo/123',
                    password: body.password
                };

                let putOptions = {

                    url: URL + '/members',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newMember)
                }

                // Make a put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(200);

                    // Make a get request to verify that the object was successfully updated
                    request.get(URL + '/members', (error, response, body) => {

                        //If response is successful
                        expect(response.statusCode).to.be.equal(200); 

                        let list = JSON.parse(body);
                        let found1 = findMember(list, newMember);
                        //Check that the member was indeed updated
                        expect(found1).to.be.true; 

                        let found2 = findMember(list, oldMember);
                        //Check that the member with the old values does not exist anymore
                        expect(found2).to.be.false; 
                    });

                    done();
                });                
            });
        });
        
    });

    //Delete operation
    describe('Delete: #delete() | parameters: id', () => {

        // Delete an existent member, response: successful
        // Careful: Cascade deletion should be implemented and verified!
        it('Delete an existent member', (done) => {
            
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/members',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 'A99999999',
                    department_major: 'ITC',
                    name: 'firstName lastName',
                    photo_URL: 'foto_URL',
                    password: '12345'
                })
            };

            // Make post request to create a new member
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(201); // if response is successful
                let newMember = JSON.parse(body);

                // Make get request to get the inserted object
                request.get(URL + 'members/' + newMember.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    expect(newMember).to.deep.equal(JSON.parse(body)); // check that the object we created and the one obtain are equal
                });
            });

            // Make delete request to delete the inserted member
            request.delete( URL + '/members/' + postOptions.id, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
            });

            //Now verify that the items associated to this member (member_project, member_task) were also deleted in the DB

            // Query the instances of member_project of the member that was deleted
            // request.get();

            // Query the instances of member_task of the member that was deleted
            // request.get();

            done();
        });


        // Try to delete a non-existent member, response: unsuccesful
        it('Delete a non-existent member', (done) => {
            request.delete(URL + '/members/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); //response should be unsuccesful
            });
            done();
        });
    });
});