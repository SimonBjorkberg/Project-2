const express = require("express");
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard");
const signupController = require("../controllers/signupController");


router.post('/', isLoggedOut, signupController.signUpPost);
router.get('/accountCreated', isLoggedOut, signupController.signUpDone)

module.exports = router;
