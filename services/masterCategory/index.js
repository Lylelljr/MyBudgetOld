'use strict';

const MasterCategory = require('../../models/masterCategory.js');

async function getAll() {
  try {
    const masterCategories = await MasterCategory.findAll();
    return masterCategories.length > 0 ? masterCategories : null;
  } catch (error) {
    throw error;
  }
}

async function getById(id) {
  try {
    const masterCategory = MasterCategory.findOne({ where: { id } });
    return masterCategory;
  } catch (error) {
    throw error;
  }
}

async function create(masterCategory) {
  try {
    const { name, userId } = masterCategory;
    masterCategory = await MasterCategory.create({
      name,
      userId
    });
    return masterCategory.id;
  } catch (error) {
    throw error;
  }
}

async function updateById(masterCategory) {
  try {
    const { name, sortOrder } = masterCategory;
    masterCategory = await MasterCategory.update({ name, sortOrder })
  } catch (error) {
    throw error;
  }

}

module.exports = {
  getAll,
  getById,
  create,
  updateById
}