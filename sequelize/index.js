const Sequelize = require('Sequelize');

const { host, port, user, password, database, dialect, logging, pool, ssl } = JSON.parse(process.env.DB_CONFIG);

const sequelize = new Sequelize(database, user, password, {
  port,
  host,
  dialect,
  pool,
  logging,
  ssl,
  dialectOptions: {
    ssl:{
      require: ssl
    }
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Successfully connected to database ${database}`);
  })
  .catch((error) => {
    console.error(`Failed to connect to database ${database}`, error);
  });

//sequelize.sync();

module.exports = { sequelize, Sequelize };
