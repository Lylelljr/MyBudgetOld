'use strict';

/**
 * Accepts a joi validation error object and parses the error details into
 * an array.
 * @param {Object} validationError joi schema validation error object
 */
function joiErrorParser(validationError) {
  if (!validationError.error) return [];
  const errors = validationError.error.details.map((item) => {
    return {
      key: item.context.key,
      message: item.message.replace(/['"]/g, ''),
      value: item.context.value
    };
  });
  return errors;
}

module.exports = joiErrorParser;
