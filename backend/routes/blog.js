const express = require('express');
const router = express.Router();
const { create } = require('../controllers/blog');
const { requireSignin, authMiddleware } = require('../controllers/auth');

router.post('/blog', requireSignin, authMiddleware, create);

module.exports = router;
