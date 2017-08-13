var dotenvLoad = require('dotenv').load;
const env = dotenvLoad({ path: '.env' }).parsed || process.env

var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);

var port = env.PORT || 3000;

io.on('connection', (socket) => {
  socket.on('move', (state) => {
    io.emit('state', state);
  });
});

io.listen(port);