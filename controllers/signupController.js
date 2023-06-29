const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

// ############################################
// SIGN UP FUNCTION FOR THE 'SIGNUP' GET ROUTE
// ############################################
const signUp = async (req, res, next) => {
    try {
      res.render("auth/signup");
    } catch (err) {
      console.log("err", err);
    }
  };
  
  // #############################################
  // SIGN UP FUNCTION FOR THE 'SIGNUP' POST ROUTE
  // #############################################
  const signUpPost = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (user) {
        let errorMessage = "";
        if (user.username === username) {
          errorMessage = "Username already taken";
        } else {
          errorMessage = "Email already registered";
        }
        return res.render("auth/signup", { errorMessage });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      return res.redirect(`/login`);
    } catch (err) {
      console.log("err", err);
    }
  };
  
module.exports = {
    signUp,
    signUpPost
}