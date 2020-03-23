import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemTest from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { getUser, getChat, saveChat } from "../services/loginService";
import io from "socket.io-client";
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";




class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: false,
      messagebox: "",
      users: [], topic: "",
      username: "",
      allchat: [],
      messages: [],
      message: "",
      id: "",
      userdata: [],
      show: false,
      snackbaropen : false,
      snackbarmsg : '',
    };
    this.listitem = this.listitem.bind(this);
    this.messagebox = this.messagebox.bind(this);
    this.handleClose =this.handleClose.bind(this);
    this.socket = io('localhost:8080');
    this.myRef = React.createRef();

    this.socket.on('RECEIVE_MESSAGE', function (data) {
      addMessage(data);

    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
      var data = {
        from: this.state.username,
        to: this.state.topic
      };

      getChat(data).then(response => {
        console.log(response.data.usersdata)
        if (response.status === 200) {
          this.setState({
            userdata: response.data.usersdata,
          });
        } else {
         console.log("Not Successfull")
        }
      });

    };
    
    //sending the message to server
    this.sendMessage = ev => {
      ev.preventDefault();
      console.log(this.state.topic);
      if (this.state.topic != '') {
        this.socket.emit('SEND_MESSAGE', {
          author: this.state.topic,
          message: this.state.messagebox
        })
        let data = {
          from: this.state.username,
          to: this.state.topic,
          chat: `${this.state.messagebox}`
        };
        
        saveChat(data).then(response => {
          console.log(response)
          if (response.status === 200) {
          
          } else {
        this.setState({snackbarmsg : "msg not sent" , snackbaropen : true  });
          }
        });

        this.setState({ messagebox: null });
      } else {
        this.setState({snackbarmsg : "pls click the recevier" , snackbaropen : true  });

      }
    }
  }
   //close snackbar
   handleClose(event){
    // event.preventDefault();
     this.setState({snackbaropen : false});
   }
  componentDidMount() {
    this._onScrollEvent();
    const username = localStorage.getItem("username");
    const id = localStorage.getItem("id");
    this.setState({ username: username, id: id });
    getUser().then(response => {
      console.log(response.data.data.data);
      if (response.status === 200) {
        console.log(response)
        this.setState({
          users: response.data.data.data,
        });
        console.log(this.state.users)
      } else {
        // this.setState({ message: "Login Not Successfull",snackbarmsg : "Login Not Successfull" , snackbaropen : true  });
        //alert("Make Sure that email and password is correct");
      }
    });

  }
  messagebox(event) {
    if (event.target.value.length > 2) {
      this.setState({
        helperText: "",
        error: false,
        messagebox: event.target.value

      });
    } else {
      this.setState({
        helperText: "Invalid format",
        error: true,
        messagebox: event.target.value
      });
    }
  }
  async listitem(event) {
    console.log("clcked", event.target.innerText)
    this.setState({ show: true })
    event.preventDefault();
    await this.setState({
      topic: event.target.innerText,
    });
    console.log(this.state.topic);

    let data = {
      from: this.state.username,
      to: this.state.topic
    };
    getChat(data).then(response => {
      console.log(response.data.usersdata)
      if (response.status === 200) {
        this.setState({
          userdata: response.data.usersdata,
        });
      } else {
        // this.setState({ message: "Login Not Successfull",snackbarmsg : "Login Not Successfull" , snackbaropen : true  });
        //alert("Make Sure that email and password is correct");
      }
    });
  }


  _onScrollEvent = () => {
    window.scrollTo({ top: this.myRef.offsetTop });
  }
  render() {
    return (
      <div>
        <div className="welcome">  <Typography variant="h5" component="h3" >
          Welcome {this.state.username}
        </Typography>

          {this.state.show ? <Typography >
            {this.state.username}  to {this.state.topic}
          </Typography> : null}
        </div>
        <Paper id="root">



          <div className="flex">
            <div className="topicsWindow">
              <List>
                {this.state.users.map((user, index) => (
                  <ListItem key={index} button onClick={e => this.listitem(e)}>
                    <ListItemTest primary={user.fullName} />
                  </ListItem>
                ))
                }

              </List>
            </div>
            <div className="chatWindow" ref={this.myRef}>
              <List style={{ maxHeight: '100%', overflow: 'auto', padding: '5px' }} >
                {this.state.userdata.map(usersdata => {
                  return (
                    // <div ref={this.myRef}>{usersdata.chat}</div>
                    <div className="flex" >
                      <Typography variant='p' ref={this.myRef} style={{ padding: '5px' }}>{usersdata.from}  : {usersdata.chat}</Typography>
                    </div>
                  )
                })}
              </List>


            </div>
          </div>
          {/* <div className="flex"> */}
          <div className="flexsend">
            <TextField
              className="chatBox"
              label="send the chat"
              onChange={this.messagebox}
              value={this.state.messagebox}
            ></TextField>
            <Button id="button1" variant="contained" onClick={e => this.sendMessage(e)}>
              SEND
                </Button>
            {/* </div> */}

          </div>
        </Paper>
        <Snackbar open={this.state.snackbaropen} autoHideDuration={6000} onClose={this.handleClose}
          message = { <span>{this.state.snackbarmsg}</span>}
          action={[
            <IconButton key="close" arial-label="close" coloe="inherit" onClick={this.handleClose}>
            x</IconButton>
          ]}>
  
</Snackbar>
        <div>{this.state.messagebox}</div>
      </div>
    );
  }

}
export default Dashboard;