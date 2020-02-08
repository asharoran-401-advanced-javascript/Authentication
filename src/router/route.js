// eslint-disable-next-line strict
'use strict';

const express = require('express');

const router = new express.Router();

const UserSchema = require('../user/users-schema.js');
const auth = require('../auth/auth-middleware.js');

//---------------------- test route ---------------//
router.get('/test' , (req , res) =>{
  res.send('hellllo , its Me');
});
//----------------- Create a record by SignUp Route ------------//

router.post('/signup' , (req , res, next) =>{
  let user = new UserSchema(req.body);
  //   console.log('useeeeer' , user);
  console.log('requset body ',req.body);
  user.save()
    .then( newUser =>{
      console.log('new user =====' , newUser);
      req.token = user.generatendToken();
      req.user = newUser;
      res.send(req.token);
    })
    .catch(next);
});

router.post('/signin' ,auth, (req ,res , next) =>{
  res.status(200).send(req.token);
});

router.get('/users' , (req ,res  , next) =>{
//   let user = new UserSchema();
  UserSchema.get()
    .then( result =>{
      let count = result.length;
      res.status(200).json({result , count});
    });
});

module.exports = router;