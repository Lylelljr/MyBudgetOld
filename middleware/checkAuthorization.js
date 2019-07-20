'use strict';

const jwt = require('jsonwebtoken');

function checkAuthorization(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Authorization failed' });
  }

  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.TOKEN_SECRET, (error, token) => {
    if (error) {
      return res.status(401).json({ message: 'Authorization failed' });
    }
    req.token = token;
    next();
  });
}

module.exports = checkAuthorization;
