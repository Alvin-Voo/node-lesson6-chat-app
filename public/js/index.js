let socket = io();//this one starts the polling in client side

socket.on('connect',function(){
  console.log(socket.id,' is connected to server');
})

socket.on('disconnect',function(){
  console.log(socket.id,' is disconnected from server');
})

socket.on('newMessage',function(message){
  console.log('New Message', message);
})
