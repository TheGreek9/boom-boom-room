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
var userDict = {
    'Maddie': '1',
    'Michael': '2',
    'Andrew': '3',
    'Lindsey': '4',
    'Warren': '5',
    'Emily': '1',
    'Brian': '2',
    'Lexy': '3',
    'Sean': '4',
    'Jaclyn': '5',
    'Leah': '1',
    'Terrance': '2',
    'Jessica': '3',
    'Gaby': '4',
    'Darren': '5',

};
var infoDict = {};

io.on('connection', function(socket){
connectionCount++;
  socket.on('gameLobby', function(userName) {
      userCount++;
      // userDict[userName] = socket.id
      console.log(`User ${userName} is now connected, user count is now: ${userCount}
        and number of players is ${numberOfPlayers}`)
      if (userCount == numberOfPlayers) {
        var count = 0;
        for (var sock in io.sockets.sockets) {
            infoDict['userDict'] = userDict
            infoDict['cardDeck'] = cardDeck[count]
            io.to(sock).emit('gameServer', infoDict)
            count++;
        }
      }
  })

  socket.on('deckData', function(msg){
    userCount++
    numberOfPlayers = msg.numberOfPlayers;
    cardDeck = shuffle.shuffle(msg.cards)
    console.log(`Deck data sent, number of players is ${numberOfPlayers}`)
  });

  socket.on('disconnect', function(){
    connectionCount --;
    userCount--;
    connectionCount = connectionCount < 0 ? 0 : connectionCount
    userCount = userCount < 0 ? 0 : userCount
    console.log(`A user disconnected, userCount is now ${userCount}`)
  })
  
});

http.listen(6969, function(){
    console.log('listening on *:6969');
});