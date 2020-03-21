const model = require("../Model/userModel.js");

exports.register = (req, callback) => {
  try {
    console.log(" In service :", req.body);
    model.userreg(req, (err, data) => {
      if (err) {
        //if error callback function is called and passing the error
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
//login the user
exports.loginUser = (req, callback) => {
  try {
    console.log(" In service :", req.body);
    model.userLogin(req, (err, data) => {
      if (err) {
        //if error callback function is called and passing the error
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

//forgotPassword
exports.forgotPassword = (req, callback) => {
  try {
    console.log(" In service forgotpassword :", req.body);
    model.forgotPassword(req, (err, data) => {
      if (err) {
        //if error callback function is called and passing the error
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

//ResetPassword
exports.resetPassword = (req, callback) => {
  try {
    console.log(" In service forgotpassword :", req.body);
    model.resetPassword(req, (err, data) => {
      if (err) {
        //if error callback function is called and passing the error
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
//Get user Data
exports.getUser = (req, callback) => {
  try {
    console.log(" In service forgotpassword :", req.body);
    model.getUser(req, (err, data) => {
      if (err) {
        //if error callback function is called and passing the error
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } catch (err) {
    console.log(err);
  }
};


//Save Chat Services.
exports.saveChat = (request, callback) => {
  try {
      model.saveChat(request, (err, data) => {
          if (err) {
              console.log("service ERRO : "+ err);
              callback(err);
          } else{
              callback(null, data)
          }
      })
  } catch (e) {
      console.log(e);
  }
}

//Get Chat Services.
exports.getChat = (request, callback) => {
  try {
      model.getChat(request, (err, data) => {
          if (err) {
              console.log("service ERRO : "+ err);
              callback(err);
          } else{
              callback(null, data)
          }
      })
  } catch (e) {
      console.log(e);
  }
}