'use strict';

const jwt = require('jsonwebtoken');

function checkAuthorization(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Authorization failed' });
  }

  // Split the token at the space to get the bearer token
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.TOKEN_SECRET, (error, token) => {
    if (error) {
      return res.status(401).json({ message: 'Authorization failed' });
    }
    req.token = token;
    next();
  });
}

function add(a, b) {
  return a + b;
}

const result = add(5, 6);
console.log(result);
module.exports = checkAuthorization;
