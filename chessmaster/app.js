const Game = require("./game");

const express = require("express");
const http = require("http");
const websocket = require("ws");

const indexRouter = require("./routes/index");
const cookieParser = require('cookie-parser');

const port = process.argv[2];
const app = express();

app.use(express.static(__dirname + "/public"));

app.use(cookieParser());    //in order to read cookies

app.get("/", indexRouter);
app.get("/game", indexRouter);

const server = http.createServer(app);
const wss = new websocket.Server({ server });

var games_arr = []; //property websocket, value:game
var gameID = 0;
games_arr.push(new Game(gameID));


wss.on("connection", function (ws) {

  ws.on("message", function incoming(message) {

    if (message.includes("splash")) {
      let msg = JSON.parse(message);

      if (games_arr[gameID].gameState == 0) {
        // msg structue [splash, sessionID, playerName, skill]
        games_arr[gameID].addPlayer(ws, msg[1], msg[2], msg[3]);
        ws.send("waiting for other player ...");

      } else if (games_arr[gameID].gameState == 1) {
        console.log("the game started!!");
        games_arr[gameID].addPlayer(ws, msg[1], msg[2], msg[3]);
        ws.send("start");
        games_arr[gameID].getOtherByWS(ws).send("start");

      } else if (games_arr[gameID].gameState == 2) {
        console.log(`--[NEW GAME] new game is created, gameID = ${gameID}`);
        games_arr.push(new Game(++gameID));
        games_arr[gameID].addPlayer(ws, msg[1], msg[2], msg[3]);
      }
    } else if (message.includes("sessionID")) {
      let sessionID = JSON.parse(message)[1];
      if (games_arr[gameID].isWhite(sessionID)) {
        games_arr[gameID].white_ws = ws;
        console.log("white_ws has been updated");
      } else {
        games_arr[gameID].black_ws = ws;
        console.log("black_ws has been updated");
      }
    } else {
      console.log("gamestate: " + ws.readyState);
      let sessionID = JSON.parse(message)[0];
      // msg structure [sessionID, piece-id, x_new, y_new]
      console.log("LOG: " + message);
      games_arr[gameID].getOtherWS(sessionID).send(message);
    }
  });

  ws.on("close", function () {
    console.log("closed: " + ws.readyState);
    if (games_arr[gameID].gameState == 2) {
      // games_arr[gameID].getOtherByWS(ws).send([sessionID, "close"]);
      // gameState = -1;
    }
    // games_arr[gameID].getOtherByWS(ws).close();
  });
});

server.listen(port);


