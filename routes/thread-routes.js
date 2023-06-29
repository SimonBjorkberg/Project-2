const threadController = require("../controllers/threadController");
const { isThreadAuthor, isLoggedIn, isLoggedOut } = require('../middleware/route-guard')
const express = require("express");
const router = express.Router();

router.get("/:threadId", threadController.getThread);
router.post("/create", threadController.createThread);
router.get('/:threadId/edit', isThreadAuthor, threadController.editThread)
router.post("/:threadId/delete", isThreadAuthor, threadController.deleteThread);
router.post('/:threadId/update', isThreadAuthor, threadController.updateThread);

module.exports = router;
