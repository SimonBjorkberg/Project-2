const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

// ################
// LOG IN GET ROUTE
// ################
const login = async (req, res, next) => {
  try {
    res.render("auth/login");
  } catch (err) {
    console.log("err", err);
  }
};

// #################
// LOG IN POST ROUTE
// #################
const loginPost = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.render("auth/login", { errorMessage: "User not found" });
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      req.session.userId = user._id;

      res.redirect(`/profile/${username}`);
    } else {
      req.session.loginErrorMessage = "Incorrect password";
      res.redirect("/login");
    }
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  login,
  loginPost,
};
