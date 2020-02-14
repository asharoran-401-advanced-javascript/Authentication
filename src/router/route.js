// eslint-disable-next-line strict
// 'use strict';

const express = require('express');
const authRouter = express.Router();

const Users = require('../user/users-schema.js');
const basicAuth = require('../auth/auth-middleware.js');
const oauth = require('../oauth/oauth-middleware.js');
const bearerAuth = require('../bearer/bearer-middleware.js');
const acl = require('../acl/acl-middleware.js');
// // //---------------------- test route ---------------//
// // router.get('/test' , (req , res) =>{
// //   res.send('hellllo , its Me');
// // });
// // //----------------- Create a record by SignUp Route ------------//

authRouter.post('/signup', (req, res,next) => {
  let user = new Users(req.body);
  user.save()
    .then(data => {
      req.token = user.generateToken(data);
      res.status(200).send(req.token);
    }).catch(next);
});

authRouter.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.token);
});

authRouter.get('/users',(req, res) => {
  Users.list()
    .then(data=>{
      res.status(200).json(data);
    });
});
//------------------------ Oauth -------------------//
authRouter.get('/oauth', oauth , (req, res) =>{
  res.status(200).send(req.token);
});
//---------------------- bearerAuth -----------------//

authRouter.get('/user', bearerAuth, (req, res) => {
  res.status(200).json(req.user);
});

//---------------------
authRouter.get('/public' , bearerAuth ,  (req , res , next) =>{
  Users.list()
    .then( user =>{
      res.status(200).json(user);

    });
});

authRouter.get('/private' , bearerAuth ,(req , res , next) =>{
  res.status(200).send(req.user);
});

authRouter.get('/readonly' , bearerAuth , acl('readonly') , (req , res , next) =>{
  res.status(200).send('read only');
});

authRouter.get('/create' , bearerAuth , acl('create') , (req , res , next) =>{
  res.status(200).send('read');
});



authRouter.get('/update' , bearerAuth , acl('update') , (req , res , next) =>{
  res.status(200).send(' update autherization ');
});

authRouter.get('/delete' , bearerAuth , acl('delete') , (req , res , next) =>{
  res.status(200).send(' delete autherization');
});

authRouter.get('/everything' , bearerAuth , acl('read, create, update, delete') , (req , res , next) =>{
  res.status(200).send('greate you autherized');
});




module.exports = authRouter;
