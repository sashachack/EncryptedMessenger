const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, require: true, minlength: 5 },
    friends: [{
        username: String,
        id: Number,
        pending: Boolean
    }],
    blocked: [{
        username: String
    }],
    id: { type: Number, required: false },
    publicKey: { type: String, required: true },
    privateKey: { type: String, required: true },
});
//search, save, delete users from database
module.exports = User = mongoose.model('User', userSchema);