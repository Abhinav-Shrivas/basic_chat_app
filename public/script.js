var socket = io();

let msgSent = document.getElementById('msgSent');
let btn = document.getElementById('btn');
let msgRcvd = document.getElementById('msgRcvd');

btn.onclick = function exec (){
    socket.emit('send msg',{
    msg : msgSent.value
})
}

socket.on('message received',(data)=>{
    let lstMsg = document.createElement('li');
    lstMsg.innerText = data.msg;
    msgRcvd.appendChild(lstMsg);
})