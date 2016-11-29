// YOUR CODE HERE:
$(document).ready(function() {

  app.init();

});


var app = {};

var helperObject = {
  roomname: 'main-chat',
};

app.init = function() {

  $('#send').on('click', function(event) {
    event.preventDefault();
    var text = $('#message').val();
    $('#message').val();

    app.handleSubmit(text);

  });

  app.rooms = [];
  app.send = function(message) {

    // $.post('https://api.parse.com/1/classes/messages', JSON.stringify(message))

    $.ajax({
      type: 'POST',
      url: 'https://api.parse.com/1/classes/messages',
      data: JSON.stringify(message),
      success: function() {
        alert('success');
      },
      error: function() {
        alert('failure');
      },
      dataType: 'jsonp'
    });
    this.renderMessage(message);
  };

  app.fetch = function() {
    $.ajax({
      type: 'GET'
      // url: 'https://api.parse.com/1/classes/messages'
    });
  };

  app.clearMessages = function() {
    $('#chats').empty();
  };

  app.renderMessage = function (message) {
    $('#chats').append($('<div>')
      .append($(`<span>${message.username}: </span>`).attr('id', `${message.username}`))
        .append(`<span>${message.text}</span>`).attr('class', helperObject.roomname));
  };

  var Mel = {
    username: 'Mel Brooks',
    text: 'FUCKAROO DOLPHIN',
    roomname: 'lobby'
  };

  app.renderMessage(Mel);

  app.renderRoom = function(roomName) {
    $('#roomSelect')
      .append($('<div>')
      .text(roomName)
      .attr('id', `${roomName}`)
      .on('click', function(event) {
        event.preventDefault();

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
      roomname: helperObject.roomName
    };

    app.send(message);

  };

  app.handleUsernameClick = function() {

  };

  $('.username').on('click', function() {
    $('this').handleUsernameClick();
  });

  // app.renderRoom("Connor & Brendan's Room!");

};
