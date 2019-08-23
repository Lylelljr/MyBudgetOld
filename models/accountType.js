const { Sequelize, sequelize } = require('../sequelize');
const Model = Sequelize.Model;

class AccountType extends Model {};
AccountType.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    schema: 'api'
  }
);

module.exports = AccountType;