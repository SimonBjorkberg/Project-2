const express = require("express");
const loginController = require("../controllers/loginController");
const loginLimiter = require("../middleware/loginLimiter");
const router = express.Router();
const { isLoggedOut } = require("../middleware/route-guard");

router
  .route("/")
  .get(isLoggedOut, loginLimiter, (req, res, next) => {
    const errorMessage = req.session.loginErrorMessage; // Retrieve the error message from the session
    req.session.loginErrorMessage = null; // Clear the error message from the session

    res.render("auth/login", { errorMessage });
  })
  .post(isLoggedOut, loginLimiter, loginController.loginPost);

// DISABLE LOGIN
router.get("/login-disabled", (req, res) => {
  res.render("auth/login-disabled");
});

module.exports = router;
