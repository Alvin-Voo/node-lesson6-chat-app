let socket = io();//this one starts the polling in client side

function scrollToBottom(){
  //Selectors
  let messages = jQuery('#messages'); //ol#messages
  let newMessage = messages.children('li:last-child');

  //Heights
  let clientHeight = messages.prop('clientHeight');//viewable height of an element in pixels, including padding
  let scrollTop = messages.prop('scrollTop');//scrolled top height of element
  let scrollHeight = messages.prop('scrollHeight');//entire height of element including padding

  let newMessageHeight = newMessage.innerHeight();//element height, including padding
  let lastMessageHeight = newMessage.prev().innerHeight();//get 2nd last message as well

  //The goal is to scroll when user is less than one message apart from reaching the bottom
  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>= scrollHeight){
    messages.scrollTop(scrollHeight);//here just scroll to maximum height
    //If the number is greater than the maximum allowed scroll amount, the number is set to the maximum number
  }

}

socket.on('connect',function(){
  console.log(socket.id,' is connected to server');

  let params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else {
      console.log('No error');
    }
  })
})

socket.on('updateUserList', function(usersList){
  console.log(usersList);

  let template = jQuery('#userslist-template').html();
  let html = Mustache.render(template,{usersList});

  jQuery('#users').empty().append(html);

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
  scrollToBottom();
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
  scrollToBottom();
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
