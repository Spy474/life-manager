const express = require("express");

const { get, signup } = require("./AuthController.js");

const router = express.Router();

router.get("/", get);
router.post("/signup", signup);

module.exports = router;
