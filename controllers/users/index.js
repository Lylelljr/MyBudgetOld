'use strict';

const router = require('express').Router();
const checkAuthorization = require('../../middleware/checkAuthorization.js');

const userService = require('../../services/users');

router.get('/:id', checkAuthorization, async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.getByID(id);
    if (!user) {
      return res.status(404).json({ message: `User ${id} not found` });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const emailExists = await userService.getByEmail(email);
    if (emailExists) {
      return res.status(422).json({ message: `The email address ${email} already exists.` });
    }

    const user = await userService.create({
      email,
      password
    });

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/update', checkAuthorization, async (req, res, next) => {
  try {
    const { id, email, password } = req.body;

    const user = await userService.update({
      id,
      email,
      password
    });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
