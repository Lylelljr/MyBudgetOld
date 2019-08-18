'use strict';

const validateId = require('./validateId.js');
const validatePasswordUpdate = require('./validatePasswordUpdate.js');
const validateUser = require('./validateUser.js');

module.exports = {
  validateId,
  validatePasswordUpdate,
  validateUser
}