const express = require ('express');
const http = require('http');
const socketio = require('socket.io');
const connect = require('./config/database-config');
const Chat = require('./models/chat')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{

    socket.on('join_room', (data)=>{
        socket.join(data.roomid);
    });
    socket.on('send_msg', async(data)=>{
        const chat = await Chat.create({
            content : data.msg,
            user : data.username,
            roomid: data.roomid
        });
        io.to(data.roomid).emit("message_received",data);
    });
    socket.on('typing',(data)=>{
        socket.broadcast.to(data.roomid).emit('someoneTyping',data);
    })
})
app.set('view engine', 'ejs');
app.use('/',express.static(__dirname + '/public'));

app.get('/chat/:roomid',async(req,res)=>{
    const chats = await Chat.find({
        roomid : req.params.roomid
    }).select('content user');
    res.render('index',{
        name : "Ab",
        id : req.params.roomid,
        chats : chats
    })
});

server.listen(3000,async()=>{
    console.log("server started at port 3000");
    await connect();
    console.log("mongodb connected");
})