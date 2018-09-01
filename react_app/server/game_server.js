var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var shuffle = require('./server_const');

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index_server.html');
});

var connectionCount = 0;
var numberOfPlayers;
var cardDeck = {};
var userCount = 0;

io.on('connection', function(socket){
userCount++;
console.log('a user connected, the count is now:' + userCount)
  socket.on('gameLobby', function() {
      connectionCount++;
      console.log('connection count is now: ' + connectionCount)
      if (connectionCount == numberOfPlayers) {
        var count = 0;
        for (var sock in io.sockets.sockets) {
            io.to(sock).emit('gameServer', cardDeck[count])
            count++;
        }
      }
  })
  socket.on('deckData', function(msg){
    connectionCount++;
    numberOfPlayers = msg.numberOfPlayers;
    cardDeck = shuffle.shuffle(msg.cards)
  });
  socket.on('disconnect', function(){
    connectionCount --;
    userCount--;
    if (connectionCount < 0) {
      connectionCount = 0
    }
    console.log('A user disconnected, count is now:' + userCount)
    console.log('connection count is now: ' + connectionCount)
  })
});

http.listen(6969, function(){
    console.log('listening on *:6969');
});