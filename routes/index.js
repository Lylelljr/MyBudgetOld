'use strict';

const router = require('express').Router();

const userController = require('../controllers/user');

const authController = require('../controllers/auth');

const accountController = require('../controllers/account');

const masterCategoryController = require('../controllers/masterCategory');

router.use('/user', userController);

router.use('/auth', authController);

router.use('/account', accountController);

router.use('/masterCategory', masterCategoryController);

module.exports = router;
