var dotenvLoad = require('dotenv').load;
const env = dotenvLoad({ path: '.env' }).parsed || process.env

var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);

var port = env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('move', (player, cordinates) => {
    console.log(player, cordinates);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

});

io.listen(port);