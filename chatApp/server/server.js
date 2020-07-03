const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");
const express = require("express");
const bodyparser = require("body-parser");
const expressvalidator = require("express-validator");
const app = express();
const routes = require("./Routes/routes.js");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
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
    app.listen(process.env.PORT, () => {
      console.log("server is listening on port 4000");
    });
  })
  .catch(err => {
    console.log("Not connected to the database ", err);
    process.exit();
  });
