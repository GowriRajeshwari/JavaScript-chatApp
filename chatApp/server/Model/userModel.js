const mongoose = require("mongoose");
const emailExistance = require("email-existence");
const bcrypt = require("bcryptjs");
var ObjectID = require("mongodb").ObjectID;

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
let chatsData = mongoose.Schema({
  from:{
      type:String,
      required:true
  },
  to:{
      type:String,
      required:true
  },
  chat:{
      type:String,
      required:true
  }
}, {
  timestamps: true
});
var registerUser = mongoose.model("register", registration);
let chats = mongoose.model("chats", chatsData);
exports.registerUser;

exports.userreg = (req, callback) => {
  try {
    console.log("In model", req.body.email);
    emailExistance.check(req.body.email, (err, response) => {
      if (response) {
        //finding the user is already existing or not
        registerUser.findOne({ email: req.body.email }, (err, user) => {
          console.log("user", user);
          if (err) {
            console.log("Error in findone");
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
            console.log("password", req.body.password);
            bcrypt.hash(req.body.password, 7, (err, encrypted) => {
              console.log(encrypted);
              if (err) {
                console.log("err find it out");
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
        console.log(err);
        callback("Email Id is not valid check with email is exist or not");
      }
    });
  } catch (err) {
    callback("Email is not Exist");
    console.log(err);
  }
};

exports.userLogin = (req, callback) => {
  try {
    var response = {};
    registerUser.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        console.log("password", req.body.password);
        bcrypt.compare(req.body.password, user.password, (err, encrypted) => {
          console.log(encrypted);
          if (err) {
            console.log("err find it out");
            callback("Password is Incorrect");
          } else if (encrypted) {
            response._id = user._id;
            response.fullName = user.fullName;
            response.email = req.body.email;
            // const token = jwt.sign({ _id: user._id }, process.env.KEY);
            // response.tokens = user.tokens.concat({ token });
            callback(null, response);
          } else {
            callback("Password is Incorrect");
          }
        });
      } else {
        callback("User Not Found");
        console.log("User Not Found");
      }
    });
  } catch (err) {
    console.log("err in userlogin", err);
  }
};

//forgot password
exports.forgotPassword = (req, callback) => {
  //finding the email is persent or not
  console.log("forgot password", req.body.email);
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
  console.log(req.body);
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
            console.log("password", ObjectID(req.body._id));
            callback(null, data);
          }
        }
      );
    }
  });
};

//Get User Data
exports.getUser=(req,callback)=>{
  console.log(req.body);
  registerUser.find({'email' : {'$ne' : req.body.email}},(err,data)=>{
    if(data){
      console.log(req.body);
      callback(null,data);
    }
    else{
      callback("error")
    }
  })
}

//Save The Chat
exports.saveChat = (request, callback) => {
  try{
      let chatNewData = new chats({
          "from" : request.body.from,
          "to" : request.body.to,
          "chat" : request.body.chat
      })
      chatNewData.save((err,data) => {
          if(err){
              console.log("service ERRO : "+ err);
              callback(err);
          } else {
              callback(null,data)
          }
      })
  }
  catch(err){
    console.log("service : "+ err);
    callback(err);
  }
  
}

//Get The Chat data
exports.getChat = (request, callback) => {
  try{
      chats.find({"$or": [{
          "from": request.body.from,"to":request.body.to
      }, {
          "from": request.body.to,"to":request.body.from
      }]},(err,data) => {
          if(err){
              callback(err);
          }else{
              callback(null,data);
          }
      })
  }catch(err){
      throw err;
  }
}