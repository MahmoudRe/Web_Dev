var socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function (event) {
    document.getElementById("header").innerHTML = event.data;
};
socket.onopen = function () {
    socket.send("Hello from the client!");
    document.getElementById("header").innerHTML = "Sending a first message to the server ...";
};

