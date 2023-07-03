const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { inboxGuard } = require("../middleware/inbox-guard");


router.get("/messages", inboxGuard, messageController.displayUsers);
router.get("/chat/:username", inboxGuard, messageController.chatController);
router.post("/send-message", inboxGuard, messageController.sendMessage)


module.exports = router;
