const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// #############
// post routes
// #############
router.post("/posts", postController.createPost);
router.get("/posts/:postId", postController.getPost);
router.put("/posts/:postId", postController.updatePost);
router.delete("/posts/:postId", postController.deletePost);

module.exports = router;
