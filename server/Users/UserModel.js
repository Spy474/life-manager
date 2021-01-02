const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "You need to provide an username."],
    unique: [
      true,
      "This username is already used. Please choose another username.",
    ],
    trim: true,
    minlength: [2, "Please provide an username that is 2 character minimum."],
    maxlength: [30, "Please provide an username that is 30 character maximum."],
  },
  password: {
    type: String,
    required: [true, "You need to provide a password."],
  },
});

// Before Saving, check if password updated, if true, Hash it!
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
