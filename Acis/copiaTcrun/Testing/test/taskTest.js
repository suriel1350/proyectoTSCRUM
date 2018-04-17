const expect  = require('chai').expect;
const request = require('request');
const URL = 'http://localhost:8000/api';

/**
 * Tests for Task model and controller.
 */

function containsSameData (task1, task2)
{
	return (task1.duration === task2.duration && task1.name === task2.name 
		&& task1.completed === task2.completed && task1.user_story_id === task2.user_story_id)
}

 // Search a task in a list of tasks
function findTask(tasks, targetTask){
    let found = false;
	tasks.array.forEach(element => { // check that the object we tried to insert is different to every object in the DB
		
		if (containsSameData(element, targetTask))
		{
			found = true;
			break;
		}     
    });

    return found;
}

describe('Task model', () => {

	//Create Tests
	describe('Create: #create(duration, name, completed, user_story_id) | body: duration, name, completed, user_story_id', () => {

		//Correct insertion
		it ('valid request', (done) => {

			//Declare post request
			let postOptions = {
				url: URL + '/tasks',
				headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ duration: 5, name: 'Comprar churros', completed:  'true', user_story_id: 1})
			};

			//Make request
			request.post (postOptions, (error, response, body) => {
				expect (response.statusCode).to.be.equal(200);

				let newTask = JSON.parse(body);

				//Make get request to get inserted object
				request.get (URL + '/tasks/' + newTask.id, (error, response, body) => {

					//Check that the newly inserted object has the same info as that sent
					expect (response.statusCode).to.be.equal(200);
					expect (containsSameData(JSON.parse(body), newTask)).to.be.true;

				});

				done();
			});
		});

		//Unsuccesful insertion due to null duration parameter
		it ('Null duration', (done) => {
			
			//Declare post request
			let postOptions = {
				url: URL + '/tasks',
				headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ duration: null,name: 'Terminar  test de tasks', completed:  'false', user_story_id: 1})
			};

			//Make post request
			request.post (postOptions, (error, response, body) => {
				//Request should fail
				expect (response.statusCode).to.be.equal(400);

				let newTask = postOptions.body;

				//Verify it wasn't inserted
				request.get (URL + '/tasks', (error, response, body) => {
					//Should be able to get all tasks
					expect (response.statusCode).to.be.equal(200);

					//the new task shouldn't be present
					let list = JSON.parse(body);
					let found = findTask(list, newTask);
					expect (found).to.be.false;
				});
			});

			done();
		});

		//Unsuccesful insertion due to null name parameter
		it ('Null name', (done) => {
				
			//Declare post request
			let postOptions = {
				url: URL + '/tasks',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ duration: 6,name: null, completed:  'false', user_story_id: 3})
			};

			//Make post request
			request.post (postOptions, (error, response, body) => {
				//Request should fail
				expect (response.statusCode).to.be.equal(400);

				let newTask = postOptions.body;

				//Verify it wasn't inserted
				request.get (URL + '/tasks', (error, response, body) => {
					//Should be able to get all tasks
					expect (response.statusCode).to.be.equal(200);

					//the new task shouldn't be present
					let list = JSON.parse(body);
					let found = findTask(list, newTask);
					expect (found).to.be.false;
				});
			});

			done();
		});

		//Unsuccesful insertion due to null completed parameter
		it ('Null completed', (done) => {
				
			//Declare post request
			let postOptions = {
				url: URL + '/tasks',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ duration: 6,name: "End task", completed:  null, user_story_id: 2})
			};

			//Make post request
			request.post (postOptions, (error, response, body) => {
				//Request should fail
				expect (response.statusCode).to.be.equal(400);

				let newTask = postOptions.body;

				//Verify it wasn't inserted
				request.get (URL + '/tasks', (error, response, body) => {
					//Should be able to get all tasks
					expect (response.statusCode).to.be.equal(200);

					//the new task shouldn't be present
					let list = JSON.parse(body);
					let found = findTask(list, newTask);
					expect (found).to.be.false;
				});
			});

			done();
		});

		//Unsuccesful insertion due to null user_story_id parameter
		it ('Null user_story_id', (done) => {
				
			//Declare post request
			let postOptions = {
				url: URL + '/tasks',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ duration: 6,name: 
				'Close repos' , completed:  'true', user_story_id: null})
			};

			//Make post request
			request.post (postOptions, (error, response, body) => {
				//Request should fail
				expect (response.statusCode).to.be.equal(400);

				let newTask = postOptions.body;

				//Verify it wasn't inserted
				request.get (URL + '/tasks', (error, response, body) => {
					//Should be able to get all tasks
					expect (response.statusCode).to.be.equal(200);

					//the new task shouldn't be present
					let list = JSON.parse(body);
					let found = findTask(list, newTask);
					expect (found).to.be.false;
				});
			});

			done();
		});

		//Unsuccesful insertion due to an invalid user_story_id parameter
		it ('Invalid user_story_id', (done) => {
				
			//Declare post request
			let postOptions = {
				url: URL + '/tasks',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ duration: 6,name: 
				'Close repos' , completed:  'true', user_story_id: 0})
			};

			//Make post request
			request.post (postOptions, (error, response, body) => {
				//Request should fail
				expect (response.statusCode).to.be.equal(400);

				let newTask = postOptions.body;

				//Verify it wasn't inserted
				request.get (URL + '/tasks', (error, response, body) => {
					//Should be able to get all tasks
					expect (response.statusCode).to.be.equal(200);

					//the new task shouldn't be present
					let list = JSON.parse(body);
					let found = findTask(list, newTask);
					expect (found).to.be.false;
				});
			});

			done();
		});
	});

	//Retrieve Tests
	describe('Retrieve: #retrieve() | parameters: id', () => {

		//Succesfully retrieve existing task
		it ('Retrieve existing task', (done) => {
			let task = { duration: 10,name: 'Discutir proyecto :v', completed:  'false', user_story_id: 1}

			//The response must be succesful, the object retrieved is exaclty as the one we know exists
			request.get(URL + '/tasks/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); 

				expect (containsSameData(JSON.parse(body), task)).to.be.true;
            });
            done();
		});

		//Unsuccesful retrieval of an unexisting task
		it ('Retrieve existing task', (done) => {

			//A SERIAL field in Postgres starts in 1, no id with 0 exists
			request.get(URL + '/tasks/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); 
            });
            done();
		});
	});

	//Update Tests
	describe('Update: #update(duration, name, completed, user_story_id) | parameters: id, body: duration, name, completed, user_story_id', () => {
		
		//Succesfully update a newly inserted task
		it('Update success', (done) => {

			// Define POST request parameters and body for a new task
			let newTask = {
				duration: 1,
				name: 'Contar corderitos',
				completed: 'false',
				user_story_id: 3
			};
            let postOptionsTask = {
                url: URL + '/tasks',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
			};

			var insertedTaskID;

			//Make insertion through post
			request.post(postOptionsTask, (error, response, body) => {
				//should insert succesfully
				expect(response.statusCode).to.be.equal(200); 

				//Save id
                let newTask = JSON.parse(body);
                insertedTaskID = newTask.id;
			});
			
			//Prepare to update
			let updatedTask = {
				duration: 5,
				name: 'Contar corderitos pero updateado a veda :v',
				completed: 'true',
				user_story_id: 4
			};
			let putOptions = {
				url: URL + '/tasks/' + insertedTaskID,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedTask)
			};
			
			// Make update through put request
			request.put(putOptions, (error, response, body) => {
				//Update must succed
				expect(response.statusCode).to.be.equal(400); 
				
				//Verify update
				request.get( URL + '/tasks', (error, response, body) => {
					//Must be able to get all tasks
					expect(response.statusCode).to.be.equal(200); 
					
					let list = JSON.parse(body);
					
					//Updated task should be be present
					let found = findTask(list, updatedTask);
					expect(found).to.be.true; 

					//Inserted task (not updated) shouldn't
					let found2 = findTask(list, newTask);
					expect(found2).to.be.false; 
				});

				done();
			});

             done();
		});

		//Unsuccesful update with empty duration
		it('Update with empty duration', (done) => {

			//Get a task
			request.get(URL + '/tasks/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200);
				let oldTask = {
					id: body.id,
					duration: body.duration,
					name: body.name,
					completed: body.completed,
					user_story_id: body.user_story_id
				};

				//Update the duration attribute to have it empty or null
				let newTask = {
					id: body.id,
					duration: null,
					name: body.name,
					completed: body.completed,
					user_story_id: body.user_story_id
				};

				let putOptions = {
                    url: URL + '/tasks/' + oldTask.id,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTask)
				};
				
				// Make put (update) request
                request.put(putOptions, (error, response, body) => {
					//Update must fail
					expect(response.statusCode).to.be.equal(400); 
					
                    request.get( URL + '/tasks', (error, response, body) => {
						//Must be able to get all tasks
						expect(response.statusCode).to.be.equal(200); 
						
						let list = JSON.parse(body);
						
						//Updated task should not be present
                        let found = findTask(list, newTask);
                        expect(found).to.be.false; 

						//Old task should
                        let found2 = findTask(list, oldTask);
                        expect(found2).to.be.true; 
                    });

                    done();
                });

			});
		});

		//Unsuccesful update with empty name
		it('Update with empty name', (done) => {

			//Get a task
			request.get(URL + '/tasks/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200);
				let oldTask = {
					id: body.id,
					duration: body.duration,
					name: body.name,
					completed: body.completed,
					user_story_id: body.user_story_id
				};

				//Update the name attribute to have it empty or null
				let newTask = {
					id: body.id,
					duration: body.duration,
					name: null,
					completed: body.completed,
					user_story_id: body.user_story_id
				};

				let putOptions = {
                    url: URL + '/tasks/' + oldTask.id,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTask)
				};
				
				// Make put (update) request
                request.put(putOptions, (error, response, body) => {
					//Update must fail
					expect(response.statusCode).to.be.equal(400); 
					
                    request.get( URL + '/tasks', (error, response, body) => {
						//Must be able to get all tasks
						expect(response.statusCode).to.be.equal(200); 
						
						let list = JSON.parse(body);
						
						//Updated task should not be present
                        let found = findTask(list, newTask);
                        expect(found).to.be.false; 

						//Old task should
                        let found2 = findTask(list, oldTask);
                        expect(found2).to.be.true; 
                    });

                    done();
                });

			});
		});

		//Unsuccesful update with empty completed field
		it('Update with empty completed', (done) => {

			//Get a task
			request.get(URL + '/tasks/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200);
				let oldTask = {
					id: body.id,
					duration: body.duration,
					name: body.name,
					completed: body.completed,
					user_story_id: body.user_story_id
				};

				//Update the completed attribute to have it empty or null
				let newTask = {
					id: body.id,
					duration: body.duration,
					name: body.name,
					completed: null,
					user_story_id: body.user_story_id
				};

				let putOptions = {
                    url: URL + '/tasks/' + oldTask.id,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTask)
				};
				
				// Make put (update) request
                request.put(putOptions, (error, response, body) => {
					//Update must fail
					expect(response.statusCode).to.be.equal(400); 
					
                    request.get( URL + '/tasks', (error, response, body) => {
						//Must be able to get all tasks
						expect(response.statusCode).to.be.equal(200); 
						
						let list = JSON.parse(body);
						
						//Updated task should not be present
                        let found = findTask(list, newTask);
                        expect(found).to.be.false; 

						//Old task should
                        let found2 = findTask(list, oldTask);
                        expect(found2).to.be.true; 
                    });

                    done();
                });

			});
		});

		//Unsuccesful update with empty user_story_id
		it('Update with empty user_story_id', (done) => {

			//Get a task
			request.get(URL + '/tasks/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200);
				let oldTask = {
					id: body.id,
					duration: body.duration,
					name: body.name,
					completed: body.completed,
					user_story_id: body.user_story_id
				};

				//Update the user_story_id attribute to have it empty or null
				let newTask = {
					id: body.id,
					duration: body.duration,
					name: body.name,
					completed: body.completed,
					user_story_id: null
				};

				let putOptions = {
                    url: URL + '/tasks/' + oldTask.id,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTask)
				};
				
				// Make put (update) request
                request.put(putOptions, (error, response, body) => {
					//Update must fail
					expect(response.statusCode).to.be.equal(400); 
					
                    request.get( URL + '/tasks', (error, response, body) => {
						//Must be able to get all tasks
						expect(response.statusCode).to.be.equal(200); 
						
						let list = JSON.parse(body);
						
						//Updated task should not be present
                        let found = findTask(list, newTask);
                        expect(found).to.be.false; 

						//Old task should
                        let found2 = findTask(list, oldTask);
                        expect(found2).to.be.true; 
                    });

                    done();
                });

			});
		});

		//Unsuccesful update with wrong or invalid user_story_id
		it('Update with wrong user_story_id', (done) => {

			//Get a task
			request.get(URL + '/tasks/1', (error, response, body) => {
                expect(response.statusCode).to.be.equal(200);
				let oldTask = {
					id: body.id,
					duration: body.duration,
					name: body.name,
					completed: body.completed,
					user_story_id: body.user_story_id
				};

				//Update the user_story_id attribute to have it reference a non existing user_story
				let newTask = {
					id: body.id,
					duration: body.duration,
					name: body.name,
					completed: body.completed,
					user_story_id: 0
				};

				let putOptions = {
                    url: URL + '/tasks/' + oldTask.id,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTask)
				};
				
				// Make put (update) request
                request.put(putOptions, (error, response, body) => {
					//Update must fail
					expect(response.statusCode).to.be.equal(400); 
					
                    request.get( URL + '/tasks', (error, response, body) => {
						//Must be able to get all tasks
						expect(response.statusCode).to.be.equal(200); 
						
						let list = JSON.parse(body);
						
						//Updated task should not be present
                        let found = findTask(list, newTask);
                        expect(found).to.be.false; 

						//Old task should
                        let found2 = findTask(list, oldTask);
                        expect(found2).to.be.true; 
                    });

                    done();
                });
			});
		});
	});

	//Delete Tests
	describe('Delete: #delete() | parameters: id', () => {

		//Succesfully delete an existent project on cascade
        it('Delete existent task and dependent tables ', (done) => {

            // Define POST request parameters and body for a new task
            let postOptionsTask = {
                url: URL + '/tasks',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    duration: 10,
                    name: 'Go buy churros',
                    completed: 'true',
                    user_story_id: 3
                })
			};

			var insertedTaskID;
			var insertedMemberTaskID;

			//Make insertion through post
			request.post(postOptionsTask, (error, response, body) => {
				//should insert succesfully
				expect(response.statusCode).to.be.equal(200); 

				//Save id
                let newTask = JSON.parse(body);
                insertedTaskID = newTask.id;
            });

			// Define POST request parameters and body for a new member_task pointing to the newly inserted task
            let postOptionsMember_task = {
                url: URL + '/member-task',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
					member_id: 1,
					task_id: insertedTaskID
                })
			};	
			
			//Make insertion through post
			request.post(postOptionsTask, (error, response, body) => {
				//should insert succesfully
				expect(response.statusCode).to.be.equal(200); 

				//Save id
                let newMemberTask = JSON.parse(body);
                insertedMemberTaskID = newMemberTask.id;
            });

			// Make delete request for the task
            request.delete( URL + '/tasks/' + insertedTaskID, (error, response, body) => {
				//Should delete succesfully
                expect(response.statusCode).to.be.equal(200); 
			});
			
			//Verify cascade delete by checking for the existence of the newly inserted
			// Make get request to get the deleted project
            request.get( URL + '/member-task/' + insertedMemberTaskID, (error, response, body) => {
				//Should fail to find it
                expect(response.statusCode).to.be.equal(400); 
			});
			
			done();
		});

		//Unsuccesfully delete a non existing project 
        it('Delete non existent project', (done) => {
            request.delete(URL + '/tasks/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); //response should be unsuccesfull
            });
            done();
        });

	});
});
