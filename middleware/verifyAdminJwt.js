const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/config.env" });

module.exports = function verifyAdmin(req, res, next) {
  const token = req.header("admin-auth");
  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const verifiedAdmin = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verifiedAdmin;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
