

const {server} = require('../src/lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const jwt = require('jsonwebtoken');
const mockRequest = supergoose(server);
// const supertest = require('supertest');

describe('User Route ' , () =>{

  let testUser = {
    username : 'test useeer',
    password : 'testtest123456789',
  };

  it('return respond (404) on invalid Route' , () =>{
    return mockRequest
      .get('/notFoundRoute')
      .then( results =>{
        expect(results.status).toBe(404);
      });
    //   });

  });
  it('Signup route () :' , () =>{
    return mockRequest
      .post('/signup')
      .send(testUser)
      .then(record => {
        console.log('======= record ======' , record.body);
        expect(record.status).toEqual(200);
        expect(testUser).toBeDefined();
      });

  });

});
it(' SignIn route() :' , () =>{
  let testUser = {
    username : 'test useeer',
    password : 'testtest123456789',
  };
  return mockRequest
    .post('/signin')
    .auth(testUser.username, testUser.password)
    .then(results => {
      console.log('###############' , results.body);
    //   expect(results.status).toEqual(200);
    });
});