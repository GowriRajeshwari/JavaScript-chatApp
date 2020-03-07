const express = require("express");
const router = express.Router();
const usercontroller = require("../Controller/userController.js");

//calling the POST method for creating a new user
router.post("/register", usercontroller.registerUser);

module.exports = router;
