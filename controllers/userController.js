const express = require("express");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/config.env" });

exports.RegisterUser = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: "validation failed" });

  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({ message: "Email already exists" });

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(200).json({ user: user._id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error occured" });
  }
};

//Login Route
exports.loginUser = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: "validation failed" });

  //Checking if the user exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (!emailExist)
    return res.status(400).json({ message: "Email or password is wrong" });

  //Validating password
  const validPass = await bcrypt.compare(
    req.body.password,
    emailExist.password
  );

  if (!validPass)
    return res.status(400).json({ message: "Email or password incorrect" });

  // create jwt token

  const token = jwt.sign({ _id: emailExist._id }, process.env.JWT_SECRET);

  res.header("auth-token", token).json({ token: token });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find({}, (err, result) => {
    if (err) {
      res.status(400).json({ message: "error occured" });
    } else {
      res.status(200).json({ users: result });
    }
  });
};

exports.deleteUser = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "deleted" });
};

exports.userCount = async (req, res, next) => {
  await User.find({}, (err, result) => {
    if (err) {
      res.status(400).json({ message: "error occured" });
    } else {
      res.status(200).json({ count: result.length });
    }
  });
};

exports.getUserByPartial = async (req, res, next) => {
  const users = await User.find(
    {
      name: { $regex: ".*" + req.params.user + ".*" },
    },
    (err, result) => {
      if (err) return res.status(400).json({ message: "An error occured" });
      return res.status(200).json({ users: result });
    }
  ).limit(5);
};
