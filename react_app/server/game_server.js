var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index_server.html');
});

var connection_count = 0;

io.on('connection', function(socket){
  console.log('A new user is connected');
  socket.on('gameServer', function(msg){
    console.log('message: ' + JSON.stringify(msg));
    io.emit('gameServer', JSON.stringify(msg, null, '  '));
  });
});

http.listen(6969, function(){
    console.log('listening on *:6969');
});