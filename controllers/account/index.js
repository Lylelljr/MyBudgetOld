'use strict';

const router = require('express').Router();
const checkAuthorization = require('../../middleware/checkAuthorization.js');
const accountService = require('../../services/account');

router.get('/', checkAuthorization, async (req, res, next) => {
  try {
    const accounts = await accountService.getAll();
    if (!accounts) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ accounts });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', checkAuthorization, async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await accountService.getById(id);
    if (!account) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ account });
  } catch (error) {
    next(error);
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
      return res.sendStatus(422);
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

    return res.status(201).json({ id: accountId });
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId', checkAuthorization, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const accounts = await accountService.getByUserId(userId);
    if (!accounts) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ accounts });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', checkAuthorization, async (req, res, next) => {
  try {
    const { userId } = req.token;
    const { id } = req.params;
    const {
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      typeOfAccount,
      isOnBudget,
      isClosed
    } = req.body;

    const account = await accountService.getById(id);
    if (!account) {
      return res.sendStatus(404);
    }

    if (account.userId !== userId) {
      return res.sendStatus(403);
    }

    await accountService.updateById(id, {
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      typeOfAccount,
      isOnBudget,
      isClosed
    });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', checkAuthorization, async (req, res, next) => {
  try {
    const { userId } = req.token;
    const { id } = req.params;

    const account = await accountService.getById(id);
    if (!account) {
      return res.sendStatus(404);
    }

    if (account.userId !== userId) {
      return res.sendStatus(403);
    }

    await accountService.deleteById(id);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
