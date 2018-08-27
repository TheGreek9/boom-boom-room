var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var shuffle = require('./server_const');

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index_server.html');
});

var connection_count = 0;
var socket_count = 0;

io.on('connection', function(socket){
  console.log('A new user is connected');

  socket.on('deck-data', function(msg){
    console.log('message sent from phone');
    io.emit('gameServer', shuffle.shuffle(msg.cards)[0]);
  });

  socket.on('disconnect', function(){
    console.log('a user disconnected');
  })
});

http.listen(6969, function(){
    console.log('listening on *:6969');
});