const Thread = require("../models/Thread.model");
const Topic = require("../models/Topic.model");

// ###################################
// FUNCTION THAT CREATES A NEW THREAD
// ###################################

const createThread = async (req, res) => {
  try {
    const { title, content } = req.body;
    const thread = await Thread.create({
      title: title,
      content: content,
      author: req.session.currentUser,
      topicParent: req.params.topicId,
    });
    const topic = await Topic.findByIdAndUpdate(
      req.params.topicId,
      { $push: { threads: thread } },
      { new: true }
    );
    res.redirect(`/topic/${topic.title}`);
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

// #######################################
// FUNCTION THAT GETS A THREAD BY IT'S ID
// #######################################
const getThread = async (req, res) => {
  try {
    const currentUser = req.session.currentUser;
    const { threadId } = req.params;
    const thread = await Thread.findById(threadId)
      .populate("author")
      .populate({
        path: "posts",
        populate: {
          path: "author",
        },
      })
      .populate("likes");
    if (currentUser) {
      const auth =
        thread.author.username === currentUser.username ||
        (currentUser.role === "admin" && "moderator");
      thread.auth = auth;

      posts = thread.posts.map((post) => {
        const auth =
          post.author.username === currentUser.username ||
          (currentUser.role === "admin" && "moderator");
        post.auth = auth;
        return post;
      });
    }

    return res.render("threads-posts/threads", {
      userInSession: req.session.currentUser,
      thread: thread,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

// ##########################################
// FUNCTION THAT DELETES A THREAD BY IT'S ID
// ##########################################

const deleteThread = async (req, res, next) => {
  try {
    await Thread.findByIdAndDelete(req.params.threadId);
    res.redirect("/");
  } catch (err) {
    console.log("err", err);
  }
};

//################################
// FUNCTION THAT UPDATES A THREAD
//################################
const updateThread = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { threadId } = req.params;
    const thread = await Thread.findById(threadId).populate("author");
    if (thread.author.username === req.session.currentUser.username || req.session.currentUser.role === 'admin') {
      if (title === "") {
        await Thread.findByIdAndUpdate(threadId, { content: content });
        return res.redirect(`/threads/${threadId}`);
      } else if (content === "") {
        await Thread.findByIdAndUpdate(threadId, { title: title });
        return res.redirect(`/threads/${threadId}`);
      } else {
        await Thread.findByIdAndUpdate(
          threadId,
          { title: title, content: content },
          { new: true }
        );
        return res.redirect(`/threads/${threadId}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const likeThread = async (req, res, next) => {
  try {
    const { threadId } = req.params;
    userId = req.session.currentUser._id;
    const thread = await Thread.findById(threadId);

    const hasLiked = thread.likes.indexOf(userId);
    if (hasLiked !== -1) {
      thread.likes.splice(hasLiked, 1);
      await thread.save();
    } else {
      thread.likes.push(userId);
      await thread.save();
    }
    res.redirect(`/threads/${threadId}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  likeThread,
  createThread,
  getThread,
  deleteThread,
  updateThread,
};
