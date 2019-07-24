'use strict';

const router = require('express').Router();
const checkAuthorization = require('../../middleware/checkAuthorization.js');

router.post('/create', checkAuthorization, async (req, res, next) => {
  try {
    const { id } = req.token.id;
    const { name } = req.body;

    const accountExists = await accountService.getByID(id);
    if (accountExists) {
      return res.status(422).json({ message: `The account ${name} already exists` });
    }

    const account = await accountsService.create({
      name,
      currentBalance,
      dateOfCurrentBalance,
      type,
      isBudgetAccount,
      isOffBudgetAccount,
      usersID: id
    });
  } catch (error) {
    throw error;
  }
});

module.exports = router;
