var socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function (event) {
    document.getElementById("header").innerHTML = event.data;
};
socket.onopen = function () {
    let msg = [document.getElementById("board"), board_arr] 
    socket.send(msg);
};
