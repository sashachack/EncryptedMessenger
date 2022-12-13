const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
  uid: {type: Number, required: true},
  convos: [{
    ouid: Number,
    messages: [{text: String, fromMe: Boolean}]
  }]
});
//search, save, delete messages from database
module.exports = Messages = mongoose.model('Messages', messagesSchema);