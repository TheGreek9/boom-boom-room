var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var server_funcs = require('./server_funcs')

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index_server.html');
});

var numberOfPlayers;
var cardDeck = {};
var userCount = 0;
var userDict = {};
var userCardDict = {};
var infoDict = {};
var nonBuriedCards = {};
var buriedCards = {};

var didntSendCards = true;

io.on('connection', function(socket){

  socket.on('userConnectionCheck', function(userName){
    userDict[socket.id] = userName
    console.log('\n' + `user ${userName} (${socket.id}) is connected, and numberOfPlayers is ${numberOfPlayers}`)
    checkGameStart(userDict)
  })

  socket.on('gameLobby', function(userName) {
    userConnectionCheck()
  })

  function userConnectionCheck() {
    var userDict = {};
    io.emit('userConnectionCheck', true)
  }

  function checkGameStart(currentUserDict) {
    userSockets = Object.keys(currentUserDict)

    if (numberOfPlayers == userSockets.length && didntSendCards){
      console.log('**Sending users Cards')
      didntSendCards = false;

      dealOutCards(userSockets, currentUserDict)

    }
  }

  function dealOutCards(userSockets, currentUserDict){
    for (s in userSockets) {
        if (nonBuriedCards.length > 0){
          nextCard = nonBuriedCards.pop()
        } else {
          nextCard = buriedCards.pop()
        }
        sock = userSockets[s]
        userCardDict[sock] = nextCard

        io.to(sock).emit('startGame', [userCardDict[sock], currentUserDict])
    }
  }

  socket.on('deckData', function(da_data){
    console.log('\n' + `da deck data is ${JSON.stringify(da_data)}` + '\n')
    numberOfPlayers = da_data.numberOfPlayers;
    nonBuriedCards = server_funcs.shuffle(da_data.cards)
    buriedCards = server_funcs.shuffle(da_data.buriedCards)
    if (Object.keys(nonBuriedCards).length > 0) {
      socket.emit('confirmDataReceived', true)
    }
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
    userSocket = socket.id
    console.log('\n' + `user ${userDict[userSocket]} is disconnecting`)
    console.log(`-- about to delete socket id ${userSocket}`)
    delete userDict[userSocket]
    delete userCardDict[userSocket]
    console.log(`-- user dict is ${JSON.stringify(userDict)} and card dict is ${JSON.stringify(userCardDict)}`)
    if (Object.keys(userDict).length == 0){
      numberOfPlayers = 0
      didntSendCards = true;
    }
  })
  
});

http.listen(6969, function(){
    console.log('listening on *:6969');
});