'use strict';

const Account = require('../../models/account');

async function create(account) {
  try {
    const {
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      typeOfAccount,
      isOnBudget,
      isClosed,
      userId
    } = account;

    account = await Account.create({
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      typeOfAccount,
      isOnBudget,
      isClosed,
      userId: userId
    });
    return account.id;
  } catch (error) {
    throw error;
  }
}

/**
 * Get an account by the id
 * @param {integer} id
 */
async function getById(id) {
  try {
    const account = await Account.findOne({ where: { id } });
    return account;
  } catch (error) {
    throw error;
  }
}

/**
 * Get an account by the id and name
 * @param {integer} id
 * @param {string} name
 */
async function getByIdAccountName(id, accountName) {
  try {
    const account = await Account.findOne({ where: { id, accountName } });
    return account;
  } catch (error) {
    throw error;
  }
}

async function getByUserId(userId) {
  try {
    const accounts = await Account.findAll({ where: { userId } });
    return accounts;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  getById,
  getByIdAccountName,
  getByUserId
};
