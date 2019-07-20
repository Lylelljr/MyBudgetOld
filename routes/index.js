'use strict';

const router = require('express').Router();

const userController = require('../controllers/user');

const authController = require('../controllers/auth');

const accountController = require('../controllers/account');

router.use('/user', userController);

router.use('/auth', authController);

router.use('/account', accountController);

module.exports = router;
