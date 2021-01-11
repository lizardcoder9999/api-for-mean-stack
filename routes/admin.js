const router = require("express").Router();

const { loginAdmin, getAdminById } = require("../controllers/adminController");

router.route("/login").post(loginAdmin);

router.route("/get/:id").get(getAdminById);

module.exports = router;
