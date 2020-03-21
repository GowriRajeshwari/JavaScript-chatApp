import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemTest from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { getUser,getChat,saveChat } from "../services/loginService";
import io from "socket.io-client";



class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: false,
      messagebox :"",
      users:[],topic :"",
      username:"",
      allchat:[],
      messages:[],
      message:"",
      id:"",
      userdata:[]
    };
    this.listitem = this.listitem.bind(this);
    this.socket = io('localhost:8080');
    this.myRef = React.createRef();

    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
       
    });

    const addMessage = data => {
      console.log(data);
      this.setState({messages: [...this.state.messages, data]});
      this.setState({messagebox:""});
      console.log(this.state.messages);
      var data = {
        from: this.state.username,
        to: this.state.topic
      };
      getChat(data).then(response => {
        console.log( response.data.usersdata)
        if (response.status === 200) {
          this.setState({
            userdata: response.data.usersdata,
          });
        } else {
         // this.setState({ message: "Login Not Successfull",snackbarmsg : "Login Not Successfull" , snackbaropen : true  });
          //alert("Make Sure that email and password is correct");
        }
      });
  };
  this.sendMessage = ev => {
    ev.preventDefault();
    this.socket.emit('SEND_MESSAGE', {
        author: this.state.topic,
        message: this.state.messagebox
    })
    let data = {
      from: this.state.username,
      to: this.state.topic,
      chat: `${this.state.username} : ${this.state.messagebox}`
    };
    saveChat(data).then(response => {
      console.log( response)
      if (response.status === 200) {
        // this.setState({
        //   userdata: response.data.usersdata,
        // });
      } else {
       // this.setState({ message: "Login Not Successfull",snackbarmsg : "Login Not Successfull" , snackbaropen : true  });
        //alert("Make Sure that email and password is correct");
      }
    });
    this.setState({messagebox:""});   
}



  }
  componentWillMount() {
    // when params sent via url
    // if (this.props.history.location.state) {
    //   let params = this.props.history.location.state.username;
    //   this.setState({ username: params });
    // }


  }
  componentDidMount(){
    this._onScrollEvent();
    const username = localStorage.getItem("username");
    const id = localStorage.getItem("id");
    this.setState({username : username , id : id});
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
     async listitem(event){
        console.log("clcked",event.target.innerText)
    event.preventDefault();
       await this.setState({
          topic : event.target.innerText,
          // messages:[]
        });
        console.log(this.state.topic);

        let data = {
          from: this.state.username,
          to: this.state.topic
        };
        getChat(data).then(response => {
          console.log( response.data.usersdata)
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
      

      _onScrollEvent =()=>{
      window.scrollTo({top:this.myRef.offsetTop});
      }
    render(){
        return (
            <div>
              <Paper id="root">
              <div className="welcome">  <Typography variant="h5" component="h3" >
                Welcome {this.state.username}
              </Typography>
              <Typography component="p">
              {this.state.topic}
              </Typography>
              </div>
            
             
              <div className="flex">
              <div className="topicsWindow">
                    <List>
                        {  this.state.users.map((user, index)=>(
                          //  ['topic'].map(topic =>(
                                <ListItem key={index} button onClick={e => this.listitem(e)}>
                                <ListItemTest primary={user.fullName}/>
                                </ListItem>
                            ))
                        }
                       
                    </List>
                    </div>
                    <div className="chatWindow" >
                    
                            {/* // [{from : "user", msg : "hello"}].map((chat,i) =>(
                            //   <div className="flex" key={i}>
                            //   <Chip label ={chat.from} className="chip"/>
                            //   <Typography variant='p'>{chat.msg}</Typography> 
                            //   </div>
                            // )) */}
                            {this.state.userdata.map(usersdata => {
                              return (
                                  <div ref={this.myRef}>{usersdata.chat}</div>
                              )
                          })}
                        
                    </div>
              </div>
              <div className="flex">
              <TextField
                  className="chatBox"
                  label="send the chat"
                   onChange={this.messagebox.bind(this)}
                ></TextField>
                <Button id="button1" variant="contained" onClick={e => this.sendMessage(e)}>
                  SEND
                </Button>
              </div>
              </Paper>
              <div>{this.state.messagebox}</div>
            </div>
          );
    }
  
}
export default Dashboard;