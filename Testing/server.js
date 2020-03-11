const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");
const express = require("express");
const bodyparser = require("body-parser");
const expressvalidator = require("express-validator");
const app = express();
const routes = require("./Server/Routes/routes.js");
require("dotenv").config();
//require("./Server/Routes/routes.js")(app);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(expressvalidator());
app.use("/", routes);
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the Database Successfully");
  })
  .catch(err => {
    console.log("Not connected to the database ", err);
    process.exit();
  });

module.exports = app.listen(process.env.PORT, () => {
  console.log("server is listening on port 3000");
});
