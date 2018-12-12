var socket = new WebSocket("ws://localhost:3000");
let playerName = "new";
let oneTimeAccess = true;

socket.onmessage = function (event) {
    document.getElementById("header").innerHTML = event.data;
    let msgs = JSON.parse(event.data);

    if (oneTimeAccess) {
        playerName = msgs[0];
        oneTimeAccess = false;
        console.log("player name has been decleared")
    }

    if (msgs[1] == "mov") {
        setMov(msgs[2], msgs[3], msgs[4]);
    }

    if (msgs[1] == "reset") {
        reomveAllPieces();
        whiteTurn = true;
        start();
    }
    
};

// socket.onopen = function () {
//     let msg = "new player connected...";
//     socket.send(msg);
// };
