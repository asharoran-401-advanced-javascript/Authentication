// eslint-disable-next-line strict
'use strict';

const Users = require('../user/users-schema.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) { next('invalid login'); }

  console.log('req header',req.headers.authorization);
  let token = req.headers.authorization.split(' ').pop();

  Users.authenticateToken(token)
    .then(validUser => {
      req.user = validUser;
      console.log('req userrrr () :' , req.user);
      next();
    }).catch(err => next(err));
};

