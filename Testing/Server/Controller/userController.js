const userService = require("../Services/userService");
const jwt = require("../Middleware/Jwt.js");
const mailler = require("../Middleware/nodeMailer.js");
// Create and Save a new user
exports.registerUser = (req, res) => {
  console.log(req.body);
  //checking the Name want to have min 3 character
  req
    .checkBody("fullName", "Name is invalid")
    .len({ min: 3 })
    .isAlpha()
    .notEmpty();
  //checking password is not empty
  req.checkBody("password", "Password is invalid").notEmpty();
  //Checking the email is valid or not
  req
    .checkBody("email", "Email is invalid")
    .notEmpty()
    .isEmail();
  //Checking the validation for the country
  req
    .checkBody("country", "Country is invalid")
    .notEmpty()
    .isAlpha();
  var response = {};
  //checking for the Input Validation
  const errors = req.validationErrors();
  //if Validation gets error send response to the user
  if (errors) {
    response.failure = false;
    return res.status(404).send(response);
  } else {
    userService.register(req, (err, data) => {
      if (err) {
        response.failure = false;
        response.err = err;
        return res.status(404).send({ errors: response });
      } else {
        response.success = true;
        response.data = data;
        return res.send({ data: response });
      }
    });
  }
};

exports.loginUser = (req, res) => {
  //Login a registered user
  //checking password is not empty
  req.checkBody("password", "Password is invalid").notEmpty();
  //Checking the email is valid or not
  req
    .checkBody("email", "Email is invalid")
    .notEmpty()
    .isEmail();

  var response = {};
  //checking for the Input Validation
  const errors = req.validationErrors();
  //if Validation gets error send response to the user
  if (errors) {
    response.failure = false;
    return res.status(404).send(response);
  } else {
    userService.loginUser(req, (err, data) => {
      if (err) {
        response.failure = false;
        response.err = err;
        return res.status(404).send({ errors: response });
      } else {
        response.success = true;
        response.data = data;
        return res.send({ data: response });
      }
    });
  }
};

//forgot Password
exports.forgotPassword = (req, res) => {
  //checking email is valid or not
  req
    .checkBody("email", "Email is invalid")
    .notEmpty()
    .isEmail();

  var response = {};
  //checking for the Input Validation
  const errors = req.validationErrors();
  //if Validation gets error send response to the user
  if (errors) {
    response.failure = false;
    return res.status(422).send(response);
  } else {
    userService.forgotPassword(req, (err, data) => {
      if (err) {
        response.failure = false;
        response.data = err;
        return res.status(402).send(response);
      } else {
        let data_id = data._id;
        let obj = jwt.GenerateToken(data_id);
        let url = `http://localhost:3000/forgotPasswordmail`;

        // response.cookie('auth',obj.token);
        mailler.sendMailer(url, req.body.email);
        response.token = obj.token;
        response.sucess = true;
        response.data = data;

        return res.status(200).send(response);
      }
    });
  }
};
//reset Password
exports.resetPassword = (req, res) => {
  //checking the password is valid or not
  req.checkBody("password", "Password is invalid").notEmpty();
  req.checkBody("confirmPassword", "ConfirmPassword is invalid").notEmpty();
  var response = {};
  const error = req.validationErrors();
  //validating the password and confirmpassword is equal
  if (req.body.password != req.body.confirmPassword) {
    return res.send("Password and confirm password is not correct");
  }
  if (error) {
    response.failure = false;
    response.err = error;
    return res.status(400).send(response);
  } else {
    userService.resetPassword(req, (err, data) => {
      if (err) {
        response.failure = false;
        response.err = err;
        return res.status(400).send(response);
      } else {
        //sending the response to client
        response.success = true;
        response.data = data;
        return res.send({ data: response });
      }
    });
  }
};
