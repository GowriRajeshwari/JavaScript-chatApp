import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { resetPassword } from "../services/loginService";

//login Component
class resetpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: false,
      email: "",
      password: "",
      confirmPassword: "",
      resetpassword: "RESET PASSWORD",
      message: "",
      username: ""
    };
    this.resetPassword = this.resetPassword.bind(this);
  }
  //sign in button
  resetPassword(event) {
    event.preventDefault();
    console.log("login clicked");
    let data = {
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    console.log(data);
    resetPassword(data).then(response => {
      console.log(response);
      if (response.status === 200) {
        this.setState({
          message: "Password reset Successfully"
          //   username: response.data.data.data.fullName
        });
        // this.props.history.push({
        //   pathname: "/loginSuccess",
        //   state: { username: this.state.username }
        // });
      } else {
        this.setState({ message: "Password is Not changed" });
        alert("Make Sure that password & confirmPassword is correct");
      }
    });
  }

  onChangeConfirmPassword(event) {
    if (event.target.value.length > 2) {
      this.setState({
        helperText: "",
        error: false,
        confirmPassword: event.target.value
      });
    } else {
      this.setState({
        helperText: "Invalid format",
        error: true,
        confirmPassword: event.target.value
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
          <div className="loginstyle">{this.state.resetpassword}</div>

          <div className="border">
            <div className="loginFrom">
              <div className="inputField">
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  id="btn"
                  variant="outlined"
                  type="password"
                  label="Password"
                  helperText={this.state.helperText}
                  onChange={this.onChangePassword.bind(this)}
                ></TextField>
              </div>
              <div className="inputField">
                <TextField
                  hintText="Confirm Password"
                  floatingLabelText="Confirm Password"
                  id="btn"
                  variant="outlined"
                  type="password"
                  label="Confirm Password"
                  helperText={this.state.helperText}
                  onChange={this.onChangeConfirmPassword.bind(this)}
                ></TextField>
              </div>
              <div className="submitButton">
                <Button id="subbtn" onClick={e => this.resetPassword(e)}>
                  SUBMIT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default resetpassword;
