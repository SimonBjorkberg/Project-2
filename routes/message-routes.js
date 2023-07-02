const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { inboxGuard } = require("../middleware/inbox-guard");

router.get("/inbox", inboxGuard, messageController.getInbox);
router.post("/message/send", inboxGuard, messageController.sendMessage);
router.get("/message/recieve", inboxGuard, messageController.recievedMessage);

module.exports = router;
