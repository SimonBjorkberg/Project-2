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
      return res.render("index", { errorMessage: "User not found", loginError: true });
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      req.session.userId = user._id;

      return res.redirect(`/profile/${username}`);
    } else {
      return res.render('index', { errorMessage: "Incorrect password", loginError: true })
    }
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  login,
  loginPost,
};
