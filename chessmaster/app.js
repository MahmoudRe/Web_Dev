const Game = require("./game");

const express = require("express");
const http = require("http");
const websocket = require("ws");

const indexRouter = require("./routes/index");
const cookieParser = require('cookie-parser');

const port = process.argv[2];
const app = express();

app.use(express.static(__dirname + "/public"));

app.use(cookieParser()); //in order to read cookies

app.get("/", indexRouter);
app.get("/game", indexRouter);

const server = http.createServer(app);
const wss = new websocket.Server({ server });

var games_arr = []; //property websocket, value:game
var gameID = 0;
games_arr.push(new Game(gameID));

//stastic variabels
var gamesInitialized = 0;
var playerOnline = 0;
var checkMate = 0;


wss.on("connection", function(ws) {

    ws.on("message", function incoming(message) {

        //*  THE MSG FROM SPLASH.HTML WHEN PLAYER HIT "START"  *//
        //     msg = [splash, sessionID, playerName, skill]     //
        //          >>> add new player to the game <<<          //
        if (message.includes("splash")) {
            let msg = JSON.parse(message);
            playerOnline++;

            if (games_arr[gameID].gameState == 0) {
                games_arr[gameID].addPlayer(ws, msg[1], msg[2], msg[3]);
                ws.send("Waiting for an opponent ...");

            } else if (games_arr[gameID].gameState == 1) {

                // check if the same player has pressed the btn again!
                if (msg[1] !== games_arr[gameID].session_w) {

                    console.log("The game is started!!");
                    games_arr[gameID].addPlayer(ws, msg[1], msg[2], msg[3]);
                    ws.send("start");
                    games_arr[gameID].getOtherByWS(ws).send("start");

                } else {
                    ws.send("Still waiting for an opponent ...");
                }

            } else if (games_arr[gameID].gameState == 2) {
                console.log(`--[NEW GAME] new game is created, gameID = ${gameID}`);
                games_arr.push(new Game(++gameID));
                games_arr[gameID].addPlayer(ws, msg[1], msg[2], msg[3]);

                gamesInitialized++;
            }
        }

        //**      THE FIRST MSG FROM GAME.HTML WHEN PAGE LOAD      **//
        //              msg = ["sessionID", sessionID]               //
        //     >>> identify this player and send players info <<<    //
        else if (message.includes("sessionID")) {
            let sessionID = JSON.parse(message)[1];

            if (games_arr[gameID].isWhite(sessionID)) {

                //reassign to the new websocket (ws for game.html)
                games_arr[gameID].white_ws = ws;
                console.log("white_ws has been updated");

                //send this player's name, the 2nd player name's and the turn
                //to presive the uniform structure of msg, we set the comand in the msg[1]
                ws.send(JSON.stringify(["", "info", games_arr[gameID].plyr_w, games_arr[gameID].plyr_b, true]));

            } else {
                games_arr[gameID].black_ws = ws;
                console.log("black_ws has been updated");

                //send this player's name, the 2nd player's name and the turn
                ws.send(JSON.stringify(["", "info", games_arr[gameID].plyr_b, games_arr[gameID].plyr_w, false]));

                games_arr[gameID].gameState++; // gameState = 3, the game started
            }
        }

        //***  THE MSG FROM GAME.HTML WHEN PLAYER MAKE MOV  ***//
        //      msg = [sessionID, piece-id, x_new, y_new]      //
        //   >>> RESEND THIS MESSAGE TO THE OTHER PLAYER <<<   //
        else {

            let sessionID = JSON.parse(message)[0];
            games_arr[gameID].getOtherWS(sessionID).send(message);

            console.log("LOG: " + message);
        }
    });

    ws.on("close", function() {

        checkMate++;
        playerOnline--;

        let msg = JSON.stringify(["", "close"]); // let the other player know of closing
        if (games_arr[gameID].gameState == 3) {
            games_arr[gameID].getOtherByWS(ws).send(msg);
            games_arr[gameID].gameState--;
        } else if (games_arr[gameID].gameState == 1) {
            // if there was just one player make this gameState = 2
            // therefore new players will begin new game according to game logic above
            games_arr[gameID].gameState++;

        }

        console.log("the game closed succesfully, ws_state= " + ws.readyState);
    });
});

server.listen(port);