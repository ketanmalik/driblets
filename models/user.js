const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  address: { type: String, required: true },
  email: { type: String, require: true },
  fName: { type: String, require: true },
  lName: { type: String, require: true },
  password: { type: String, require: true },
});

module.exports = mongoose.model("User", userSchema);
