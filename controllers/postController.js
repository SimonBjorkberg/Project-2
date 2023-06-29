const Post = require("../models/Post.model");
const Thread = require("../models/Thread.model");

// #################################
// FUNCTION THAT CREATES A NEW POST
// #################################

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.create({
      content: content,
      author: req.session.currentUser,
      threadParent: req.params.threadId,
    });
    const thread = await Thread.findByIdAndUpdate(
      req.params.threadId,
      { $push: { posts: post } },
      { new: true }
    );
    res.redirect(`/threads/${thread._id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

// #####################################
// FUNCTION THAT GETS A POST BY IT'S ID
// #####################################

const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId)
      .populate("threadParent")
      .populate("author");
    if (
      req.session.currentUser.username === post.author.username ||
      req.session.currentUser.role === "admin"
    ) {
      res.render("threads-posts/edit-posts", {
        userInSession: req.session.currentUser,
        post: post,
        threadId: post.threadParent._id,
      });
    } else {
      res.redirect(`/threads/${post.threadParent._id}`);
    }
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

// #############################
// FUNCTION THAT UPDATES A POST
// #############################

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("threadParent");
    const { content } = req.body;
    if (content === "") {
      return res.redirect(`/threads/${post.threadParent._id}`);
    } else {
      await Post.findByIdAndUpdate(
        postId,
        { content: content },
        { new: true }
      ).populate("threadParent");
      return res.redirect(`/threads/${post.threadParent._id}`);
    }
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

// #############################
// FUNCTION THAT DELETES A POST
// #############################

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const thread = await Thread.findOne({ posts: postId });
    await Post.findByIdAndDelete(postId);
    res.redirect(`/threads/${thread._id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost,
};
