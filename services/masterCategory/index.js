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

async function updateNameById(id, masterCategory) {
  try {
    const { name } = masterCategory;
    await MasterCategory.update({ name }, {where: { id } });
  } catch (error) {
    throw error;
  }
}

/**
 * 
 * @param {integer} id 
 * @param {integer} sortOrder 
 * @param {boolean} increasing true = increasing
 */
async function updateSortOrderById(userId, sortOrder, increasing) {
  try {
        /**
     * Sort Order
     * 1
     * 2
     * 3
     * 4
     * 
     * masterCategory.sortOrder = 2
     * sortOrder = 4
     * 
     * 3 moves to 2
     * 4 moves to 3
     * 2 moves to 4
     *
     * Begin transaction;
     * 
     * update MasterCategory
     * set sortOrder = sortOrder - 1 
     * where userId = {userId} and sortOrder >= {2} and sortOrder < {4}
     * 
     * update MasterCategory
     * set sortOrder = 4
     * where id = {id};
     * 
     * Commit;
     */



    await MasterCategory.update({ sortOrder }, { where: { userId } });
  } catch (error) {
    throw error;
  }
}

async function deleteById(userId, sortOrder) {
  try {
    await MasterCategory.destroy({ where: { userId } });   
    // The sort order needs to be updated after deleting a record.
    // Extract sort order logic to shared function 
  } catch (error) {
    throw error;
  }
}

async function updateSortOrder(id, sortOrder, increasing) {
  try {
    
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAll,
  getById,
  create,
  updateNameById,
  updateSortOrderById,
  deleteById
}