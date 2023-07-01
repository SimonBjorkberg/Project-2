const express = require("express");
const generalController = require("../controllers/generalController");
const router = express.Router();
const { isLoggedIn } = require("../middleware/route-guard");

router.post("/search", generalController.search);
router.get("/", generalController.index);
router.get("/profile/:username", generalController.userProfile);
router.post("/logout", isLoggedIn, generalController.logOut);

router.post('/create-topic', generalController.createTopic);

module.exports = router;
