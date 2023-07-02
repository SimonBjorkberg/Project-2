const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary.config");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

router.post("/change-password", isLoggedIn, authController.updatePostPassword );
router.post("/profile-picture", upload.single("profilePicture"), authController.updateProfilePicture );

module.exports = router;
