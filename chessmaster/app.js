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

var p1 = null;
var p2 = null;

wss.on("connection", function(ws) {
  if ( p1 == null ) { p1 = ws; return; }
  if ( p2 == null ) { p2 = ws; return; }
  
  console.log("[LOG]" + "two players are connected");
});

function sendMov () {
  if ((p1 != null) && (p2 != null)) {
    p1.onmessage = (msg) => {
      console.log(msg);
      // const board_arr2 = JSON.parse(msg)[0] documetn;
      ws.send("server massege");
    
      const board_div =  JSON.parse(msg)[1];
      // document.getElementById("board").innerHTML = board_div;
    };
  }
}

server.listen(port);

