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
