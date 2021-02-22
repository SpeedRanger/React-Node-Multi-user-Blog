const User = require('../models/user');
const shortId = require('shortid'); //to create unique userid for each user

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

//Sign up controller
exports.signup = (req, res) => {
  //checking whether user with the entered email already exists
  User.findOne({ email: req.body.email }).exec((err, user) => {
    //if user exists
    if (user) {
      return res.status(400).json({
        error: 'Email is taken',
      });
    }
    //getting the details from body of the request
    const { name, email, password } = req.body;
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
    //create new document
    let newUser = new User({
      name,
      email,
      password,
      profile,
      username,
    });
    //When you create an instance of a Mongoose model using new, calling save() makes Mongoose insert a new document.
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      // res.json({
      //   user: success,
      // });
      res.json({
        message: 'Signup success!Please sign in.',
      });
    });
  });
};

//Sign in controller
exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please signup.',
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password do not match.',
      });
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('token', token, { expiresIn: '1d' });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'Signout success',
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'], // added later
  userProperty: 'user',
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    if (user.role !== 1) {
      return res.status(400).json({
        error: 'Admin resource. Access denied.',
      });
    }
    next();
  });
};
