const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

// #################
// LOG IN POST ROUTE
// #################

const loginPost = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("index", { loginErrorMessage: "User not found", loginError: true });
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      req.session.userId = user._id;

      return res.redirect(`/profile/${username}`);
    } else {
      return res.render('index', { loginErrorMessage: "Incorrect password", loginError: true })
    }
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  loginPost,
};
