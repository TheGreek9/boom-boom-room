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
var userCardDict = {};
var infoDict = {};

io.on('connection', function(socket){
connectionCount++;
  socket.on('gameLobby', function(userName) {
    console.log(`user ${userName} connected`)
      userCount++;
      userDict[userName] = socket.id
      if (userCount == numberOfPlayers) {
        var count = 0;
        for (var sock in io.sockets.sockets) {
            userCardDict[sock] = cardDeck[count]
            infoDict['userDict'] = userDict
            if (nonBuriedCards.length > 0){
              infoDict['cardDeck'] = nonBuriedCards.pop()
            } else {
              infoDict['cardDeck'] = buriedCards.pop()
            }

            io.to(sock).emit('gameServer', infoDict)
            count++;
        }
      }
  })

  socket.on('deckData', function(da_data){
    userCount++
    numberOfPlayers = da_data.numberOfPlayers;
    nonBuriedCards = shuffle.shuffle(da_data.cards)
    buriedCards = shuffle.shuffle(da_data.buriedCards)
  });

  socket.on('swapWithUser', function(userSocket){
    cardInfo = [socket.id, userCardDict[socket.id]]
    io.to(userSocket).emit('cardSwapRequest', cardInfo)
  })

  socket.on('swapAccept', function(userCardInfo){
    userCardDict[socket.id] = userCardDict[userCardInfo[0]]
    userCardDict[userCardInfo[0]] = userCardInfo[1]
    io.to(userCardInfo[0]).emit('swapAccept', userCardInfo[1])
  })

  socket.on('disconnect', function(){
    connectionCount --;
    userCount--;
    connectionCount = connectionCount < 0 ? 0 : connectionCount
    userCount = userCount < 0 ? 0 : userCount
    if (userCount == 0){
      userDict = {}
    }
  })
  
});

http.listen(6969, function(){
    console.log('listening on *:6969');
});