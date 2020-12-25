const express = require('express');
const User = require('./UserModel.js');

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
