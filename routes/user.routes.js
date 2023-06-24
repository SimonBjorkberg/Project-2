const express = require('express');
const router = express.Router();
const { updatePassword, updateProfilePicture } = require('../controllers/userController');

router.post('/update-password', updatePassword);
router.post('/profile-picture', updateProfilePicture);

module.exports = router;