const router = require("express").Router();
const { verifyGetrequest } = require("../controllers/dashboardController");
const verifyToken = require("../middleware/verifytoken");

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ admin: req.admin });
});

module.exports = router;
