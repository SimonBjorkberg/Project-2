const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router
  .route("/:threadId")
  .post(postController.createPost);

router
  .route("/edit/:postId")
  .get(postController.getPost)
  .post(postController.updatePost)

router.route('/edit/:postId/delete')
  .post(postController.deletePost);

module.exports = router;
