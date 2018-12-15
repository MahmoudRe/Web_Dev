const socket = new WebSocket("ws://localhost:3000");
let playerName = "new";
let oneTimeAccess = true;
let wsTurn = false;

/***** WORNING: to modifie later if there is another cookie *****/
let sessionID = document.cookie.split("=")[1];


socket.onmessage = function (event) {
    document.getElementById("gameState").innerHTML = event.data;
    
    // the structure [sessionID, comand, piece_id, x_new, y_new]
    let msgs = JSON.parse(event.data);

    if (oneTimeAccess) {
        playerName = msgs[0];
        document.getElementById("p1_name").innerHTML = playerName;

        wsTurn = msgs[1];
        oneTimeAccess = false;
        console.log("player name has been decleared");
    }

    if (msgs[1] == "mov") {
        setMov(msgs[2], msgs[3], msgs[4]);
    
    } else if (msgs[1] == "reset") {
        reomveAllPieces();
        whiteTurn = true;
        start();
    
    } else if (msgs[1] == "close") {
        alert("the rival quit the game, you win!!");
        window.location.href = 'splash.html';
    
    } else {

    }
    
};

socket.onopen = function () {
    socket.send(JSON.stringify(["sessionID", sessionID]));
};
