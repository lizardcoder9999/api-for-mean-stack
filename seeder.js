const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
require("./config/db");

//node seeder.js name email password

const name = process.argv[2];
const email = process.argv[3];
const password = process.argv[4];

async function hashIt(password) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  Admin.insertMany({
    name: name,
    email: email,
    password: hashed,
  });
}

hashIt(password);
console.log("Admin created successfully");
