const Post = require("../models/post.model");

// ###################################
// function that creates a new post
// ###################################

exports.createPost = async (req, res) => {
  try {
    const { content, author, thread } = req.body;
    const newPost = new Post({
      content,
      author: req.session.currentUser,
      thread,
    });
    const savedPost = await newPost.save();
    //res.status(201).json(savedPost)
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new post" });
  }
};

// ###################################
// function that gets a post by its ID
// ###################################

exports.getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const populatePost = await post.populate("author");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.render("add route here", {
      userInSession: req.session.currentUser,
      post,
      populatePost,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the post" });
  }
};

// ###################################
// function that updates a post
// ###################################

exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the post" });
  }
};

// ###################################
// function that deletes a post
// ###################################

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the post" });
  }
};
