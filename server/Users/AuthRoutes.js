const express = require('express');

const { get, signup, login } = require('./AuthController.js');

const router = express.Router();

router.get('/', get);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
