const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { editPost, delPost, createPost, likePost } = require("../middleware/post-guards");

router.post("/:threadId", createPost, postController.createPost);
router.post("/:postId/edit", editPost, postController.updatePost);
router.post("/:postId/delete", delPost, postController.deletePost);
router.post("/:postId/like", likePost, postController.likePost);

module.exports = router;
