const Sequelize = require('Sequelize');

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    port: process.env.PGPORT,
    host: process.env.PGHOST,
    dialect: 'postgres',
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Successfully connected to database ${process.env.PGDATABASE}`);
  })
  .catch((error) => {
    console.error(`Failed to connect to database ${process.env.PGDATABASE}`, error);
  });

module.exports = { sequelize, Sequelize };
