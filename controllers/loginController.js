const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const Topic = require("../models/Topic.model");

// #################
// LOG IN POST ROUTE
// #################

const loginPost = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const topic = await Topic.find({});
    if (!user) {
      return res.render("index", {
        loginErrorMessage: "User not found",
        loginError: true,
        topic,
      });
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      req.session.userId = user._id;

      const referer = req.headers.referer
      res.redirect(referer)
      return res.redirect(referer);
    } else {
      return res.render("index", {
        loginErrorMessage: "Incorrect password",
        loginError: true,
        topic,
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  loginPost,
};
