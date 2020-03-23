var express = require('express');
var socket = require('socket.io');

var app = express();

var connectedClients = {};
server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

io = socket(server);

io.on('connection', (socket) => {
    socket.on('SEND_MESSAGE', function(data){
        console.log(data)
         io.emit('RECEIVE_MESSAGE', data);
    })
});