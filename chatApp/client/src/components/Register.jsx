import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { register } from "../services/loginService";
//Register Component
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: false,
      users: [],
      email: "",
      password: "",
      register: "REGISTER",
      message: "",
      username: "",
      name: "",
      country: "",
      snackbaropen : false,
      snackbarmsg : ''
    };
    this.RegisterBtn = this.RegisterBtn.bind(this);
    this.handleClose =this.handleClose.bind(this);
  }
   //close snackbar
   handleClose(event){
     this.setState({snackbaropen : false});
   }
  //register Event Handler
  RegisterBtn(event) {
    event.preventDefault();
    console.log("Register clicked");
    let data = {
      fullName: this.state.name,
      email: this.state.email,
      password: this.state.password,
      country: this.state.country
    };
    console.log(data);
    register(data).then(response => {
      console.log(response.data.data.data.fullName);
      // console.log(response.data);
      if (response.status === 200) {
        this.setState({
          message: "Regitered Successfully",
          username: response.data.data.data.fullName,
          country: response.data.data.data.country,
          email: response.data.data.data.email
        });
        this.props.history.push({
          pathname: "/login",
          // state: {
          //   username: this.state.username,
          //   email: this.state.email,
          //   country: this.state.country
          // }
        });
      } else {
        this.setState({ message: response.data.data.message });
        alert(this.state.message);
      }
    });
  }
//setState for email field and validation
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
 // setState for password field and validation
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
  //setState for Name field and validation
  onChangeName(event) {
    if (event.target.value.length > 3) {
      this.setState({
        helperText: "",
        error: false,
        name: event.target.value
      });
    } else {
      this.setState({
        helperText: "Name should be max of 3 letters",
        error: true,
        name: event.target.value
      });
    }
  }
 // setState for Country field && validation
  onChangeCountry(event) {
    if (event.target.value.length > 3) {
      this.setState({
        helperText: "",
        error: false,
        country: event.target.value
      });
    } else {
      this.setState({
        helperText: "Name should be max of 3 letters",
        error: true,
        country: event.target.value
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
          <div className="loginstyle">{this.state.register}</div>

          <div className="border">
            <div className="regFrom">
              <div className="top">
                <div className="inputField">
                  <TextField
                    id="btn"
                    variant="outlined"
                    label="Name(FullName)"
                    onChange={this.onChangeName.bind(this)}
                  />
                </div>
                <div className="inputField">
                  <TextField
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
                    onChange={this.onChangePassword.bind(this)}
                  ></TextField>
                </div>
                <div className="inputField">
                  <TextField
                    id="btn"
                    variant="outlined"
                    label="Country"
                    onChange={this.onChangeCountry.bind(this)}
                  />
                </div>
                <div className="helperttext">{this.state.helperText}</div>
                <div className="Buttonreg">
                  <Button id="subbtn" onClick={e => this.RegisterBtn(e)}>
                    REGISTER
                  </Button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Register;
 