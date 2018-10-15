var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var server_funcs = require('./server_funcs')

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index_server.html');
});

var numberOfPlayers;
var userDict = {};
var userCardDict = {};
var nonBuriedCards = {};
var buriedCards = {};
var didntSendCards = true;
var disconnectDict = {};


io.on('connection', function(socket){

//  *****Initial Game Play Starting Functions*****

  socket.on('gameLobby', function(userName) {
    io.to(socket.id).emit('acceptUser', true)
    if (didntSendCards) {
      userConnectionCheck()
    } else if (disconnectDict[userName]) {
      oldCard = server_funcs.popFromDict(disconnectDict, userName)
      userCardDict[socket.id] = oldCard
      userDict[socket.id] = userName
      io.to(socket.id).emit('startGame', [oldCard, userDict])
    }
  })

  function userConnectionCheck() {
    userDict = {};
    io.emit('userConnectionCheck', true)
  }

  socket.on('userConnectionCheck', function(userName){
    userDict[socket.id] = userName
    console.log(`user ${userName} (${socket.id}) is connected`)
    console.log(`user dict is now ${JSON.stringify(userDict)}`)
    checkGameStart(userDict)
  })

  function checkGameStart(currentUserDict) {
    userSockets = Object.keys(currentUserDict)

    if (numberOfPlayers == userSockets.length && didntSendCards){
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
    numberOfPlayers = da_data.numberOfPlayers;
    nonBuriedCards = server_funcs.shuffle(da_data.cards)
    buriedCards = server_funcs.shuffle(da_data.buriedCards)

    if (Object.keys(nonBuriedCards).length > 0) {
      socket.emit('confirmDataReceived', true)
    }
  });


//  *****Swap User card functions*****

  socket.on('getUserDict', function(){
    io.to(socket.id).emit('currentUserDict', userDict)
  })

  socket.on('swapWithUser', function(userSocket){
    cardInfo = [socket.id, userCardDict[socket.id]]
    io.to(userSocket).emit('cardSwapRequest', cardInfo)
  })

  socket.on('swapAccept', function(userCardInfo){
    userCardDict[socket.id] = userCardDict[userCardInfo[0]]
    userCardDict[userCardInfo[0]] = userCardInfo[1]
    io.to(userCardInfo[0]).emit('swapAccept', userCardInfo[1])
  })


//  *****Disconnecting*****

  socket.on('disconnect', function(){
    userSocket = socket.id
    console.log('\n' + `user ${userDict[userSocket]} is disconnecting`)

    disconnectedCard = server_funcs.popFromDict(userCardDict, userSocket)
    disconnectedUsername = userDict[userSocket]
    disconnectDict[disconnectedUsername] = disconnectedCard
    delete userCardDict[userSocket]
    delete userDict[userSocket]

    if (Object.keys(userDict).length == 0){
      numberOfPlayers = 0
      didntSendCards = true;
      disconnectDict = {}
    }
  })

  socket.on('disconnectAll', function(){
    io.emit('forceDisconnect', true)

    numberOfPlayers;
    userDict = {};
    userCardDict = {};
    infoDict = {};
    nonBuriedCards = {};
    buriedCards = {};
    didntSendCards = true;
    disconnectDict = {};

    console.log('Force Disconnected everyone')
  })
  
});

http.listen(6969, function(){
    console.log('listening on *:6969\n');
});