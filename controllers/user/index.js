'use strict';

const router = require('express').Router();
const checkAuthorization = require('../../middleware/checkAuthorization.js');

const userService = require('../../services/user');

const joiErrorParser = require('../../joi/joiErrorParser.js');
const {validateId, validatePasswordUpdate, validateUser} = require('../../schemas/user');

router.get('/', checkAuthorization, async (req, res, next) => {
  const users = await userService.getAll();
  if (!users) {
    return res.sendStatus(204);
  }
  return res.status(200).json({ users });
});

router.get('/:id', checkAuthorization, async (req, res, next) => {
  try {
    const { id } = req.params;

    const validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    const user = await userService.getById(id);
    if (!user) {
      return res.sendStatus(404);
    }

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const validationResult = validateUser({ email, password, firstName, lastName });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    const emailExists = await userService.getByEmail(email);
    if (emailExists) {
      return res.sendStatus(422);
    }

    const userId = await userService.create(email, password, firstName, lastName);

    return res.status(201).json({ id: userId });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/password', checkAuthorization, async (req, res, next) => {
  try {
    const { userId } = req.token;
    const { currentPassword, newPassword } = req.body;
    const { id } = req.params;

    let validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    validationResult = validatePasswordUpdate({ currentPassword, newPassword });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    const user = await userService.getById(userId);
    if (!user) {
      return res.sendStatus(404);
    }

    if (user.password !== currentPassword) {
      return res.sendStatus(403);
    }

    await userService.updatePassword({
      id,
      newPassword
    });

    return res.sendStatus(200);
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

    const user = await userService.getById(id);
    if (!user) {
      return res.sendStatus(404);
    }

    if (user.userId !== userId) {
      return res.sendStatus(403);
    }

    await userService.deleteById(id);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', checkAuthorization, async (req, res, next) => {
  try {
    const { userId } = req.token;
    const { id } = req.params;
    const { email, password, firstName, lastName } = req.body;

    let validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    validationResult = validateUser({ email, password, firstName, lastName });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    const user = await userService.getById(id);
    if (!user) {
      return res.sendStatus(404);
    }

    if (user.id !== userId) {
      return res.sendStatus(403);
    }

    await userService.updateById(userId, { email, password, firstName, lastName });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
