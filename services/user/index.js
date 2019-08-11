'use strict';

const User = require('../../models/user');
const bcrypt = require('bcrypt');

/**
 * Create a new User db record
 * @param {string} email email address
 * @param {string} password unhashed password
 * @param {string} firstName first name
 * @param {string} lastName last name
 * @returns {integer} id of the User record created
 */
async function create(email, password, firstName, lastName) {
  try {
    const hash = await bcrypt.hashSync(password, 10);
    const user = await User.create({ email, password: hash, firstName, lastName });
    return user.id;
  } catch (error) {
    esdwrrrrr;
    throw error;
  }
}

/**
 * Update a User db record
 * @param {integer} id id of the User record to update
 * @param {string} password unhashed password
 */
async function updatePassword(id, password) {
  try {
    const hashedPassword = await bcrypt.hashSync(password);
    await User.update({ password: hashedPassword }, { where: { id } });
  } catch (error) {
    throw error;
  }
}

/**
 * Get the User by the id
 * @param {number} id id of the User record to find
 * @returns {Object} User record
 */
async function getById(id) {
  try {
    const user = await User.findOne({ where: { id } });
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * Check if the email already exists in the User table
 * @param {string} email
 */
async function getByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  updatePassword,
  getByEmail,
  getById
};
