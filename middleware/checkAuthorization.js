'use strict';

const jwt = require('jsonwebtoken');

const { tokenSecret } = JSON.parse(process.env.JWT_CONFIG);

function checkAuthorization(req, res, next) {
  if (!req.headers.authorization) {
    return res.sendStatus(401);
  }

  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, tokenSecret, (error, token) => {
    if (error) {
      return res.sendStatus(401);
    }
    req.token = token;
    next();
  });
}

module.exports = checkAuthorization;
