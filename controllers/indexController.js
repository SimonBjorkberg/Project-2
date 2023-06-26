const Thread = require("../models/Thread.model");
const User = require("../models/User.model");

// ###########
// INDEX ROUTE
// ###########
const index = async (req, res, next) => {
  try {
    const thread = await Thread.find({}).populate("author");
    res.render("index", {
      userInSession: req.session.currentUser,
      thread,
    });
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

module.exports = {
  index,
  search,
};
