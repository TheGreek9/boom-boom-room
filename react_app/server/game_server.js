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
var userDict = {};

io.on('connection', function(socket){
connectionCount++;
  socket.on('gameLobby', function(userName) {
      userCount++;
      userDict[userName] = socket.id
      console.log(`User ${userName} is now connected, connection count is now: ${connectionCount}`)
      if (connectionCount == numberOfPlayers) {
        var count = 0;
        for (var sock in io.sockets.sockets) {
            io.to(sock).emit('gameServer', cardDeck[count])
            count++;
        }
      }
  })

  socket.on('deckData', function(msg){
    numberOfPlayers = msg.numberOfPlayers;
    cardDeck = shuffle.shuffle(msg.cards)
  });

  socket.on('disconnect', function(){
    connectionCount --;
    userCount--;
    connectionCount = connectionCount < 0 ? 0 : connectionCount
    userCount = userCount < 0 ? 0 : userCount
  })
  
});

http.listen(6969, function(){
    console.log('listening on *:6969  hehehe');
});