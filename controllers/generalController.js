const Thread = require("../models/Thread.model");
const User = require("../models/User.model");
const Topic = require("../models/Topic.model");
const Post = require('../models/Post.model')

// ###########
// INDEX ROUTE
// ###########
const index = async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const topic = await Topic.find({});
    if (user && user.role === "admin") {
      admin = true;
      return res.render("index", {
        userInSession: user,
        topic,
      });
    } else {
      admin = false;
      res.render("index", {
        userInSession: req.session.currentUser,
        topic,
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};

// ###################
// USER PROFILE ROUTES
// ###################
const userProfile = async (req, res, next) => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username });

    const threads = await Thread.find({ author: user._id }).populate()
    const recentThreads = threads.slice(1).slice(-5)
    recentThreads.reverse()

    const posts = await Post.find({ author: user._id })
    const recentPosts = posts.slice(1).slice(-5)
    recentPosts.reverse()
    if (!user) {
      return res.render("not-found");
    }
    if (
      req.session.currentUser &&
      req.session.currentUser.username === user.username
    ) {
      if (req.session.currentUser.role === "admin") {
        return res.render("users/user-profile", {
          auth: true,
          user: user,
          userInSession: req.session.currentUser,
          isAdmin: true,
          recentThreads,
          recentPosts,
        });
      } else {
        return res.render("users/user-profile", {
          auth: true,
          user: user,
          userInSession: req.session.currentUser,
          recentThreads,
          recentPosts,
        });
      }

    }
    res.render("users/user-profile", {
      auth: false,
      user: user,
      userInSession: req.session.currentUser,
      recentThreads,
      recentPosts,
    });
  } catch (err) {
    console.log("err", err);
    next(err);
  }
};

// ############
// LOGOUT ROUTE
// ############
const logOut = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) next(err);
      const referer = req.headers.referer;
      return res.redirect(referer);
    });
  } catch (err) {
    console.log("err", err);
  }
};

const createTopic = async (req, res, next) => {
  try {
    if (req.session.currentUser.role === "admin") {
      const { title, desc } = req.body;
      await Topic.create({ title: title, desc: desc });
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const getTopic = async (req, res, next) => {
  try {
    const { title } = req.params;
    const topic = await Topic.findOne({ title: title })
      .populate("threads")
      .populate({
        path: "threads",
        populate: {
          path: "author",
        },
      });
    const thread = topic.threads;
    thread.reverse()
    res.render("threads-posts/topics", {
      topic: topic,
      thread: thread,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTopic,
  createTopic,
  index,
  logOut,
  userProfile,
};
