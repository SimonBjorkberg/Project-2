const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

const salt = 10;

// ################
// LOG IN ROUTES
// ################
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

// LOG IN POST ROUTE
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username }).then((user) => {
    if (!user) {
      res.render("auth/login", { errorMessage: "User not found" });
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect(`/profile/${username}`);
    } else {
      res.render("auth/login", { errorMessage: "Incorrect password " });
    }
  });
});

// ################
// SIGN UP ROUTES
// ################
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

// SIGN UP POST ROUTE
router.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body;
  User.findOne({ $or: [{ username }, { email }] }).then((existingUser) => {
    if (existingUser) {
      let errorMessage = "";
      if (existingUser.username === username) {
        errorMessage = "Username already taken";
      } else {
        errorMessage = "Email already registered";
      }
      return res.render("auth/signup", { errorMessage });
    }

    bcrypt
      .genSalt(salt)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({
          username: username,
          email: email,
          password: hashedPassword,
        });
      })
      .then((user) => {
        console.log("new user", user);
        res.redirect("/login");
      })
      .catch((err) => console.log("err", err));
  });
});

// ################
// USER PROFILE ROUTES
// ################
router.get("/profile/:username", (req, res, next) => {
  User.findOne({ username: req.params.username }).then((data) => {
    res.render("users/user-profile", {
      username: data.username,
      email: data.email,
      userInSession: req.session.currentUser,
    });
  });
});

// ##############
// LOGOUT ROUTE
// ##############
router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

// ################
// EXPORTS
// ################
module.exports = router;
