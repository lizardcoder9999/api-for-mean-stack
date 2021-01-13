const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    max: 255,
  },

  email: {
    type: String,
    required: true,
    max: 255,
  },

  response: {
    type: String,
    required: false,
  },

  messageStatus: {
    type: String,
    required: true,
    max: 1024,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("messages", messageSchema);
