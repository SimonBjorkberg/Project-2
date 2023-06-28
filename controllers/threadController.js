const PostModel = require("../models/Post.model");
const Thread = require("../models/Thread.model");

// ###################################
// function that creates a new thread
// ###################################

const createThread = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newThread = new Thread({
      title,
      content,
      author: req.session.currentUser,
    });
    await newThread.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

const editThread = async (req, res) => {
  try {
    const { threadId } = req.params;
    const thread = await Thread.findById(threadId).populate("author");
    if (
      thread.author.username === req.session.currentUser.username ||
      req.session.currentUser.role === "admin"
    ) {
      res.render("threads-posts/edit-thread", { thread: thread });
    }
  } catch {}
};

// ######################################
// function that gets a thread by its ID
// ######################################
const viewThread = async (req, res) => {
  try {
    const currentUser = req.session.currentUser;
    const threadId = req.params.threadId;
    const thread = await Thread.findById(threadId)
      .populate("author")
      .populate({
        path: "posts",
        populate: {
          path: "author",
        },
      });

    let posts = thread.posts;
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
// ###################################
// function that updates thread by ID
// ###################################

const updateThread = async (req, res) => {
  try {
    const { threadId } = req.params;
    const { title, content } = req.body;
    const updatedThread = await Thread.findByIdAndUpdate(
      threadId,
      { title, content },
      { new: true }
    );
    if (!updatedThread) {
      console.log("Thread not found");
      return res.redirect("/not-found");
    }
    res.redirect("/threads");
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

// ###################################
// function that deletes thread by ID
// ###################################

const deleteThread = async (req, res, next) => {
  try {
    await Thread.findByIdAndDelete(req.params.threadId);
    res.redirect("/");
  } catch (err) {
    console.log("err", err);
  }
};
module.exports = {
  createThread,
  viewThread,
  updateThread,
  deleteThread,
  editThread,
};
