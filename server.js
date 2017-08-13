var dotenvLoad = require('dotenv').load;
const env = dotenvLoad({ path: '.env' }).parsed || process.env

var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);

var port = env.PORT || 3000;

let socketArray = [];

io.on('connection', (socket) => {
  socket.on('new_player', (playerId) => {
    socketArray.push(socket);
    if(socketArray.length === 2) {
      socketArray[0].emit('player_move');
    } else {
      socket.emit('wait');
    }
  });

  socket.on('move', (state) => {
    io.emit('state', state);
    let _socket = socketArray.filter(s => s.id !== socket.id)[0];
    if(_socket) {
      _socket.emit('player_move');
    } else {  // if someone breaks js on frontside
      socket.emit('wait');
    }
  });

  socket.on('disconnect', () => {
    io.emit('reset');
    socketArray = socketArray.filter(s => s.id !== socket.id);
  });
});

io.listen(port);