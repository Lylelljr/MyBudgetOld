'use strict';

const { Pool } = require('pg');

function init() {
  const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
  });
  return pool;
}

module.exports = {
  init
};
