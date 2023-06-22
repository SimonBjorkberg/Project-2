const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

const salt = 10;

// ################
// LOG IN ROUTES
// ################
router.get("/login", isLoggedOut, (req, res, next) => {
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
router.get("/signup", isLoggedOut, (req, res, next) => {
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

// ###################
// USER PROFILE ROUTES
// ###################
router.get("/profile/:username", (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.render("not-found");
      } else {
        res.render("users/user-profile", {
          username: user.username,
          email: user.email,
          userInSession: req.session.currentUser,
        });
      }
    })
    .catch((err) => console.log(err));
});

// ##############
// LOGOUT ROUTE
// ##############
router.post("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

// ################
// SEARCH ROUTE
// ################
router.post("/search", (req, res, next) => {
  User.findOne({ username: req.body.search })
    .then((user) => {
      if (user === null) {
        res.redirect("/not-found");
      } else {
        res.redirect(`/profile/${user.username}`);
      }
    })
    .catch((err) => console.log("err", err));
});

// ################
// EXPORTS
// ################
module.exports = router;
