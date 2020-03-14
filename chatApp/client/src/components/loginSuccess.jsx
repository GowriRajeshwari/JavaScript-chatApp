import React, { Component } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
class loginSuccess extends Component {
  componentWillMount() {
    // when params sent via url
    if (this.props.history.location.state) {
      let params = this.props.history.location.state.username;
      this.setState({ username: params });
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
        <div>WELCOME {this.state.username},LOGIN SUCCESSFULLY</div>
      </div>
    );
  }
}

export default loginSuccess;
