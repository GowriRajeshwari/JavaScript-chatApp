import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";
// const token = require("../Middleware/Jwt.js");
// Configure chai
chai.use(chaiHttp);
chai.should();
//Test case for Login for Founded User
describe("Server API Checking for Post method", () => {
  describe("POST /", () => {
    //Login User
    it("Login the user", done => {
      chai
        .request(app)
        .post("/users/login")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          email: "gowrikanaga216@gmail.com",
          password: "gowri@355"
        })
        .end((err, res) => {
          if (err) {
            console.log("err");
            err.res.body.should.have.property("error");
            done();
          } else {
            //res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          }
        });
    });

    // User NOt found
    it("User not found while login", done => {
      chai
        .request(app)
        .post("/users/login")
        .set("content-type", "application/x-www-form-urlencoded")
        //json value to send
        .send({
          email: "gowrikanaga216gmail.com",
          password: "gowri@355"
        })
        .end((err, res) => {
          if (err) {
            console.log("err");
            err.res.body.should.have.property("error");
            done();
          } else {
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          }
        });
    });

    Resigtration API
    it("Register the Users ", done => {
      chai
        .request(app)
        .post("/register")
        .set("content-type", "application/x-www-form-urlencoded")
        //json value to send
        .send({
          fullName: "gowrik",
          password: "gowri@35",
          email: "gowripanda35@gmail.com",
          country: "heydrabad"
        })
        .end((err, res) => {
          if (err) {
            console.log("err");
            err.res.body.should.have.property("error");
            done();
          } else {
            res.body.should.be.a("object");
            done();
          }
        });
    });

    //test case for Alreay Existing User

    it("Existing Users ", done => {
      chai
        .request(app)
        .post("/register")
        .set("content-type", "application/x-www-form-urlencoded")
        //json value to send
        .send({
          fullName: "gowri",
          password: "gowri@355",
          email: "gowrikanaga216@gmail.com",
          country: "heydrabad"
        })
        .end((err, res) => {
          if (err) {
            console.log("err");
            err.res.body.should.have.property("error");
            done();
          } else {
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          }
        });
    });

    //forgot Password Generate token and send mail for reset password
    it("Forgot Password sending mail API", done => {
      chai
        .request(app)
        .post("/users/forgotPassword")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          email: "gowrikanaga216@gmail.com"
        })
        .end((err, res) => {
          if (err) {
            console.log("err");
            err.res.body.should.have.property("error");
            done();
          } else {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          }
        });
    });

    //Email not found for sending mail in forgot Password
    it("Email not found for forgot Password API", done => {
      chai
        .request(app)
        .post("/users/forgotPassword")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          email: "gowripanda35@gmail.com"
        })
        .end((err, res) => {
          if (err) {
            console.log("err");
            err.res.body.should.have.property("error");
            done();
          } else {
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          }
        });
    });

    //Reset Password
    it("Reset password for login user", done => {
      //console.log(auth.req.decoded.data_id);
      chai
        .request(app)
        .post("/users/resetPassword")
        .set(
          "Authorization",
          "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhX2lkIjoiNWU2ODk4NWZjMGMxYzU2ZjI1YzQ3NTVlIiwiaWF0IjoxNTgzOTMwMDI1LCJleHAiOjE1ODM5MzM2MjV9.EA5W6CP4S-c_WLSd3jLYG8CpBF9D80kSWYgRf4OjC0I"
        )
        .send({
          password: "rajeshwari@355",
          confirmPassword: "rajeshwari@355"
        })
        .end((err, res) => {
          if (err) {
            err.res.body.should.have.property("error");
            done();
          } else {
            res.body.should.be.a("object");
            done();
          }
        });
    });

    //Password not changed
    //Reset Password
    it("Reset password for login user", done => {
      //console.log(auth.req.decoded.data_id);
      chai
        .request(app)
        .post("/users/resetPassword")
        .set(
          "Authorization",
          "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhX2lkIjoiNWU2ODk4NWZjMGMxYzU2ZjI1YzQ3NTVlIiwiaWF0IjoxNTgzOTMwMDI1LCJleHAiOjE1ODM5MzM2MjV9.EA5W6CP4S-c_WLSd3jLYG8CpBF9D80kSWYgRf4OjC0I"
        )
        .send({
          password: "rajeshwari@355",
          confirmPassword: "rajeshwar@355"
        })
        .end((err, res) => {
          if (err) {
            err.res.body.should.have.property("error");
            done();
          } else {
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          }
        });
    });
  });
});
