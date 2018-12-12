var Game = require("./game");

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

var games_arr = []; //property websocket, value:game
var gameID = 0;


games_arr.push(new Game (gameID));

wss.on("connection", function(ws) {

  if (games_arr[gameID].getGameState() < 2) {
      games_arr[gameID].addPlayer(ws, "new player");
  } else {
      games_arr.push(new Game (++gameID));
      console.log(`--[NEW GAME] new game is created, gameID = ${gameID}`);
      games_arr[gameID].addPlayer(ws, "new player");
  }

  if (games_arr[gameID].getGameState() == 2) { 
    ws.send("game started");

  } else {
    ws.send("waiting for other player ...");
  }

  ws.on("message", function incoming(message) {
    
    let playerName = JSON.parse(message)[0];
    console.log("LOG: " + message);
    games_arr[gameID].getOtherWS(playerName).send(message);
    console.log(playerName);
    });
});

server.listen(port);


