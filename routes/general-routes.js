const express = require("express");
const generalController = require("../controllers/generalController");
const router = express.Router();
const { isLoggedIn } = require("../middleware/route-guard");

router.get("/", generalController.index);
router.get("/profile/:username", generalController.userProfile);
router.post("/logout", isLoggedIn, generalController.logOut);

router.get("/topic/:title", generalController.getTopic);
router.post("/create-topic", generalController.createTopic);

module.exports = router;
