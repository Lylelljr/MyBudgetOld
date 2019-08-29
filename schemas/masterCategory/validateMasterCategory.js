'use strict';

const Joi = require('@hapi/joi');
const options = require('../../joi/options.js');

const schema = Joi.object().keys({
  name: Joi.number().integer().required()
});

function validateSchema(request) {
  return Joi.validate(request, schema, options);
}

module.exports = validateSchema;
