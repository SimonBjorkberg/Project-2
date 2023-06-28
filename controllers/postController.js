const Post = require("../models/Post.model");
const Thread = require("../models/Thread.model");

// ###################################
// function that creates a new post
// ###################################

const createPost = async (req, res) => {
  try {
    const content = req.body.content;
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

// ###################################
// function that gets a post by its ID
// ###################################

const getPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    res.render("threads-posts/edit-posts", {
      userInSession: req.session.currentUser,
      post: post,
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
    const post = await Post.findById(postId).populate("threadParent");
    const { content } = req.body;
    if (content === "") {
      return res.redirect(`/threads/${post.threadParent._id}`);
    } else {
      const post = await Post.findByIdAndUpdate(
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

// ###################################
// function that deletes a post
// ###################################

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
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
