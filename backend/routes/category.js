const express = require('express');
const router = express.Router();
//controllers
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/category');
//validators
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');
// routes

//create new category:check if user is admin
router.post(
  '/category',
  categoryCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);
//all categories
router.get('/categories', list);
//single category
router.get('/category/:slug', read);
//deleting the category
router.delete('/category/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;
