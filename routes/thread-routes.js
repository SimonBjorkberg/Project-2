const threadController = require("../controllers/threadController");
const express = require("express");
const router = express.Router();

router.get('/:threadId/edit', threadController.editThread)
router.get("/:threadId", threadController.viewThread);
router.post("/:threadId", threadController.createThread);
router.post("/:threadId/edit", threadController.deleteThread);

module.exports = router;
