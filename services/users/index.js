'use strict';

const users = require('../../data/users.js');
const bcrypt = require('bcrypt');

/**
 * Create a new user
 * @param {Object} user: {email, password}
 */
async function create(user) {
  try {
    const { email, password } = user;
    const hash = await bcrypt.hashSync(password);
    await users.create({
      email,
      password: hash
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Update a user
 * @param {Object} user: {id, email, password}
 */
async function update(user) {
  try {
    const { id, email, password } = user;
    const hashedPassword = await bcrypt.hashSync(password);
    await users.update({
      id,
      email,
      hashedPassword
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Get the user by the id
 * @param {integer} id
 */
async function getByID(id) {
  try {
    const user = await users.getByID(id);
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
  update,
  getByEmail,
  getByID
};
