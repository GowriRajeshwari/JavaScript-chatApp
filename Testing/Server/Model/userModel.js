const mongoose = require("mongoose");
const emailExistance = require("email-existence");
const bcrypt = require("bcryptjs");

//schema for registration of new user
const registration = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "full name must be provided"]
    },
    password: {
      type: String,
      required: [true, "Password cannot be left blank"]
    },
    email: {
      type: String,
      required: [true, "Email address cannot be left blank"]
    },
    country: {
      type: String,
      required: [true, "country cannot be left blank"]
    }
  },
  {
    timestamps: true
  }
);
var registerUser = mongoose.model("register", registration);
exports.registerUser;

exports.userreg = (req, callback) => {
  try {
    emailExistance.check(req.body.email, (err, response) => {
      if (response) {
        //finding the user is already existing or not
        registerUser.findOne({ email: req.body.email }, (err, user) => {
          if (err) {
            callback(err);
          }

          //if a user was found, that means the user's email matches the entered email
          if (user) {
            var err = new Error(
              "A user with that email has already registered. Please use a different email.."
            );
            callback("Existing User");
          } else {
            //code if no user with entered email was found
            bcrypt.hash(req.body.password, 7, (err, encrypted) => {
              if (err) {
              } else {
                var register = registerUser({
                  fullName: req.body.fullName,
                  password: encrypted,
                  email: req.body.email,
                  country: req.body.country
                });
                // Save User in the database
                register
                  .save()
                  .then(data => {
                    // res.send(data);
                    callback(null, data);
                  })
                  .catch(err => {
                    callback(err);
                  });
              }
            });
          }
        });
      } else {
        callback("Email Id is not valid check with email is exist or not");
      }
    });
  } catch (err) {}
};

exports.userLogin = (req, callback) => {
  try {
    var response = {};
    registerUser.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, encrypted) => {
          if (err) {
            callback(err);
          } else {
            response._id = user._id;
            response.fullName = req.body.fullName;
            response.email = req.body.email;
            // const token = jwt.sign({ _id: user._id }, process.env.KEY);
            // response.tokens = user.tokens.concat({ token });
            callback(null, response);
          }
        });
      } else {
      }
    });
  } catch (err) {}
};

//forgot password
exports.forgotPassword = (req, callback) => {
  //finding the email is persent or not
  registerUser.findOne(
    {
      email: req.body.email
    },
    (err, data) => {
      if (data) {
        callback(null, data);
      } else {
        callback("invalid user email ");
      }
    }
  );
};
exports.resetPassword = (req, callback) => {
  bcrypt.hash(req.body.password, 7, (err, encrypted) => {
    if (err) {
      callback(err);
    } else {
      registerUser.updateOne(
        {
          _id: req.decoded.data_id
        },
        {
          password: encrypted
        },
        (err, data) => {
          if (err) {
            callback(err);
          } else {
            //   console.log(req.decoded);
            callback(null, data);
          }
        }
      );
    }
  });
};
