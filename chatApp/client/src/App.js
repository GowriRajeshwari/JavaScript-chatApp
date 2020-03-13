import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import history from "./history";
import loginSuccess from "./components/loginSuccess";

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/loginSuccess" exact component={loginSuccess} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
