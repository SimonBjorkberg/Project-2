const express = require('express');
const router = express.Router();
const threadController = require('../controllers/threadController');

// #############
// thread routes
// #############
router.post('/threads', threadController.createThread)
router.get('/threads/:threadId', threadController.getThread)
router.put('/threads/:threadId', threadController.updateThread)
router.delete('/threads/:threadId', threadController.deleteThread)

module.exports = router;
