let socket = io();//this one starts the polling in client side

socket.on('connect',function(){
  console.log(socket.id,' is connected to server');
})

socket.on('disconnect',function(){
  console.log(socket.id,' is disconnected from server');
})

socket.on('newMessage',function(message){
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, { //render is like compile
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
})

socket.on('newLocationMessage', function(message){
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, { //render is like compile
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
})

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  let messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage',{
    from: 'User',
    text: messageTextBox.val()
  }, function(){
    messageTextBox.val('')
  })
})

let locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  locationButton.attr('disabled',true).text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position){
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    locationButton.removeAttr('disabled').text('Send location');
  }, function(e){
    console.log(e);
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Send location');
  })

})
