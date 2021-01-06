const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/config.env" });

module.exports = function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
