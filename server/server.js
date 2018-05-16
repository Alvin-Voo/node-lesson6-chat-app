const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let users = new Users();

app.use(express.json());

app.use(express.static(path.join(__dirname,'../public/')));
// app.get('/',(req,res)=>{
//   res.sendFile(path.join(__dirname,'../public/index.html'));
// })
io.on('connection',(socket)=>{ //socket is from client
  console.log('New user connected: ',socket.id);

  socket.on('join', (params, callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room))
      return callback('Proper name and room required.')

    socket.join(params.room);
    users.removeUser(socket.id);//remove user if (s)he was in other room
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin',`Welcome to the Chat App, Room ${params.room}`));
    socket.broadcast.emit('newMessage',generateMessage('Admin', `${params.name} joined`));

    callback();
  })

  socket.on('createMessage', (message, callback)=>{
    console.log(socket.id,' create Message ',message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback('acknowledge');
  })

  socket.on('createLocationMessage', (position)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',position.latitude,position.longitude));
  })

  socket.on('disconnect', ()=>{
    console.log(socket.id+' Disconnected ');

    let user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room.`))
    }
  })
})

server.listen(port, ()=>{
  console.log('started on port '+ port);
});
