var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);

app.get('/', (request, respond) => {
  respond.send("Server respond");
});

http.listen(4000, function() {
    console.log("Listening on 4000");
});