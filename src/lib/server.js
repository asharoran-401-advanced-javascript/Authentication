// eslint-disable-next-line strict
'use strict';

//----------------------- 3rd parrty Dependencies  ------------//

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('../lib/logger.js');
const User = require('../user/user-model.js');
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

authRouter.post('/signup' , (req , res) =>{
  let user = new User(req.body);
  user.save()
    .then( newUser =>{
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
