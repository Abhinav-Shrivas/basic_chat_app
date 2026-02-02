const express = require ('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{
    console.log("a user is connected");

    socket.on('from client', ()=>{
        console.log("event received from client.");
    })

    setInterval(()=>{
        socket.emit("from server");
    },2000);
})

app.use('/',express.static(__dirname + '/public'));

server.listen(3000,()=>{
    console.log("server started at port 3000");
})