var socket = io();

let btn = document.getElementById('btn');
btn.onclick = function exec (){
    socket.emit('from client');
}

socket.on('from server',()=>{
    const div = document.createElement('div');
    div.innerText = "New event created";
    document.body.appendChild(div);
})