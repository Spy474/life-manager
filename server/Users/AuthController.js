const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findOne } = require('./UserModel.js');
const User = require('./UserModel.js');
const { JsonWebTokenError } = require('jsonwebtoken');

// @desc      Main Route
// @route     GET /auth
// @access    Public
exports.get = (req, res) => {
  res.json({
    message: '🔒',
  });
};

// @desc      Register user
// @route     POST /auth/signup
// @access    Public
exports.signup = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.json(user);
  } catch (error) {
    res.status(422);
    next(error);
  }
};

// @desc      Login user
// @route     POST /auth/login
// @access    Public
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!err) {
          jwt.sign(
            { _id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
            (err, token) => {
              if (err) {
                res.status(422);
                res.json({ message: 'Invalid username' });
                next(error);
              } else {
                res.status(200);
                res.json({ token: token });
              }
            }
          );
        } else {
          res.status(422);
          res.json({ message: 'Invalid username' });
          next(error);
        }
      });
    } else {
      res.status(422);
      res.json({ message: 'Invalid username' });
      next(error);
    }
  } catch (error) {
    res.status(422);
    res.json({ message: 'Invalid username' });
    next(error);
  }
};
