const express = require("express");
const router = express.Router();
const Thread = require("../models/thread.model");
const User = require("../models/User.model");

/* GET home page */
router.get("/", (req, res, next) => {
  Thread.find({})
    .populate("author")
    .then((thread) => {
      res.render("index", { userInSession: req.session.currentUser, thread });
      console.log(thread);
    })
    .catch((err) => console.log("err", err));
});

module.exports = router;
