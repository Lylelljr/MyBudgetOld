'use strict';

const Joi = require('@hapi/joi');
const options = require('../../joi/options.js');

const schema = Joi.object().keys({
  accountName: Joi.string().required(),
  currentBalance: Joi.number().required(),
  dateOfCurrentBalance: Joi.date().required(),
  accountTypeId: Joi.number().integer().required(),
  isOnBudget: Joi.boolean().required(),
  isClosed: Joi.boolean().required()
});

function validateSchema(request) {
  return Joi.validate(request, schema, options);
}

module.exports = validateSchema;
