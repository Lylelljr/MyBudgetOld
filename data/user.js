'use strict';

const db = require('../db');

/**
 * Create a new User record
 * @param {string} email email address
 * @param {string} password hashed password
 * @returns {number} id of the users record created
 */
async function create(email, password) {
  try {
    const pool = db.init();
    const query = {
      text: 'insert into users (email, password) values($1, $2) returning id',
      values: [email, password]
    };
    const result = await pool.query(query);
    return result.rows[0].id;
  } catch (error) {
    throw error;
  }
}

/**
 * Update the password for a User record
 * @param {number} id ID of the User record to update
 * @param {string} password hashed password
 */
async function updatePassword(id, password) {
  try {
    const pool = db.init();
    const query = {
      text: 'update users set password = $1 where id = $2',
      values: [password, id]
    };
    await pool.query(query);
  } catch (error) {
    throw error;
  }
}

/**
 * Get a User for the id
 * @property {number} id ID of the User record to find
 */
async function getByID(id) {
  try {
    const pool = db.init();
    const query = {
      text: 'select id, email, password, create_date as createDate from users where id = $1',
      values: [id]
    };
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Get a user for the email
 * @param {string} email
 */
async function getByEmail(email) {
  try {
    const pool = db.init();
    const query = {
      text: 'select id, email, password, create_date from users where email = $1',
      values: [email]
    };
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  updatePassword,
  getByID,
  getByEmail
};
