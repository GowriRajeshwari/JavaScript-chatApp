import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { login } from "../services/loginService";
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";
import io from "socket.io-client";


//login Component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      helperTextpassowrd: "",
      error: false,
      users: [],
      email: "",
      password: "",
      login: "LOGIN",
      message: "",
      username: "",
      snackbaropen: false,
      snackbarmsg: '',
      id: ""
    };
    this.SignIn = this.SignIn.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.socket = io('localhost:8080');

  }
  //Event Handler for forgot password
  forgotpassword(event) {
    event.preventDefault();
    this.props.history.push("/forgotPassword");
  }
  //Event Handler for reset password
  register(event) {
    event.preventDefault();
    console.log("register clicked");
    this.props.history.push("/register");
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
    if(data.email || data.password !=''){
      login(data).then(response => {
        // console.log(response.data.data.data._id);
        if (response.status === 200) {
          this.setState({
            message: "Login Successfully",
            username: response.data.data.data.fullName,
          });
          localStorage.setItem("username", this.state.username);
          this.props.history.push({
            pathname: "/Dashboard",
          });
        } else {
          this.setState({ message: "Login Not Successfull", snackbarmsg: "Login Not Successfull", snackbaropen: true });
        }
      });
    }
    else{
      this.setState({ message: "Fields are empty", snackbarmsg: "Fields are empty", snackbaropen: true });

    }
   
  }
  //close snackbar
  handleClose(event) {
    // event.preventDefault();
    this.setState({ snackbaropen: false });
  }
  //setState for email field
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
  //setState for password field
  onChangePassword(event) {
    if (event.target.value.length > 7) {
      this.setState({
        helperTextpassowrd: "",
        error: false,
        password: event.target.value
      });
    } else {
      this.setState({
        helperTextpassowrd: "Password should be 7 letters",
        error: true,
        password: event.target.value
      });
    }
  }
  //render function and User Interface for Login
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
                  hintText="Password"
                  floatingLabelText="Password"
                  id="btn"
                  variant="outlined"
                  type="password"
                  label="Password"
                  helperText={this.state.helperTextpassowrd}
                  onChange={this.onChangePassword.bind(this)}
                ></TextField>
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
          <Snackbar open={this.state.snackbaropen} autoHideDuration={6000} onClose={this.handleClose}
            message={<span>{this.state.snackbarmsg}</span>}
            action={[
              <IconButton key="close" arial-label="close" color="inherit" onClick={this.handleClose}>
                x</IconButton>
            ]}>

          </Snackbar>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Login;
