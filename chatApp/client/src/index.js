import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./css/dashboard.css";
import "./css/login.css";
import "./css/register.css";
import "./css/forgetPassword.css";
import "./css/resetPassword.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
