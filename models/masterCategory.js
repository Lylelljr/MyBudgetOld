'use strict';

const { Sequelize, sequelize } = require('../sequelize');
const Model = Sequelize.Model;
const User = require('./user');

class MasterCategory extends Model {};
MasterCategory.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    sortOrder: {
      type: Sequelize.INTEGER
    }
  },
  {
    sequelize,
    schema: 'api'
  }
);

MasterCategory.belongsTo(User, {
  as: 'user',
  foreignKey: { 
    name: 'userId',
    field: 'userId'
  }
});

User.hasMany(MasterCategory, {
  foreignKey: { 
    name: 'userId',
    field: 'userId'
  } 
});

module.exports = MasterCategory;