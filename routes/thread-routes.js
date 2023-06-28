const threadController = require('../controllers/threadController')
const express = require("express");
const router = express.Router();



router.route("/threads")
  .post(threadController.createThread)
router.get('/threads/:threadId', threadController.getThread)
router.post(threadController.updateThread)
router.post('/threads/:threadId', threadController.deleteThread)

module.exports = router;