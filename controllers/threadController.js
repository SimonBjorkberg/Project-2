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

// ######################################
// function that gets a thread by its ID
// ######################################

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
      });
    let posts = thread.posts;
    if (currentUser) {
      posts = thread.posts.map((post) => {
        const auth = post.author.username === currentUser.username;
        return { ...post.toObject(), auth };
      });
    }

    return res.render("threads-posts/threads", {
      userInSession: req.session.currentUser,
      thread: { ...thread.toObject(), posts },
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

const deleteThread = async (req, res) => {
  try {
    const { threadId } = req.params;
    const deletedThread = await Thread.findByIdAndDelete(threadId);
    if (!deletedThread) {
      console.log("Thread not found");
      return res.redirect("/not-found");
    }
    console.log("Thread deleted successfully");
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};

module.exports = {
  createThread,
  getThread,
  updateThread,
  deleteThread,
};
