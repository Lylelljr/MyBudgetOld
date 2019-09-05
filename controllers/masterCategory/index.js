'use strict';

const router = require('express').Router();

const checkAuthorization = require('../../middleware/checkAuthorization.js');
const userService = require('../../services/user');
const masterCategoryService = require('../../services/masterCategory');
const joiErrorParser = require('../../joi/joiErrorParser.js');
const { validateId, validateMasterCategory, validateMasterCategorySortOrder } = require('../../schemas/masterCategory');

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
    const { id }  = req.params;

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
  
    const user = await userService.getById(tokenUserId);
    if (!user) {
      return res.sendStatus(404);
    }
  
    if (user.Id !== tokenUserId) {
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

router.put('/:id/name', checkAuthorization, async (req, res, next) => {
  try {
    const tokenUserId = req.token.userId;
    const { id } = req.params;
    const { name } = req.body;

    let validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    validationResult = validateMasterCategory({ name });
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

    await masterCategoryService.updateNameById(id, { name });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/sort-order', checkAuthorization, async (req, res, next) => {
  try {
    const tokenUserId = req.token.userId;
    const { id } = req.params;
    const { sortOrder } = req.body;

    let validationResult = validateId({ id });
    if (validationResult.error) {
      return res.status(400).json(joiErrorParser(validationResult));
    }

    validationResult = validateMasterCategorySortOrder({ sortOrder });
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

    let increasing;
    if (masterCategory.sortOrder === sortOrder) {
      return res.sendStatus(403); // find out what code to send back for "cannot update"
    } else {
      increasing = sortOrder > masterCategory.sortOrder ? true : false;
    }
    await masterCategoryService.updateSortOrderById(id, sortOrder, increasing);

    return res.sendStatus(204);
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

    const masterCategory = await masterCategoryService.getById(id);
    if (!masterCategory) {
      return res.sendStatus(404);
    }

    if (masterCategory.userId !== userId) {
      return res.sendStatus(403);
    }

    await masterCategoryService.deleteById(id, sortOrder);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }

  return res.sendStatus(204);
});

module.exports = router;