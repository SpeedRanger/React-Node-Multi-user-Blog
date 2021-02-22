const { check } = require('express-validator');

exports.createTagValidator = [
  check('name').not().isEmpty().withMessage('Tag name is required'),
];
