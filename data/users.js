'use strict';

const db = require('../db/index.js');

/**
 * Create a new user
 * @param {Object} user: {email, password}
 */
async function create(user) {
  try {
    const { email, password } = user;
    const pool = db.init();
    const query = {
      text: 'insert into users (email, password) values($1, $2)',
      values: [email, password]
    };
    await pool.query(query);
  } catch (error) {
    throw error;
  }
}

/**
 * Update a user
 * @param {Update} user: {id, email, password}
 */
async function update(user) {
  try {
    const { id, email, password } = user;
    const pool = db.init();
    const query = {
      text: 'update users set email = $1, password = $2 where id = $3',
      values: [email, password, id]
    };
    await pool.query(query);
  } catch (error) {
    throw error;
  }
}

/**
 * Get a user for the id
 * @param {integer} id
 */
async function getByID(id) {
  try {
    const pool = db.init();
    const query = {
      text: 'select id, email, password, create_date from users where id = $1',
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
  update,
  getByID,
  getByEmail
};
