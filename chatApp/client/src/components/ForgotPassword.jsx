import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { forgotpassword, resetPassword } from "../services/loginService";
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";


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
      token: "",
      snackbaropen : false,
      snackbarmsg : '',
    };
    this.sendMail = this.sendMail.bind(this);
    this.handleClose =this.handleClose.bind(this);
  }
 //close snackbar
 handleClose(event){
  // event.preventDefault();
   this.setState({snackbaropen : false});
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
      // console.log(response.data.data.token);
      if (response.status === 200) {
        this.setState({
          token: response.data.data.token
        });
        localStorage.setItem('token', response.data.data.token);
        this.setState({snackbarmsg : "Link is Send to the Mail" , snackbaropen : true  });

      } else {
        this.setState({ message:"Mail is not Exist",snackbarmsg : "Make sure Mail is Exist" , snackbaropen : true  });
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

        <div className="containerForgot">
          <div className="loginstyleForgot">{this.state.forgotPassword}</div>
          <div className="borderForgot">
            <div className="loginFromForgot">
              <div className="inputFieldForgot">
                <TextField
                  helperText={this.state.helperText}
                  id="btnForgot"
                  variant="outlined"
                  label="Email"
                  onChange={this.onChangeEmail.bind(this)}
                />
              </div>
              <div className="submitButtonForgot">
                <Button id="subbtnForgot" onClick={e => this.sendMail(e)}>
                  SUBMIT
                </Button>
              </div>
            </div>
          </div>
          <Snackbar open={this.state.snackbaropen} autoHideDuration={6000} onClose={this.handleClose}
            message={<span>{this.state.snackbarmsg}</span>}
            action={[
              <IconButton key="close" arial-label="close" coloe="inherit" onClick={this.handleClose}>
                x</IconButton>
            ]}>

          </Snackbar>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default forgotPassword;
