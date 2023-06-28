const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.route("/post/:threadId").post(postController.createPost);

router.get("/edit-post/:postId", postController.getPost);
router.post("/edit-post/:postId", postController.updatePost);
router.post("/posts/:postId", postController.deletePost);

module.exports = router;
