const express = require("express");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/config.env" });

exports.loginAdmin = async (req, res, next) => {
  const adminExist = await Admin.findOne({ email: req.body.email });
  if (!adminExist)
    return res.status(400).json({ message: "Email or password is wrong" });

  const validPass = await bcrypt.compare(
    req.body.password,
    adminExist.password
  );

  if (!validPass)
    return res.status(400).json({ message: "Email or password incorrect" });

  const token = jwt.sign({ _id: adminExist._id }, process.env.JWT_SECRET);

  res.header("admintoken", token).json({ token: token });
};
