const express = require("express");
const Message = require("../models/Message");
require("dotenv").config({ path: "./config/config.env" });

exports.sendMessageToAdmin = async (req, res, next) => {
  const message = new Message({
    from: req.body.from,
    email: req.body.email,
    response: "",
    messageStatus: "unread",
  });
  try {
    const savedMessage = await message.save();
    res.status(200).json({ message: message });
  } catch (error) {
    res.status(400).json({ message: "error saving message" });
  }
};

exports.getAllMessages = async (req, res, next) => {
  const allMessages = await Message.find({}, (err, result) => {
    if (err) {
      res.status(400).json({ message: "error occured" });
    } else {
      res.status(200).json({ messages: result });
    }
  });
};

exports.getMessageCount = async (req, res, next) => {
  const messageCount = await Message.find({}, (err, result) => {
    if (err) {
      res.status(400).json({ message: "error occured" });
    } else {
      res.status(200).json({ count: result.length });
    }
  });
};
