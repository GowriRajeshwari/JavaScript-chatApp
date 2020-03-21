var express = require('express');
var socket = require('socket.io');

var app = express();

var connectedClients = {};
server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

io = socket(server);

io.on('connection', (socket) => {
    // socket.on('CONNECT', function(data){
    //     console.log(socket.id);
    //         connectedClients[data.username]=socket.id;
    //         console.log(Object.keys(connectedClients) );
    //       //  io.to(`${socket.id}`).emit('RECEIVE_MESSAGE', data);
    //         //io.emit('ID', Object.keys(connectedClients));
    //     })
    socket.on('SEND_MESSAGE', function(data){
        console.log(data)
       //io.to(`${socket.id}`).emit('RECEIVE_MESSAGE', data,{id : connectedClients[data.author]});
       //io.sockets.socket(connectedClients[data.author]).emit('RECEIVE_MESSAGE',data);

         io.emit('RECEIVE_MESSAGE', data);
    })

//  socket.on('SEND_MESSAGE', function(usr, username, message) {
//     console.log("From user: "+username);
//     console.log("To user: "+usr);
//     console.log("array"+connectedClients);
//     io.sockets.socket(connectedClients[usr]).emit('RECEIVE_MESSAGE', username, message);
// });
 
});