const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", UserSchema);
