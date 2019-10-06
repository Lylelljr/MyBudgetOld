'use strict';

const User = require('../../models/user');
const bcrypt = require('bcrypt');

async function create(email, password, firstName, lastName) {
  try {
    const hash = await bcrypt.hashSync(password, 10);
    const user = await User.create({ email, password: hash, firstName, lastName, isAdmin: false });
    return user.id;
  } catch (error) {
    throw error;
  }
}

async function updatePassword(id, password) {
  try {
    const hashedPassword = await bcrypt.hashSync(password);
    await User.update({ password: hashedPassword }, { where: { id } });
  } catch (error) {
    throw error;
  }
}

async function getAll() {
  try {
    const users = await User.findAll();
    return users.length > 0 ? users : null;
  } catch (error) {
    throw error;
  }
}

async function getById(id) {
  try {
    const user = await User.findOne({ where: { id } });
    return user;
  } catch (error) {
    throw error;
  }
}

async function getByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteById(id) {
  try {
    await User.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
}

async function updateById(id, user) {
  try {
    const { email, password, firstName, lastName } = user;

    await User.update(
      {
        email,
        password,
        firstName,
        lastName
      },
      { where: { id } }
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  updatePassword,
  getAll,
  getByEmail,
  getById,
  deleteById,
  updateById
};
