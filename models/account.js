'use strict';

const { Sequelize, sequelize } = require('../sequelize');
const User = require('./user');
const Model = Sequelize.Model;

class Account extends Model {}
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
    typeOfAccount: {
      type: Sequelize.STRING
    },
    isOnBudget: {
      type: Sequelize.BOOLEAN
    },
    isClosed: {
      type: Sequelize.BOOLEAN
    },
    createDate: {
      type: Sequelize.DATE
    },
    updateDate: {
      type: Sequelize.DATE
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    schema: 'api',
    tableName: 'account',
    modelName: 'account',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
);

module.exports = Account;
