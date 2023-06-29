const threadController = require("../controllers/threadController");
const express = require("express");
const router = express.Router();

router.get("/:threadId", threadController.getThread);
router.post("/create", threadController.createThread);
router.get('/:threadId/edit', threadController.editThread)
router.post("/:threadId/delete", threadController.deleteThread);
router.post('/:threadId/update', threadController.updateThread);

module.exports = router;
