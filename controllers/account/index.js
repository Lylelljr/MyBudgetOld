'use strict';

const router = require('express').Router();

const checkAuthorization = require('../../middleware/checkAuthorization.js');
const accountService = require('../../services/account');
const joiErrorParser = require('../../joi/joiErrorParser.js');
const { validateId, validatePut, validatePost } = require('../../schemas/account');

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

    const validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

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

    const validationResult = validatePost({
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      typeOfAccount,
      isOnBudget
    });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

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

router.get('/user/:id', checkAuthorization, async (req, res, next) => {
  try {
    const { id } = req.params;

    const validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    const accounts = await accountService.getByUserId(id);
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

    let validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    validationResult = validatePut({
      accountName,
      currentBalance,
      dateOfCurrentBalance,
      typeOfAccount,
      isOnBudget,
      isClosed
    });
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
