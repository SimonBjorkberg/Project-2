const Post = require("../models/Post.model");

// ###################################
// function that creates a new post
// ###################################

const createPost = async (req, res) => {
  try {
    const { content, thread } = req.body;
    console.log("req.body:", req.body);
    const newPost = new Post({ content, author: req.session.currentUser, thread });
    const savedPost = await newPost.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

// ###################################
// function that gets a post by its ID
// ###################################

const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("author");
    if (!post) {
      console.log("Post not found")
      return res.redirect("/not-found");
    }
    res.render("add post route when you create it", {
      userInSession: req.session.currentUser,
      post,
      populatePost: post,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

// ###################################
// function that updates a post
// ###################################

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(postId, { content }, { new: true });
    if (!updatedPost) {
      console.log("Post not found")
      return res.redirect("/not-found");
    }
    res.redirect("/posts");
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

// ###################################
// function that deletes a post
// ###################################

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      console.log("Post not found")
      return res.redirect("/not-found");
    }
    console.log("Post deleted successfully");
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost
}