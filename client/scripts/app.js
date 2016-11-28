// YOUR CODE HERE:

var app = {};

app.init = function() {};

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
  $('#chats').append($('<div>').text(message.text));
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append($('<div>').text(roomName));
};


app.handleUsernameClick = function() {

};

$('.username').on('click', function() {
  $('this').handleUsernameClick();
});
