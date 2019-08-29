'use strict';

const router = require('express').Router();

const checkAuthorization = require('../../middleware/checkAuthorization.js');
const userService = require('../../services/user');
const accountService = require('../../services/account');
const accountTypeService = require('../../services/accountType');
const joiErrorParser = require('../../joi/joiErrorParser.js');
const { validateId, validateAccount } = require('../../schemas/account.js');

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
    const tokenUserId = req.token.userId;
    const { id } = req.params;

    const validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    const account = await accountService.getById(id);
    if (!account) {
      return res.sendStatus(404);
    }

    if (account.id !== tokenUserId) {
      res.sendStatus(403);
    }

    return res.status(200).json({ account });
  } catch (error) {
    next(error);
  }
});

router.post('/', checkAuthorization, async (req, res, next) => {
  try {
    const tokenUserId = req.token.userId;
    const { accountName, currentBalance, dateOfCurrentBalance, accountTypeId, isOnBudget, isClosed } = req.body;

    const validationResult = validateAccount({
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      accountTypeId,
      isOnBudget,
      isClosed
    });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    const user = await userService.getById(tokenUserId);
    if (!user) {
      return res.sendStatus(404);
    }

    if (user.id !== tokenUserId) {
      return res.sendStatus(403);
    }

    const accountType = await accountTypeService.getById(accountTypeId);
    if (!accountType) {
      return res.sendStatus(404);
    }

    const accountExists = await accountService.getByIdAccountName(tokenUserId, accountName);
    if (accountExists) {
      return res.sendStatus(422);
    }

    const accountId = await accountService.create({
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      accountTypeId,
      isOnBudget,
      isClosed,
      userId: tokenUserId
    });

    return res.status(201).json({ id: accountId });
  } catch (error) {
    next(error);
  }
});

router.get('/user/:id', checkAuthorization, async (req, res, next) => {
  try {
    const tokenUserId = req.token.userId;
    const { id } = req.params;

    const validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    const accounts = await accountService.getByUserId(id);
    if (!accounts) {
      return res.sendStatus(404);
    }

    if (accounts[0].id !== tokenUserId) {
      res.sendStatus(403);
    }

    return res.status(200).json({ accounts });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', checkAuthorization, async (req, res, next) => {
  try {
    const tokenUserId = req.token.userId;
    const { id } = req.params;
    const {accountName, currentBalance, dateOfCurrentBalance, accountTypeId, isOnBudget, isClosed, userId } = req.body;

    let validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    validationResult = validateAccount({
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      accountTypeId,
      isOnBudget,
      isClosed,
      userId
    });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    const account = await accountService.getById(id);
    if (!account) {
      return res.sendStatus(404);
    }

    if (account.userId !== tokenUserId) {
      return res.sendStatus(403);
    }

    const accountType = await accountTypeService.getById(accountTypeId);
    if (!accountType) {
      return res.sendStatus(403);
    }

    await accountService.updateById(id, {
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      accountTypeId,
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

    const validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

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
