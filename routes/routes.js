const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary.config");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");
const loginLimiter = require('../middleware/loginLimiter')

// CONTROLLERS
const authController = require('../controllers/authController');
const threadController = require('../controllers/threadController');
const postController = require('../controllers/postController');
const indexController = require('../controllers/indexController');

// SIGN UP ROUTES
router.route("/signup")
  .get(isLoggedOut, authController.signUp)
  .post(isLoggedOut, authController.signUpPost)

// LOG IN ROUTES
router.route("/login")
  .get(isLoggedOut, loginLimiter, (req, res, next) => {
    const errorMessage = req.session.loginErrorMessage; // Retrieve the error message from the session
    req.session.loginErrorMessage = null; // Clear the error message from the session

    res.render('auth/login', { errorMessage });
  })
  .post(isLoggedOut, loginLimiter, authController.loginPost)

// DISABLE LOGIN
router.get('/login-disabled', (req, res) => {
  res.render('auth/login-disabled');
});

// USER PROFILE ROUTES
router.get("/profile/:username", authController.userProfile)
router.get("/profile/:username/change-password", isLoggedIn, authController.updatePassword)
router.post("/change-password", isLoggedIn, authController.updatePostPassword)
router.post("/profile-picture", upload.single("profilePicture"), authController.updateProfilePicture)
router.post("/logout", isLoggedIn, authController.logOut)

// SEARCH ROUTE
router.post("/search", authController.search)

// THREAD ROUTES
router.route("/threads")
  .post(threadController.createThread)

router.route("/threads/:threadId")
  .get(threadController.getThread)
  .post(threadController.updateThread)

router.route("/threads/:threadId/delete")
  .post(threadController.deleteThread)


// POST ROUTES
router.route("/post/:threadId")
  .post(postController.createPost)

router.route("/posts/:postId")
  .get(postController.getPost)
  .post(postController.updatePost)

router.route("/posts/:postId/delete")
  .post(postController.deletePost)

// INDEX ROUTES
router.get("/", indexController.index)
router.post("/search", indexController.search)

// Export the router
module.exports = router;