const { Sequelize, sequelize } = require('../sequelize');
const Model = Sequelize.Model;

class User extends Model {}
User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    createDate: {
      type: Sequelize.DATE
    },
    updateDate: {
      type: Sequelize.DATE
    }
  },
  {
    sequelize,
    schema: 'api',
    tableName: 'user',
    modelName: 'user',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
);

module.exports = User;
