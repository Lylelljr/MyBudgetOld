'use strict';

const { Sequelize, sequelize } = require('../sequelize');
const Model = Sequelize.Model;
const User = require('./user');
const AccountType = require('./accountType');

class Account extends Model {};
Account.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    accountName: {
      type: Sequelize.STRING
    },
    currentBalance: {
      type: Sequelize.INTEGER
    },
    dateOfCurrentBalance: {
      type: Sequelize.DATE
    },
    isOnBudget: {
      type: Sequelize.BOOLEAN
    },
    isClosed: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    sequelize,
    schema: 'api'
  }
);

User.hasMany(Account, { 
  foreignKey: { 
    name: 'userId',
    field: 'userId'
  } 
});

AccountType.hasOne(Account, { 
  foreignKey: { 
    name: 'accountTypeId',
    field: 'accountTypeId'
  } 
});

module.exports = Account;
