import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemTest from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { getUser, getChat, saveChat } from "../services/loginService";
import io from "socket.io-client";
import Snackbar from "@material-ui/core/Snackbar";
import { IconButton } from "@material-ui/core";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: false,
      messagebox: "",
      users: [],
      topic: "",
      username: "",
      allchat: [],
      messages: [],
      message: "",
      id: "",
      userdata: [],
      show: false,
      snackbaropen: false,
      snackbarmsg: "",
    };
    this.listitem = this.listitem.bind(this);
    this.messagebox = this.messagebox.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.socket = io("localhost:8080");
    this.myRef = React.createRef();

    //recevice the data from socket
    this.socket.on("RECEIVE_MESSAGE", function (data) {
      addMessage(data);
    });

    const addMessage = (data) => {
      this.setState({ messages: [...this.state.messages, data] });
      var data = {
        from: this.state.username,
        to: this.state.topic,
      };
      //call the Getchat API from the server
      getChat(data).then((response) => {
        if (response.status === 200) {
          this.setState({
            userdata: response.data.usersdata,
          });
        } else {
          this.setState({
            snackbarmsg: "Chat can't be retrieved",
            snackbaropen: true,
          });
        }
      });
    };

    //sending the message to server
    this.sendMessage = (ev) => {
      ev.preventDefault();
      if (this.state.topic != "") {
        this.socket.emit("SEND_MESSAGE", {
          author: this.state.topic,
          message: this.state.messagebox,
        });
        let data = {
          from: this.state.username,
          to: this.state.topic,
          chat: `${this.state.messagebox}`,
        };
        //save the chat to the database
        saveChat(data).then((response) => {
          if (response.status === 200) {
            this.setState({ messagebox: "" });
          } else {
            this.setState({ snackbarmsg: "msg not sent", snackbaropen: true });
          }
        });
      } else {
        this.setState({
          snackbarmsg: "pls click the recevier",
          snackbaropen: true,
        });
      }
    };
  }
  //close snackbar
  handleClose(event) {
    this.setState({ snackbaropen: false });
  }
  //logout
  logOut(event) {
    this.props.history.push({
      pathname: "/",
    });
    localStorage.setItem("username", "");
  }

  componentDidMount() {
    this._onScrollEvent();
    const username = localStorage.getItem("username");
    this.setState({ username: username });
    getUser().then((response) => {
      if (response.status === 200) {
        this.setState({
          users: response.data.data.data,
        });
      } else {
        this.setState({ snackbarmsg: "User not received", snackbaropen: true });
      }
    });
  }
  //messagebox event handler
  messagebox(event) {
    if (event.target.value.length > 2) {
      this.setState({
        helperText: "",
        error: false,
        messagebox: event.target.value,
      });
    } else {
      this.setState({
        helperText: "Invalid format",
        error: true,
        messagebox: event.target.value,
      });
    }
  }
  //List the item
  async listitem(event) {
    this.setState({ show: true });
    event.preventDefault();
    await this.setState({
      topic: event.target.innerText,
    });

    let data = {
      from: this.state.username,
      to: this.state.topic,
    };
    getChat(data).then((response) => {
      if (response.status === 200) {
        this.setState({
          userdata: response.data.usersdata,
        });
      } else {
        this.setState({
          snackbarmsg: "Chat can't be retrieved",
          snackbaropen: true,
        });
      }
    });
  }

  _onScrollEvent = () => {
    window.scrollTo({ top: this.myRef.offsetTop });
  };

  render() {
    return (
      <div>
        <div className="logoutbtn">
          <Button variant="contained" onClick={(e) => this.logOut(e)}>
            Logout
          </Button>
        </div>
        <div className="welcome">
          {" "}
          <Typography variant="h5" component="h3">
            Welcome {this.state.username}
          </Typography>
          {this.state.show ? (
            <Typography>
              {this.state.username} to {this.state.topic}
            </Typography>
          ) : null}
        </div>
        <Paper id="root">
          <div className="flex">
            <div className="topicsWindow">
              <List>
                {this.state.users.map((user, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={(e) => this.listitem(e)}
                  >
                    <ListItemTest primary={user.fullName} />
                  </ListItem>
                ))}
              </List>
            </div>
            <div className="chatWindow" ref={this.myRef}>
              <List
                style={{ maxHeight: "100%", overflow: "auto", padding: "5px" }}
              >
                {this.state.userdata.map((usersdata) => {
                  return (
                    <div className="flex">
                      <Typography
                        variant="p"
                        ref={this.myRef}
                        style={{ padding: "5px" }}
                      >
                        {usersdata.from} : {usersdata.chat}
                      </Typography>
                    </div>
                  );
                })}
              </List>
            </div>
          </div>
          <div className="flexsend">
            <div>
              <TextField
                variant="outlined"
                className="chatBox"
                label="send the chat"
                onChange={this.messagebox}
                value={this.state.messagebox}
              ></TextField>
              <Button
                id="button1"
                variant="contained"
                onClick={(e) => this.sendMessage(e)}
              >
                SEND
              </Button>
            </div>
          </div>
        </Paper>
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
        <div>{this.state.messagebox}</div>
      </div>
    );
  }
}
export default Dashboard;
