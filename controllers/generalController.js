const Thread = require("../models/Thread.model");
const User = require("../models/User.model");
const Topic = require("../models/Topic.model");

// ###########
// INDEX ROUTE
// ###########
const index = async (req, res, next) => {
  try {
    let date = new Date()
    let year = date.getFullYear();
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
        currentYear: year
      });
    } else {
      admin = false;
      res.render("index", {
        userInSession: req.session.currentUser,
        thread,
        topic,
        admin,
        currentYear: year,
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};

// ############
// SEARCH ROUTE
// ############
const search = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.search });
    if (user === null) {
      res.redirect("/not-found");
    } else {
      res.redirect(`/profile/${user.username}`);
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
        username: user.username,
        email: user.email,
        avatar: user.profilePicture,
        userInSession: req.session.currentUser,
      });
    }
    res.render("users/user-profile", {
      auth: false,
      username: user.username,
      email: user.email,
      avatar: user.profilePicture,
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

module.exports = {
  createTopic,
  index,
  search,
  logOut,
  userProfile,
};