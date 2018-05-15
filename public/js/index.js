let socket = io();//this one starts the polling in client side

socket.on('connect',function(){
  console.log(socket.id,' is connected to server');
})

socket.on('disconnect',function(){
  console.log(socket.id,' is disconnected from server');
})

socket.on('newMessage',function(message){
  console.log('New Message', message);
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
})

// socket.emit('createMessage',{
//   from:'dudue',
//   text: '123'
// }, function(data){
//   console.log('got ack ', data);
// })

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  })

})
