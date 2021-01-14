const router = require("express").Router();
const {
  sendMessageToAdmin,
  getAllMessages,
  getMessageCount,
  getMessageById,
} = require("../controllers/messageController");

router.route("/api/admin/message/send").post(sendMessageToAdmin);

router.route("/api/admin/messages/all").get(getAllMessages);

router.route("/api/admin/message/count").get(getMessageCount);

router.route("/api/admin/messages/:id").get(getMessageById);

module.exports = router;
