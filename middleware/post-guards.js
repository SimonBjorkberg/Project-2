const User = require("../models/User.model");
const Thread = require("../models/Thread.model");
const Post = require("../models/Post.model");

const getEditPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId)
      .populate("author")
      .populate("threadParent");
    if (
      post.author.username === req.session.currentUser.username ||
      req.session.currentUser.role === "admin"
    ) {
      next();
    } else {
      return res.redirect(`/threads/${post.threadParent._id}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId)
      .populate("author")
      .populate("threadParent");
    if (
      post.author.username === req.session.currentUser.username ||
      req.session.currentUser.role === "admin"
    ) {
      next();
    } else {
      return res.redirect(`/threads/${post.threadParent._id}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const delPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId)
      .populate("author")
      .populate("threadParent");
    if (
      post.author.username === req.session.currentUser.username ||
      req.session.currentUser.role === "admin"
    ) {
      next();
    } else {
      return res.redirect(`/threads/${post.threadParent._id}`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  delPost,
  editPost,
  getEditPost,
};
