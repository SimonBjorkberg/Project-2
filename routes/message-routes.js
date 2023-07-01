const express = require("express");
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/inbox', messageController.getInbox)
router.post('/message/send', messageController.sendMessage)
router.get('/message/recieve', messageController.recievedMessage)


module.exports = router;