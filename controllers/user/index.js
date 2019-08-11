'use strict';

const router = require('express').Router();
const checkAuthorization = require('../../middleware/checkAuthorization.js');

const userService = require('../../services/user');

router.get('/:id', checkAuthorization, async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.getById(id);
    if (!user) {
      return res.status(404).json({ message: `User was not found` });
    }

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const emailExists = await userService.getByEmail(email);
    if (emailExists) {
      return res.status(422).json({ message: `The email address already exists.` });
    }

    const userId = await userService.create(email, password, firstName, lastName);

    return res.status(201).json({ userId });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/password', checkAuthorization, async (req, res, next) => {
  try {
    const { password } = req.body;
    const id = parseInt(req.params.id);

    const user = await userService.updatePassword({
      id,
      password
    });

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
