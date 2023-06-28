const express = require("express");
const router = express.Router();
const { isLoggedOut } = require("../middleware/route-guard");
const signupController = require("../controllers/signupController");


router.route("/")
  .get(isLoggedOut, signupController.signUp)
  .post(isLoggedOut, signupController.signUpPost);

module.exports = router;
