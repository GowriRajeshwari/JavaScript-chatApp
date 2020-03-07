const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log(req.body);
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token);
  jwt.verify(token, process.env.KEY, (err, result) => {
    if (err) {
      res.status(422).send(err);
    } else {
      req.decoded = result;
      console.log("result", result);
      next();
    }
  });
};

GenerateToken = payload => {
  {
    const token = jwt.sign({ payload }, process.env.KEY, { expiresIn: "1h" }); // expires in 1 hour
    const obj = {
      success: true,
      message: "Token Generated Successfully!!",
      token: token
    };
    return obj;
  }
};
module.exports = { auth, GenerateToken };
