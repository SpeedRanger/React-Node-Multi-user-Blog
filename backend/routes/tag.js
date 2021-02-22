const express = require('express');
const router = express.Router();
//controllers
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/tag');
//validators
const { runValidation } = require('../validators');
const { createTagValidator } = require('../validators/tag');
// routes

//create new tag:check if user is admin
router.post(
  '/tag',
  createTagValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);
//all tag
router.get('/tags', list);
//single tag
router.get('/tag/:slug', read);
//deleting the tag
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;
