const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary.config");

const {
  login,
  loginPost,
  signUp,
  signUpPost,
  userProfile,
  logOut,
  search,
  updatePassword,
  updatePostPassword,
  updateProfilePicture,
} = require("../controllers/authController");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

router.get("/login", isLoggedOut, login);
router.get("/signup", isLoggedOut, signUp);
router.get("/profile/:username", userProfile);
router.post("/login", isLoggedOut, loginPost);
router.post("/signup", isLoggedOut, signUpPost);
router.post("/logout", isLoggedIn, logOut);
router.post("/search", search);

router.get("/change-password", isLoggedIn, updatePassword);
router.post("/change-password", isLoggedIn, updatePostPassword);
router.post(
  "/profile-picture",
  upload.single("profilePicture"),
  updateProfilePicture
);

// ################
// EXPORTS
// ################
module.exports = router;
