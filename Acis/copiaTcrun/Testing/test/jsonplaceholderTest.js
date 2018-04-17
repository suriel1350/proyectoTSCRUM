const expect  = require('chai').expect;
const request = require('request');
const URL = 'https://jsonplaceholder.typicode.com';

describe('API example test', function(){
    describe('Retrieve', function(){    
        it('Online test RestfulAPI', (done) => {
            request(URL + '/posts/1' , (error, response, body) => {
                let post = {
                    userId: 1,
                    id: 1,
                    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                };

                let parsed = JSON.parse(body);

                expect(parsed).to.deep.equal(post);
                done();
            });
        });
    });
});
