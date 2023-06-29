const User = require("../models/User.model");
const Thread = require("../models/Thread.model");
const Post = require("../models/Post.model");


const isThreadAuthor = async (req, res, next) => {
  try {
    const { threadId } = req.params;
    const thread = await Thread.findById(threadId).populate("author");
    if (
      thread.author.username === req.session.currentUser.username ||
      req.session.currentUser.role === "admin"
    ) {
      next();
    } else {
      return res.redirect(`/threads/${threadId}`)
    }
  } catch (error) {
    console.log(error);
  }
};

const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  next();
};

const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect("/");
  }
  next();
};

module.exports = {
  isThreadAuthor,
  isLoggedIn,
  isLoggedOut,
};
