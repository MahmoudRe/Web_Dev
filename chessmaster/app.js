var express = require("express");
var http = require("http");
var websocket = require("ws");

var indexRouter = require("./routes/index");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", indexRouter);
app.get("/game", indexRouter);

var server = http.createServer(app);
const wss = new websocket.Server({server});

wss.on("connection", function(ws) {

  setTimeout(function() {
    ws.send("thanks for the message. --Your server.");
    ws. close();
  }, 7000);

  ws.on("message", function incoming(message) {
    console.log("[LOG]" + message);
  });
});

ws.onmessage = (msg) => {
  const message = JSON.parse(msg.data);
}

server.listen(port);

