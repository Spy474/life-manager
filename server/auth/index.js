const express = require("express");
const Joi = require("joi");
const router = express.Router();

const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/^[a-zA-Z0-9_]*$/)
    .min(2)
    .max(30)
    .required(),
  password: Joi.string().min(6).required(),
});

router.get("/", (req, res) => {
  res.json({
    message: "🔒",
  });
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  res.json(schema.validate(req.body));
});

module.exports = router;
