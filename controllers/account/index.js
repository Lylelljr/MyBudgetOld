'use strict';

const router = require('express').Router();
const checkAuthorization = require('../../middleware/checkAuthorization.js');
const accountService = require('../../services/account');

router.get('/:id', checkAuthorization, async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await accountService.getById(id);
    if (!account) {
      return res.status(404).json({ message: `Account ${id} was not found` });
    }
    return res.status(200).json({ account });
  } catch (error) {
    throw error;
  }
});

router.post('/', checkAuthorization, async (req, res, next) => {
  try {
    const { userId } = req.token;
    const {
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      typeOfAccount,
      isOnBudget
    } = req.body;

    const accountExists = await accountService.getByIdAccountName(userId, accountName);
    if (accountExists) {
      return res.status(422).json({ message: `Account '${accountName}' already exists` });
    }

    const accountId = await accountService.create({
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      typeOfAccount,
      isOnBudget,
      isClosed: false,
      userId
    });
    return res.status(200).json({ accountId });
  } catch (error) {
    throw error;
  }
});

router.get('/user/:userId', checkAuthorization, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const accounts = await accountService.getByUserId(userId);
    return res.status(200).json({ accounts });
  } catch (error) {
    throw error;
  }
});

module.exports = router;
