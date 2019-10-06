'use strict';

const MasterCategory = require('../../models/masterCategory.js');
const { sequelize } = require('../../sequelize');

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
    const sortOrder = await getMaxSortOrderForUserId(userId) + 1;
    masterCategory = await MasterCategory.create({
      name,
      userId,
      sortOrder
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
 * @param {integer} userId
 * @param {integer} sortOrder 
 * @param {boolean} increasing true = increasing
 */
async function updateSortOrderByUserId(id, userId, oldSortOrder, newSortOrder) {
  try {
    await sequelize.transaction(async () => {
      if (newSortOrder > oldSortOrder) {
        sequelize.query('UPDATE "api"."MasterCategories" SET "sortOrder" = "sortOrder" - 1 WHERE "userId" = $1 AND ("sortOrder" > $2 AND "sortOrder" <= $3)', { 
          bind: [userId, oldSortOrder, newSortOrder],
          type: sequelize.QueryTypes.UPDATE
        });
      } else {
        sequelize.query('UPDATE "api"."MasterCategories" SET "sortOrder" = "sortOrder" + 1 WHERE "userId" = $1 AND ("sortOrder" >= $2 AND "sortOrder" < $3)', { 
          bind: [userId, newSortOrder, oldSortOrder],
          type: sequelize.QueryTypes.UPDATE
        });
      }
      MasterCategory.update({ sortOrder: newSortOrder }, { where: { id } });
    });
  } catch (error) {
    throw error;
  }
}

async function deleteById(id, userId, sortOrder) {
  try {
    await MasterCategory.destroy({ where: { id } });   
    await updateSortOrderForUserIdAfterDelete(userId, sortOrder);
  } catch (error) {
    throw error;
  }
}

async function getByUserIdName(userId, name) {
  try {
    const result = await MasterCategory.findOne({ where: { userId, name } });
    return result;
  } catch (error) {
    throw error;
  }
}

async function getMaxSortOrderForUserId(userId) {
  try {
    const result = await MasterCategory.max('sortOrder', { where: userId } );
    return result;
  } catch (error) {
    throw error;
  }
}

async function updateSortOrderForUserIdAfterDelete(userId, sortOrder) {
  try {
    await sequelize.query(`
      UPDATE "api"."MasterCategories" 
      SET "sortOrder" = "sortOrder" - 1 
      WHERE "userId" = $1 AND "sortOrder" > $2)`
    , { 
      bind: [userId, sortOrder],
      type: sequelize.QueryTypes.UPDATE
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAll,
  getById,
  create,
  updateNameById,
  updateSortOrderByUserId,
  deleteById,
  getMaxSortOrderForUserId,
  getByUserIdName
}