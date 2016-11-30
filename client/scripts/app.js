// YOUR CODE HERE:
$(document).ready(function() {
  app.friends = [];
  app.server = 'https://api.parse.com/1/classes/chatterbox',
  app.init();
  _.once(app.fetch());
  app.renderRoom('NewRoom');

  $('#NewRoom').on('click', function(event) {
    event.preventDefault();
    console.log('new room');
    var room = prompt('room name?');

    app.renderRoom(room);
  });

});

var app = {};

app.roomname = 'lobby';

app.init = function() {

  $('#send .submit').on('submit', app.handleSubmit);

  $('#send .submit').on('click', function(event) {
    event.preventDefault();
    var text = $('#message').val();
    $('#message').val();
    app.handleSubmit(text);
  });

  $('#send .submit').keypress(function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      var text = $('#message').val();
      $('#message').val();
      app.handleSubmit(text);
    }
  });
};

app.rooms = [];
app.send = function(message) {

    // $.post('https://api.parse.com/1/classes/messages', JSON.stringify(message))

  $.ajax({
    type: 'POST',
    url: 'https://api.parse.com/1/classes/messages',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      app.clearMessages();
      app.fetch();
    },
    error: function() {
      alert('failure');
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: {
      order: '-createdAt'
    },
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      console.log('chatterbox: Messages received');
      // Clear and add all messages again
      app.clearMessages();
      _.each(data.results, function (message) {
        app.renderMessage(message);
        app.renderRoom(message.roomname);
      });
    },
    error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive messages');
    }
  });
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.handleUsernameClick = function(username) {
  console.log('username handled!');
  this.friends.push(username);
  $('#friends').append('<div class="friend">' + username + '<div>');
  app.fetch();
};

app.renderMessage = function (message) {
  $('#chats').append($('<div>')
        .prepend($(`<span>${message.username}: </span>`)
          .attr('class', 'username')
          .on('click', function(event) {
            // event.preventDefault();
            console.log('user clicked!');
            app.handleUsernameClick(message.username);
            $(`.${message.username}`).css('font-weight', 'bold');
          })
          )
  .append(`<span>${message.text}</span>`).attr('class', app.roomname).attr('class', message.username));
};



var Mel = {
  username: 'Mel Brooks',
  text: 'FUCKAROO DOLPHIN',
  roomname: 'lobby'
};

// app.renderMessage(Mel);

app.renderRoom = function(roomName) {
  $('#roomSelect')
    .append($('<div>')
    .text(roomName)
    .attr('id', `${roomName}`)
    .on('click', function(event) {
      // event.preventDefault();
      app.clearMessages();


    }));

  // if(!_.contains(app.rooms, roomName) && roomName != undefined) {
  //   app.rooms.push(roomName);
  //   $('#roomSelect').append('<div>').attr('class', `${roomName}`).text(`${roomName}`);
  // }
};

$('.dropbutton').on('click', function(event) {
  console.log('clicking?');
  event.preventDefault();
  // console.log(document.getElementById('roomSelect').classList.toggle('show'));
  document.getElementById('roomSelect').classList.toggle('show');
});

app.handleSubmit = function(text) {

  var username = window.location.search.slice(10);

  var message = {
    username: username,
    text: text,
    roomname: app.roomname
  };
  app.renderMessage(message);
  app.send(message);

};





  // $('.username').on('click', function() {
  //   $('this').handleUsernameClick();
  // });

  // app.renderRoom("Connor & Brendan's Room!");
