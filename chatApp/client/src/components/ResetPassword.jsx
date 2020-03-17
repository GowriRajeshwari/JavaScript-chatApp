import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { resetPassword } from "../services/loginService";

//ResetPassword Component
class resetpassword extends Component {
  //constructor
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
      username: "",
      token :""
    };
    this.resetPassword = this.resetPassword.bind(this);
  }
  //ComponentDidMount in Life cycle function be used
  componentDidMount(){
    const token = localStorage.getItem('token');
    this.setState({token : token});
    console.log("token",JSON.stringify(token));
  }
  //reset Password Event Handler
  resetPassword(event) {
    event.preventDefault();
    console.log("login clicked");
    let data = {
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    console.log(data);
    //Calling the API using axios method
    resetPassword(data,this.state.token).then(response => {
      console.log(response);
      if (response.status === 200) {
        this.setState({
          message: "Password reset Successfully"
        });
      } else {
        this.setState({ message: "Password is Not changed" });
        alert("Make Sure that password & confirmPassword is correct");
      }
    });
  }
//setState for confirm password field
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
//setState for password field
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
//Render function && User Interface for resetPassword
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
            <div className="loginstyle">{this.state.message}</div>

          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default resetpassword;
