'use strict';

const express = require('express');
const helmet = require('helmet');

const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.sendStatus(204);
});

app.use('/api', routes);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.error(err);
  res.sendStatus(500);
});

module.exports = app;
