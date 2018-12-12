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



var Game = function (gameID) {
  this.plyr_w = null;
  this.white_ws = null;
  this.plyr_b = null;
  this.black_ws = null;
  this.id = gameID;

  // Game state: 
  // 0 there is no player yet
  // 1 there is one player
  // 2 there is 2 players
  // 3 the game was aborted
  this.gameState = 0;
};

Game.prototype.addPlayer = function (ws, player_name) {
  if (this.white_ws == null) {
      this.white_ws = ws;
      this.plyr_w = "P_W";
      this.gameState++;
      let p_w = JSON.stringify(["P_W"]);
      ws.send(p_w);
      console.log(`[New Player] ${player_name} (white) has connected...`);
      return;
  } else if (this.black_ws == null) {
      this.black_ws = ws;
      this.plyr_b = "P_B";
      let p_b = JSON.stringify(["P_B"]);
      ws.send(p_b);
      console.log(`[New Player] ${player_name} (black) has connected...`);
      this.gameState++;
      return;
  } else {
      console.log(`[Game is Full] ${player_name} cannot connect... `);
  }
};

Game.prototype.getGameState = function () {
  return this.gameState;
};

Game.prototype.getOtherWS = function (player) {
  if (player == this.plyr_w) { return this.black_ws; }
  if (player == this.plyr_b) { return this.white_ws; }
};



games_arr.push(new Game (gameID));

wss.on("connection", function(ws) {

  if (games_arr[gameID].getGameState() < 2) {
      games_arr[gameID].addPlayer(ws, "new player");
  } else {
      games_arr.push(new Game (++gameID));
      console.log(`--[NEW GAME] new game is created, gameID = ${gameID}`);
      games_arr[gameID].addPlayer(ws, "new player");
  }

  ws.on("message", function incoming(message) {
    
    if (games_arr[gameID].getGameState() == 2) { 
      ws.send("game started");

    } else {
      ws.send("waiting for other player ...");
    }
    
    let playerName = JSON.parse(message)[0];
    console.log("LOG: " + message);
    games_arr[gameID].getOtherWS(playerName).send(message);
    console.log(playerName);
    });
});

server.listen(port);


