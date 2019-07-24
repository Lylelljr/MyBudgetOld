'use strict';

const db = require('../db');

/**
 * Get an Account for the id
 * @param {integer} id id of the Account record to find
 */
async function getByID(id) {
  try {
    const pool = db.init();
    const query = {
      text:
        'select id, name, current_balance, date_of_current_balance, type, is_budget_account, is_off_budget, is_closed, users_id, create_date from accounts where id = $1',
      values: [id]
    };
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new Account
 * @param {Object} account
 * @property {string} name name of the account
 * @property {float} currentBalance balance of the account
 * @property {date} dateOfCurrentBalance date that the currentBalance was read
 * @property {string} typeOfAccount accountType enum
 * @property {boolean} isBudgetAccount true = is on budget, false = is off budget
 * @property {integer} userID id of the User record the account belongs to
 */
async function create(account) {
  try {
    const {
      name,
      currentBalance,
      dateOfCurrentBalance,
      typeOfAccount,
      isBudgetAccount,
      userID
    } = account;

    const pool = db.init();
    const query = {
      text:
        'insert into accounts (name, current_balance, date_of_current_balance, type, is_budget_account, is_off_budget_account, users_id) values($1, $2, $3, $4, $5, $6, $7) returning id',
      values: [
        name,
        currentBalance,
        dateOfCurrentBalance,
        typeOfAccount,
        isBudgetAccount,
        isOffBudgetAccount,
        userID
      ]
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getByID,
  create
};
