var dotenvLoad = require('dotenv').load;
const env = dotenvLoad({ path: '.env' }).parsed || process.env

var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);

var port = env.PORT || 3000;

app.get('/', (request, respond) => {
  respond.send("Server respond");
});

io.on('connection', function(socket){
  console.log('User connected');
});

http.listen(port, function() {
    console.log('Listening on ' + port);
});