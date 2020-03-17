import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { forgotpassword, resetPassword } from "../services/loginService";
// import ResetPassword from "../components/ResetPassword";

//ForgotPassword Component
class forgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: false,
      users: [],
      email: "",
      password: "",
      forgotPassword: "FORGOT PASSWORD",
      message: "",
      username: "",
      token: ""
    };
    this.sendMail = this.sendMail.bind(this);
  }

  //sendMail in button
  sendMail(event) {
    event.preventDefault();
    console.log("Send Mail Button clicked");
    let data = {
      email: this.state.email
    };
    console.log(data);
    forgotpassword(data).then(response => {
      console.log(response.data.data.token);
      if (response.status === 200) {
        this.setState({
          token: response.data.data.token
        });
        localStorage.setItem('token',response.data.data.token );
        alert("Link is Send to the Mail");
      } else {
        this.setState({ message: "Mail is not Exist" });
        alert("Make sure Mail is Exist");
      }
    });
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
  //Render and User Interface for Forgot Password
  render() {
    return (
      <MuiThemeProvider>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>

        <div className="container">
          {/* <ResetPassword token={this.state.token}></ResetPassword> */}
          <div className="loginstyle">{this.state.forgotPassword}</div>
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

              <div className="submitButton">
                <Button id="subbtn" onClick={e => this.sendMail(e)}>
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

export default forgotPassword;
