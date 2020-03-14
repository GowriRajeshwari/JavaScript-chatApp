import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import history from "./history";
import loginSuccess from "./components/loginSuccess";
import Register from "./components/Register";
import registerSuccess from "./components/registerSuccess";
import forgotPassword from "./components/ForgotPassword";
import resetpassword from "./components/ResetPassword";

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/loginSuccess" component={loginSuccess} />
          <Route path="/register" component={Register} />
          <Route path="/registerSuccess" component={registerSuccess} />
          <Route path="/forgotPassword" component={forgotPassword} />
          <Route path="/resetPassword" component={resetpassword} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
