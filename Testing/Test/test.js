import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";
// Configure chai
chai.use(chaiHttp);
chai.should();
//Test case for Login for Founded User
describe("login Positive Value", () => {
  describe("POST /", () => {
    // Test to get all students record
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
            err.response.body.should.have.property("error");
            done();
          } else {
            console.log("res");
            //res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          }
        });
    });
  });
});
//Test case for the User Not found
describe("login Negative Value", () => {
  describe("POST /", () => {
    // Test to get all students record
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
            err.response.body.should.have.property("error");
            done();
          } else {
            console.log("res");
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          }
        });
    });
  });
});

//Test case for the Registeration

describe("Registration", () => {
  describe("POST /", () => {
    // Test to get all students record
    it("Register the Users ", done => {
      chai
        .request(app)
        .post("/register")
        .set("content-type", "application/x-www-form-urlencoded")
        //json value to send
        .send({
          fullName: "gowrik",
          password: "gowri@35",
          email: "gowrikannan216@gmail.com",
          country: "heydrabad"
        })
        .end((err, res) => {
          if (err) {
            console.log("err");
            err.response.body.should.have.property("error");
            done();
          } else {
            console.log("res");
            res.body.should.be.a("object");
            done();
          }
        });
    });
  });
});
//test case for Alreay Existing User
describe("Registration", () => {
  describe("POST /", () => {
    // Test to get all students record
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
            err.response.body.should.have.property("error");
            done();
          } else {
            console.log("res");
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          }
        });
    });
  });
});
