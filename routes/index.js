'use strict';

const router = require('express').Router();

const usersController = require('../controllers/users');

const authController = require('../controllers/auth');

router.use('/users', usersController);

router.use('/auth', authController);

module.exports = router;
