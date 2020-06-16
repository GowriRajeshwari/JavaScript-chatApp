var express = require('express');
var socket = require('socket.io');
require('dotenv').config();
//  console.log(process.env);
var app = express();

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