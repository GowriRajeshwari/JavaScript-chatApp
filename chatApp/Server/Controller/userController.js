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
    res.status(422).send(response);
    console.log("error in registration invalid input", errors);
  } else {
    console.log(req.body);
    userService.register(req, (err, data) => {
      if (err) {
        console.log(err);
        response.failure = false;
        response.err = err;
        res.status(400).send({ errors: response });
      } else {
        console.log("Data : " + data);
        response.success = true;
        response.data = data;
        res.send({ data: response });
      }
    });
  }
};

exports.loginUser = (req, res) => {
  console.log("controller");
  //Login a registered user
  console.log(req.body);
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
    res.status(422).send(response);
    console.log("error in registration invalid input", errors);
  } else {
    console.log(req.body);
    userService.loginUser(req, (err, data) => {
      if (err) {
        console.log(err);
        response.failure = false;
        response.err = err;
        res.status(400).send({ errors: response });
      } else {
        console.log("Data : " + data);
        response.success = true;
        response.data = data;
        res.send({ data: response });
      }
    });
  }
};

//forgot Password
exports.forgotPassword = (req, res) => {
  console.log(req.body);
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
    res.status(422).send(response);
    console.log("error in registration invalid input", errors);
  } else {
    userService.forgotPassword(req, (err, data) => {
      if (err) {
        response.failure = false;
        response.data = err;
        res.status(402).send(response);
      } else {
        console.log("data");
        let data_id = data._id;
        console.log(data_id);
        let obj = jwt.GenerateToken(data_id);
        let url = `http://localhost:3000/forgotPasswordmail`;

        console.log(`${obj.token}`);
        // response.cookie('auth',obj.token);
        console.log("email", req.body.email);
        mailler.sendMailer(url, req.body.email);
        response.token = obj.token;
        response.sucess = true;
        response.data = data;

        res.status(200).send(response);
      }
    });
  }
};
