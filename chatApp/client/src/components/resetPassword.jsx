import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { resetPassword } from "../services/loginService";
import Snackbar from "@material-ui/core/Snackbar";
import { IconButton } from "@material-ui/core";

//ResetPassword Component
class resetpassword extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      helperTextpassword: "",
      error: false,
      email: "",
      password: "",
      confirmPassword: "",
      resetpassword: "RESET PASSWORD",
      message: "",
      username: "",
      token: "",
      snackbaropen: false,
      snackbarmsg: "",
    };
    this.resetPassword = this.resetPassword.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  //close snackbar
  handleClose(event) {
    this.setState({ snackbaropen: false });
  }
  //ComponentDidMount in Life cycle function be used
  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ token: token });
    console.log("token", JSON.stringify(token));
  }
  //reset Password Event Handler
  resetPassword(event) {
    event.preventDefault();
    let data = {
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    //Calling the API using axios method
    resetPassword(data, this.state.token).then((response) => {
      if (response.status === 200) {
        this.setState({
          message: "Password reset Successfully",
        });
      } else {
        this.setState({
          message: "Password is Not changed",
          snackbarmsg: " Make Sure that password & confirmPassword is correct",
          snackbaropen: true,
        });
      }
    });
  }
  //setState for confirm password field
  onChangeConfirmPassword(event) {
    if (event.target.value.length > 2) {
      this.setState({
        helperText: "",
        error: false,
        confirmPassword: event.target.value,
      });
    } else {
      this.setState({
        helperText: "Invalid format",
        error: true,
        confirmPassword: event.target.value,
      });
    }
  }
  //setState for password field
  onChangePassword(event) {
    if (event.target.value.length > 7) {
      this.setState({
        helperTextpassword: "",
        error: false,
        password: event.target.value,
      });
    } else {
      this.setState({
        helperTextpassword: "Password should be 7 letters",
        error: true,
        password: event.target.value,
      });
    }
  }
  //Render function && User Interface for resetPassword
  render() {
    return (
      <MuiThemeProvider>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>

        <div className="containerReset">
          <div className="loginstyleReset">{this.state.resetpassword}</div>

          <div className="borderReset">
            <div className="loginFromReset">
              <div className="inputFieldReset">
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  id="btnReset"
                  variant="outlined"
                  type="password"
                  label="Password"
                  helperText={this.state.helperTextpassword}
                  onChange={this.onChangePassword.bind(this)}
                ></TextField>
              </div>
              <div className="inputFieldReset">
                <TextField
                  hintText="Confirm Password"
                  floatingLabelText="Confirm Password"
                  id="btnReset"
                  variant="outlined"
                  type="password"
                  label="Confirm Password"
                  helperText={this.state.helperText}
                  onChange={this.onChangeConfirmPassword.bind(this)}
                ></TextField>
              </div>
              <div className="submitButtonReset">
                <Button id="subbtnReset" onClick={(e) => this.resetPassword(e)}>
                  SUBMIT
                </Button>
              </div>
            </div>
            <div className="loginstyle">{this.state.message}</div>
          </div>
          <Snackbar
            open={this.state.snackbaropen}
            autoHideDuration={6000}
            onClose={this.handleClose}
            message={<span>{this.state.snackbarmsg}</span>}
            action={[
              <IconButton
                key="close"
                arial-label="close"
                coloe="inherit"
                onClick={this.handleClose}
              >
                x
              </IconButton>,
            ]}
          ></Snackbar>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default resetpassword;
