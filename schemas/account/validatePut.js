const Joi = require('@hapi/joi');
const options = require('../../joi/options.js');

const schema = Joi.object().keys({
  accountName: Joi.string().required(),
  currentBalance: Joi.number().required(),
  dateOfCurrentBalance: Joi.date().required(),
  typeOfAccount: Joi.string().required(),
  isOnBudget: Joi.boolean().required(),
  isClosed: Joi.boolean().required()
});

function validateSchema(request) {
  return Joi.validate(request, schema, options);
}

module.exports = validateSchema;
