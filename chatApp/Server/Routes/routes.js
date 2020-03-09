const express = require("express");
const router = express.Router();
const usercontroller = require("../Controller/userController.js");

//calling the POST method for creating a new user
router.post("/register", usercontroller.registerUser);

//calling the POST method for login
router.post("/users/login", usercontroller.loginUser);

//read the data according to data generated authorization is done
//router.get("/users/auth", middleware, usercontroller.authorization);

//forgot password
router.post("/users/forgotpassword", usercontroller.forgotPassword);

module.exports = router;
