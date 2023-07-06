const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const Topic = require('../models/Topic.model')

// #############################################
// SIGN UP FUNCTION FOR THE 'SIGNUP' POST ROUTE
// #############################################
const signUpPost = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ username }, { email }] });
    const topic = await Topic.find({})
    if (user) {
      if (user.username === username) {
        return res.render("index", {
          signupErrorMessage: "Username already taken",
          signupError: true,
          topic,
        });
      } else {
        return res.render("index", {
          signupErrorMessage: "Email already registered",
          signupError: true,
          topic,
        });
      }
    }
    if (password.length < 6) {
      return res.render("index", {
        signupErrorMessage: "Password needs at least 6 characters",
        signupError: true,
        topic,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const referer = req.headers.referer
    return res.redirect(referer);
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  signUpPost,
};
