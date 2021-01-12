const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/config.env" });
const {
  RegisterUser,
  loginUser,
  getAllUsers,
  deleteUser,
  userCount,
} = require("../controllers/userController");

router.route("/register").post(RegisterUser);

router.route("/login").post(loginUser);

router.route("/all").get(getAllUsers);

router.route("/delete/:id").delete(deleteUser);

router.route("/count").get(userCount);

module.exports = router;
