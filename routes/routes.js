const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary.config");
const { isLoggedIn, isLoggedOut, isUser } = require("../middleware/route-guard");


//SIGN UP ROUTES ----------------------------------
const { signUp, signUpPost } = require('../controllers/authController')
router.get("/signup", isLoggedOut, signUp);
router.post("/signup", isLoggedOut, signUpPost);

//LOG IN ROUTES -----------------------------------
const { login, loginPost } = require('../controllers/authController')
router.get("/login", isLoggedOut, login);
router.post("/login", isLoggedOut, loginPost);

//GENERAL USER ROUTES -----------------------------
const { userProfile, updatePassword, updatePostPassword, updateProfilePicture, logOut } = require('../controllers/authController')
router.get("/profile/:username", userProfile);
router.get("/profile/:username/change-password", isLoggedIn, updatePassword);
router.post("/change-password", isLoggedIn, updatePostPassword);
router.post("/profile-picture",upload.single("profilePicture"),updateProfilePicture);
router.post("/logout", isLoggedIn, logOut);

//INDEX ROUTES ------------------------------------
const { index, search } = require('../controllers/indexController')
router.get("/", index)
router.post("/search", search);

//THREAD ROUTES -----------------------------------
const { createThread, getThread, updateThread, deleteThread } = require('../controllers/threadController')
router.post("/threads", createThread);
router.get("/threads/:threadId", getThread);
router.put("/threads/:threadId", updateThread);
router.delete("/threads/:threadId", deleteThread);

//POST ROUTES -------------------------------------
const { createPost, getPost, updatePost, deletePost } = require('../controllers/postController')
router.post("/posts", createPost);
router.get("/posts/:postId", getPost);
router.put("/posts/:postId", updatePost);
router.delete("/posts/:postId", deletePost);


// ################
// EXPORTS
// ################
module.exports = router;
