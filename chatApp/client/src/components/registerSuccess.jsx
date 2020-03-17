import React, { Component } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
class registerSuccess extends Component {
   //Value been passed through props history and set the value in state
  componentWillMount() {
    // when params sent via url
    if (this.props.history.location.state) {
      let username = this.props.history.location.state.username;
      let email = this.props.history.location.state.email;
      let country = this.props.history.location.state.country;
      this.setState({ username: username, email: email, country: country });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      success: "LOGIN SUCCESSFULL"
    };
  }

  render() {
    return (
      <div className="container">
        <div>Name : {this.state.username}</div>
        <div>Email : {this.state.email}</div>
        <div>Country : {this.state.country}</div>
        <div>REGISTERED SUCCESSFULL</div>
      </div>
    );
  }
}

export default registerSuccess;
