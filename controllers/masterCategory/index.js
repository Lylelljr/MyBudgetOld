'use strict';

const router = require('express').Router();

const checkAuthorization = require('../../middleware/checkAuthorization.js');
const userService = require('../../services/user');
const masterCategoryService = require('../../services/masterCategory');
const joiErrorParser = require('../../joi/joiErrorParser.js');
const { validateId, validateMasterCategory } = require('../../schemas/masterCategory');

router.get('/', checkAuthorization, async (req, res, next) => {
  try {
    const masterCategories = masterCategoryService.getAll();
    if (!masterCategories) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ masterCategories });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', checkAuthorization, async (req, res, next) => {
  try {
    const tokenUserId = req.token.userId;
    const id = req.params;

    const validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    const masterCategory = await masterCategoryService.getById(id);
    if (!masterCategory) {
      return res.sendStatus(404);
    }

    if (masterCategory.userId !== tokenUserId) {
      return res.sendStatus(403);
    }

    return res.status(200).json({ masterCategory });
  } catch (error) {
    next(error);
  }
});

router.post('/', checkAuthorization, async (req, res, next) => {
  try {
    const tokenUserId = req.token.userId;
    const { name } = req.body;
  
    const validationResult = validateMasterCategory({ name });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }
  
    const masterCategory = await masterCategoryService.getById(tokenUserId);
    if (!masterCategory) {
      return res.sendStatus(404);
    }
  
    if (masterCategory.userId !== tokenUserId) {
      return res.sendStatus(403);
    }
  
    const masterCategoryId = await masterCategoryService.create({ 
      name, 
      userId: tokenUserId 
    });
    
    return res.status(201).json({ id: masterCategoryId });
  } catch (error) {
    next(error);
  }

});

router.put('/:id', checkAuthorization, async (req, res, next) => {
  return res.sendStatus(204);
});

router.delete('/:id', checkAuthorization, async (req, res, next) => {
  return res.sendStatus(204);
});

module.exports = router;