const Tag = require('../models/tag');
const slugify = require('slugify'); //Ex: converts "react redux" to "react-redux"

const { errorHandler } = require('../helpers/dbErrorHandler');
// create new tag
exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let tag = new Tag({ name, slug });
  tag.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data); // don't do this res.json({tag:data});
  });
};
// list all tags
exports.list = (req, res) => {
  Tag.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
// display data for single tag
exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOne({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(tag);
  });
};
// delete a tag
exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndDelete({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'Tag deleted successfully.',
    });
  });
};
