import React, { Component } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
class loginSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: "LOGIN SUCCESSFULL"
    };
  }

  render() {
    return (
      <div className="container">
        <div>{this.state.success}</div>
      </div>
    );
  }
}

export default loginSuccess;
