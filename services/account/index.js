'use strict';

const Account = require('../../models/account');

async function getAll() {
  try {
    const accounts = await Account.findAll();
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
    const account = await Account.findOne({ where: { id } });
    return account;
  } catch (error) {
    throw error;
  }
}

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

    await Account.update(
      {
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
  getByIdAccountName,
  getByUserId,
  deleteById,
  updateById
};
