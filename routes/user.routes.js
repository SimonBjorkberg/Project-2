const express = require('express');
const router = express.Router();

const { updatePassword, updateProfilePicture } = require('../controllers/user.controller');

router.post('/password', updatePassword);
router.post('/profile-picture', updateProfilePicture);

module.exports = router;