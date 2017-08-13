var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);

var port = process.env.PORT || 4000;

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

http.listen(port, () => {
  console.log('Listening on port '+ port);
});