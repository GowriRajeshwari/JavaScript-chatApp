import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import history from "./history";
import Register from "./components/Register";
import forgotPassword from "./components/ForgotPassword";
import resetpassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";


function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Chat" exact component={Chat} />
          <Route path="/register" component={Register} />
          <Route path="/forgotPassword" component={forgotPassword} />
          <Route path="/resetPassword" component={resetpassword} />
          <Route path="/Dashboard" exact component={Dashboard} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
