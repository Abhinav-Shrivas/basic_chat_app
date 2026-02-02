const express = require ('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{
    console.log("a user is connected");
    socket.on('send msg', (data)=>{
        console.log(data);
        io.emit("message received",data);
    })
})

app.use('/',express.static(__dirname + '/public'));

server.listen(3000,()=>{
    console.log("server started at port 3000");
})