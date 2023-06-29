const threadController = require("../controllers/threadController");
const { canEditThread } = require('../middleware/thread-guards')
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard')
const express = require("express");
const router = express.Router();

router.get("/:threadId", threadController.getThread);
router.post("/create", isLoggedIn, threadController.createThread);
router.get('/:threadId/edit', canEditThread, threadController.editThread)
router.post("/:threadId/delete", canEditThread, threadController.deleteThread);
router.post('/:threadId/update', canEditThread, threadController.updateThread);

module.exports = router;
