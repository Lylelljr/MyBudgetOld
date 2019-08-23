'use strict';

const AccountType = require('../../models/accountType.js');

async function getAll() {
  try {
    const accountTypes = await AccountType.findAll({ where: { id } });
    return accountTypes;
  } catch (error) {
    throw error;
  }
}

async function getById(id) {
  try {
    const accountType = await AccountType.findOne({ where: { id } });
    return accountType;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getById,
  getAll
}