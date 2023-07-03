const threadController = require("../controllers/threadController");
const { canEditThread, likeThread } = require('../middleware/thread-guards')
const { isLoggedIn } = require('../middleware/route-guard')
const express = require("express");
const router = express.Router();

router.get("/:threadId", threadController.getThread);
router.post("/create/:topicId", isLoggedIn, threadController.createThread);
router.post("/:threadId/delete", canEditThread, threadController.deleteThread);
router.post('/:threadId/update', canEditThread, threadController.updateThread);
router.post('/:threadId/like', likeThread, threadController.likeThread)

module.exports = router;
