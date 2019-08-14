'use strict';

const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = require('../../services/user');
const validateLogin = require('../../schemas/auth');
const joiErrorParser = require('../../joi/joiErrorParser.js');

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validationResult = validateLogin({ email, password });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    const user = await userService.getByEmail(email);
    if (!user) {
      return res.sendStatus(404);
    }

    const match = await bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.sendStatus(422);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
      process.env.TOKEN_SECRET,
      {
        expiresIn: `${process.env.TOKEN_EXPIRES_IN_SECONDS} seconds`
      }
    );

    res.header('Authorization', `Bearer ${token}`);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      delete req.headers.authorization;
    }
    return res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
