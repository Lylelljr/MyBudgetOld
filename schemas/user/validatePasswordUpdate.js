'use strict';

const Joi = require('@hapi/joi');
const options = require('../../joi/options.js');

const schema = Joi.object().keys({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required()
});

function validateSchema(request) {
  return Joi.validate(request, schema, options);
}

module.exports = validateSchema;