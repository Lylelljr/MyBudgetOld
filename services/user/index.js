'use strict';

const user = require('../../data/user.js');
const bcrypt = require('bcrypt');

/**
 * Create a new users db record
 * @param {string} email email address
 * @param {string} password unhashed password
 * @returns {integer} id of the users record created
 */
async function create(email, password) {
  try {
    const hash = await bcrypt.hashSync(password, 10);
    const id = await user.create({
      email,
      password: hash
    });
    return id;
  } catch (error) {
    throw error;
  }
}

/**
 * Update a users db record
 * @param {integer} id id of the users record to update
 * @param {string} password unhashed password
 */
async function updatePassword(id, password) {
  try {
    const hashedPassword = await bcrypt.hashSync(password);
    await user.updatePassword(id, hashedPassword);
  } catch (error) {
    throw error;
  }
}

/**
 * Get the user by the id
 * @param {number} id id of the users record to find
 * @returns {Object} user record
 */
async function getByID(id) {
  try {
    const user = await user.getByID(id);
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * Check if the email already exists in the Users table
 * @param {string} email
 */
async function getByEmail(email) {
  try {
    const user = await users.getByEmail(email);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  updatePassword,
  getByEmail,
  getByID
};
