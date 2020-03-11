const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  jwt.verify(token, process.env.KEY, (err, result) => {
    if (err) {
      res.status(422).send(err);
    } else {
      req.decoded = result;
      next();
    }
  });
};

const GenerateToken = data_id => {
  {
    const token = jwt.sign({ data_id }, process.env.KEY, { expiresIn: "1h" }); // expires in 1 hour
    const obj = {
      success: true,
      message: "Token Generated Successfully!!",
      token: token
    };
    return obj;
  }
};
module.exports = { auth, GenerateToken };
