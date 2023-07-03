const Thread = require("../models/Thread.model");
const User = require("../models/User.model");
const Topic = require("../models/Topic.model");

// ###########
// INDEX ROUTE
// ###########
const index = async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const thread = await Thread.find({}).populate("author");
    const topic = await Topic.find({});
    if (user && user.role === "admin") {
      admin = true;
      return res.render("index", {
        userInSession: user,
        thread,
        topic,
        admin,
      });
    } else {
      admin = false;
      res.render("index", {
        userInSession: req.session.currentUser,
        thread,
        topic,
        admin,
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
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.render("not-found");
    }
    if (
      req.session.currentUser &&
      req.session.currentUser.username === user.username
    ) {
      return res.render("users/user-profile", {
        auth: true,
        user: user,
        userInSession: req.session.currentUser,
      });
    }
    res.render("users/user-profile", {
      auth: false,
      user: user,
      userInSession: req.session.currentUser,
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
      res.redirect("/");
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
    console.log(thread);
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
