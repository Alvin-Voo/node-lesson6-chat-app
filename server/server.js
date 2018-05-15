const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.json());

app.use(express.static(path.join(__dirname,'../public/')));
// app.get('/',(req,res)=>{
//   res.sendFile(path.join(__dirname,'../public/index.html'));
// })

io.on('connection',(socket)=>{ //socket is from client
  console.log('New user connected: ',socket.id);

  socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));

  socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback)=>{
    console.log(socket.id,' create Message ',message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback('balalal');
  })

  socket.on('disconnect', ()=>{
    console.log(socket.id+' Disconnected ');
  })
})

server.listen(port, ()=>{
  console.log('started on port '+ port);
});
