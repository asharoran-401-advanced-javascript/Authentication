// eslint-disable-next-line strict
'use strict';

//----------------------- 3rd parrty Dependencies  ------------//

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('../lib/logger.js');
const User = require('../user/user-model.js');
const Schema = require('../user/users-schema.js');
const bcrypt = require('bcryptjs');
// const auth = require('../auth/auth-middleware.js');

//---------------------- My application Constants -------------//
const authRouter = express.Router();
const server = express();
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(cors());
server.use(morgan('dev'));
server.use(logger);

//----------------- Create a record by SignUp Route ------------//


// let complixity = 5;


// userSchema.pre('save' ,  async function(record){
//   if(!userSchema.username){
//     record.username = await bcrypt.hash(record.password , complixity);
//     userSchema.username = record;
//     return record;
//   }else{
//     return Promise.reject();
//   }
// });

server.post('/signup' , (req , res) =>{
  let user = new User(req.body);
  let userSchema = new Schema();
  console.log('user schema' , userSchema);
  console.log('useeeeer' , user);
  console.log('requset body ',req.body);
  userSchema.save(req.body)
    .then( newUser =>{
      console.log('new user =====' , newUser);
      req.token = user.generatendToken();
      req.user = newUser;
      res.status(200).send(req.token);
    })
    .catch((error) =>console.error(error));
});

authRouter.post('/signin' , (req ,res) =>{
  res.status(200).send(req.token);
});


module.exports = {
  server : server,
  start : port =>{
    let PORT = port || process.env.PORT || 3300;
    server.listen(PORT , () =>{ console.log(`My Server is Work at ${PORT}`);});
  },
};
