const socket = new WebSocket("ws://localhost:3000");
let playerName = "You";
let otherPlayerName = "Someone!";
let wsTurn = false;

/***** WORNING: this will not working if there is another cookie *****/
let sessionID = document.cookie.split("=")[1];


socket.onmessage = function(event) {
    let gameState = document.getElementById("gameState");
    let log = document.createElement("LI");
    let text = document.createTextNode(event.data);

    gameState.removeChild(gameState.firstChild);

    log.appendChild(text);
    gameState.appendChild(log);



    let msgs = JSON.parse(event.data);

    if (msgs[1] == "mov") { // msg = [sessionID, comand, piece_id, x_new, y_new]
        setMov(msgs[2], msgs[3], msgs[4]);


    } else if (msgs[1] == "reset") { // msg = ["", comand]
        reomveAllPieces();
        whiteTurn = true;
        start();


    } else if (msgs[1] == "info") {
        playerName = msgs[2];
        document.getElementById("p1_name").innerHTML = playerName;

        playerName = msgs[3];
        document.getElementById("p2_name").innerHTML = playerName;

        wsTurn = msgs[4];


    } else if (msgs[1] == "close") { // msg = ["", comand]
        alert("the rival quit the game, you win!!");
        window.location.href = 'splash.html';

    } else {}
};

socket.onopen = function() {
    socket.send(JSON.stringify(["sessionID", sessionID]));
};