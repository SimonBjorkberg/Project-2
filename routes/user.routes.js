const express = require('express');
const router = express.Router();
const { updatePassword, updateProfilePicture } = require('../controllers/userController');
const upload = require('../config/cloudinary.config');

router.post('/update-password', updatePassword);
router.post('/profile-picture', upload.single('profilePicture'), updateProfilePicture);

module.exports = router;