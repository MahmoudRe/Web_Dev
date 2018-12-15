const socket = new WebSocket("ws://localhost:3000");
let playerName = "new";
let skill = "Intermediate";

const in_name = document.getElementById("in_name");
const in_skill = document.getElementById("in_skill");
const gm_start = document.getElementById("gm_start");

let sessionID = document.cookie.split("=")[1];

in_name.addEventListener("change", () => {
    playerName = in_name.value;
});

in_skill.addEventListener("change", () => {
    skill = in_skill.value;
});

gm_start.addEventListener("click", () => {
    let msg = JSON.stringify(["splash", sessionID, playerName, skill]);
    socket.send(msg);
});

socket.onmessage = function (event) {
    document.getElementById("gameState").innerHTML = event.data;

    if (event.data == "start") {
        window.location.replace("game.html");
    }
};

// socket.onopen = function () {
//     let msg = "splash";
//     socket.send(msg);
// };
