'use strict';

const Account = require('../../models/account.js');
const AccountType = require('../../models/accountType.js');
const User = require('../../models/user.js');

async function getAll() {
  try {
    const accounts = await Account.findAll({ include: [{ model: AccountType, as: 'accountTypes' }] });
    return accounts.length > 0 ? accounts : null;
  } catch (error) {
    throw error;
  }
}

async function create(account) {
  try {
    const {
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      isOnBudget,
      isClosed,
      userId,
      accountTypeId
    } = account;

    account = await Account.create({
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      isOnBudget,
      isClosed,
      userId,
      accountTypeId
    });
    return account.id;
  } catch (error) {
    throw error;
  }
}

async function getById(id) {
  try {
    const account = await Account.findOne({ where: { id }, include: ['accountType', 'user'] });
    return account;
  } catch (error) {
    throw error;
  }
}

async function getByUserIdName(userId, accountName) {
  try {
    const account = await Account.findOne({ where: { userId, accountName }, include: ['accountType'] });
    return account;
  } catch (error) {
    throw error;
  }
}

async function getByUserId(userId) {
  try {
    const accounts = await Account.findAll({ where: { userId }, include: ['accountType'] });
    return accounts.length > 0 ? accounts : null;
  } catch (error) {
    throw error;
  }
}

async function updateById(id, account) {
  try {
    const {
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      typeOfAccount,
      isOnBudget,
      isClosed
    } = account;

    await Account.update({
        accountName,
        currentBalance,
        dateOfCurrentBalance,
        typeOfAccount,
        isOnBudget,
        isClosed
      },
      { where: { id } }
    );
  } catch (error) {
    throw error;
  }
}

async function deleteById(id) {
  try {
    await Account.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  getAll,
  getById,
  getByUserIdName,
  getByUserId,
  deleteById,
  updateById
};
