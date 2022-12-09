const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first: {type: String, required: true},
  last: {type: String, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, require: true, minlength: 5}
});
//search, save, delete users from database
module.exports = User = mongoose.model('User', userSchema);