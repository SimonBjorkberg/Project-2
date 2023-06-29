const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { getEditPost, editPost, delPost } = require('../middleware/post-guards')

router
  .route("/:threadId")
  .post(postController.createPost);

router
  .route("/:postId/edit")
  .get(getEditPost, postController.getPost)
  .post(editPost, postController.updatePost)

router.route('/:postId/delete')
  .post(delPost, postController.deletePost);

module.exports = router;
