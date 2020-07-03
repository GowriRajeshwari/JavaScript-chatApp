const express = require("express");
const router = express.Router();
const usercontroller = require("../Controller/userController.js");
const tokenVerify = require("../Middleware/Jwt");

//calling the POST method for creating a new user
router.post("/users/register", usercontroller.registerUser);

//calling the POST method for login
router.post("/users/login", usercontroller.loginUser);

//read the data according to data generated authorization is done
//router.get("/users/auth", middleware, usercontroller.authorization);

//forgot password
router.post("/users/forgotpassword", usercontroller.forgotPassword);

//reset Password
router.post(
  "/users/resetpassword",
  tokenVerify.auth,
  usercontroller.resetPassword
);

//Get all user
router.get("/users/getUser",usercontroller.getUser);

//Save chat
router.post("/users/saveChat", usercontroller.saveChat);
//Get all user
router.post("/users/getChat",usercontroller.getChat);

module.exports = router;
