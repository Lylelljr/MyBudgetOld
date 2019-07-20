'use strict';

const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = require('../../services/user');

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getByEmail(email);
    if (!user) {
      return res.status(422).json({ message: `The email address was not found` });
    }

    const match = await bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(422).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: `${process.env.TOKEN_EXPIRES_IN_SECONDS} seconds`
    });

    res.header('Authorization', `Bearer ${token}`);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      delete req.headers.authorization;
    }
    return res.status(401).json({ message: 'Logged out' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
