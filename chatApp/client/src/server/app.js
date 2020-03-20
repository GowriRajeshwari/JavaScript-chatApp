var express = require('express');
var socket = require('socket.io');

var app = express();

var connectedClients = {};
server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
       // io.to(`${socket.id}`).emit('RECEIVE_MESSAGE', data);
         io.emit('RECEIVE_MESSAGE', data);
    })
 socket.on('SEND_MESSAGE', function(data){
    connectedClients[data.author] =  socket.id;

//      console.log(data.author + data.message )
//  io.to(connectedClients[data.author]).emit('RECEIVE_MESSAGE', data.message);
 socket.on('SEND_MESSAGE', function(usr, username, message) {
    console.log("From user: "+username);
    console.log("To user: "+usr);
    console.log("array"+connectedClients);
    io.sockets.socket(connectedClients[usr]).emit('RECEIVE_MESSAGE', username, msg);
});
 });
});