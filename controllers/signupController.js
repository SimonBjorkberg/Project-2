const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

// #############################################
// SIGN UP FUNCTION FOR THE 'SIGNUP' POST ROUTE
// #############################################
const signUpPost = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      if (user.username === username) {
        return res.render("index", {
          signupErrorMessage: "Username already taken",
          signupError: true,
        });
      } else {
        return res.render("index", {
          signupErrorMessage: "Email already registered",
          signupError: true,
        });
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.redirect("/");
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  signUpPost,
};
