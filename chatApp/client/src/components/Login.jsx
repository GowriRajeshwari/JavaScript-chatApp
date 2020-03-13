import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import login from "../services/loginService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: false,
      users: [],
      email: "",
      password: "",
      login: "LOGIN",
      message: ""
    };
    this.SignIn = this.SignIn.bind(this);
  }
  //sign in button
  SignIn(event) {
    event.preventDefault();
    console.log("login clicked");
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(data);
    login(data).then(response => {
      console.log(response.status);
      if (response.status === 200) {
        this.setState({ message: "Login Successfully" });
        this.props.history.push("/loginSuccess");
      } else {
        this.setState({ message: "Login Successfully" });
        alert("Make Sure that email and password is correct");
      }
    });
  }

  onChangeEmail(event) {
    if (event.target.value.length > 2) {
      this.setState({
        helperText: "",
        error: false,
        email: event.target.value
      });
    } else {
      this.setState({
        helperText: "Invalid format",
        error: true,
        email: event.target.value
      });
    }
  }
  onChangePassword(event) {
    if (event.target.value.length > 7) {
      this.setState({
        helperText: "",
        error: false,
        password: event.target.value
      });
    } else {
      this.setState({
        helperText: "Password should be 7 letters",
        error: true,
        password: event.target.value
      });
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>

        <div className="container">
          <div className="loginstyle">{this.state.login}</div>

          <div className="border">
            <div className="loginFrom">
              <div className="inputField">
                <TextField
                  helperText={this.state.helperText}
                  id="btn"
                  variant="outlined"
                  label="Email"
                  onChange={this.onChangeEmail.bind(this)}
                />
              </div>
              <div className="inputField">
                <TextField
                  id="btn"
                  variant="outlined"
                  label="Password"
                  helperText={this.state.helperText}
                  onChange={this.onChangePassword.bind(this)}
                />
              </div>
              <div className="submitButton">
                <Button id="subbtn" onClick={e => this.SignIn(e)}>
                  SUBMIT
                </Button>
              </div>
            </div>
          </div>
          <div className="belowlogin">
            <Button id="forgotstyle" onClick={e => this.forgotpassword(e)}>
              Forgot Password
            </Button>
            <Button id="forgotstyle" onClick={e => this.register(e)}>
              Not a Member Yet?
            </Button>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Login;
