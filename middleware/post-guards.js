const e = require("express");
const Post = require("../models/Post.model");
const Thread = require("../models/Thread.model");

const createPost = async (req, res, next) => {
  try {
    const { currentUser } = req.session;
    const { threadId } = req.params;
    if (currentUser) {
      next();
    } else {
      res.redirect(`/threads/${threadId}`);
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

const likePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const thread = await Thread.findOne({ posts: postId });
    if (!req.session.currentUser) {
      return res.redirect(`/threads/${thread._id}`);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  likePost,
  createPost,
  delPost,
  editPost,
};
