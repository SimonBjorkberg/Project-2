const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/admin");
const usersController = require("../controllers/usersController");

router.get("/users", isAdmin, usersController.getAllUsers);
router.post("/users", isAdmin, usersController.deleteUser);

module.exports = router;