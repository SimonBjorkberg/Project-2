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

// ################
// SIGN UP ROUTES
// ################
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

// SIGN UP POST ROUTE
router.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body;
  User.findOne({ $or: [{ username }, { email }] })
  .then((existingUser) => {
    if (existingUser) {
        let errorMessage = '';
        if(existingUser.username === username) {
            errorMessage = 'Username already taken';
        }
        else {
            errorMessage = 'Email already registered'
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
router.get("/user-profile", (req, res, next) => {
  res.render("users/userProfile");
});

// ################
// EXPORTS
// ################
module.exports = router;
