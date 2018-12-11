/* every game has two players, identified by their WebSocket */
var game = function (gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;

    // Game state: 
    // 0 no game, 1 there is player , 2 there is 2 players, -1 the game was aborted
    this.gameState = 0;
};


// game.prototype.hasTwoConnectedPlayers = function () {
//     return (this.gameState == 2);
// };

// game.prototype.setStatus = function (w) {

//     console.assert(typeof w == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof w);

//     if (game.prototype.isValidState(w) && game.prototype.isValidTransition(this.gameState, w)) {
//         this.gameState = w;
//         console.log("[STATUS] %s", this.gameState);
//     }
//     else {
//         return new Error("Impossible status change from %s to %s", this.gameState, w);
//     }
// };

// game.prototype.addPlayer = function (p) {

//     console.assert(p instanceof Object, "%s: Expecting an object (WebSocket), got a %s", arguments.callee.name, typeof p);

//     if (this.gameState != 0 && this.gameState != 1) {
//         return new Error("Invalid call to addPlayer, current state is %s", this.gameState);
//     }

//     /*
//      * revise the game state
//      */ 
//     if (this.playerA == null) {
//         this.playerA = p;
//         return "A";
//     }
//     else {
//         this.playerB = p;
//         return "B";
//     }
// };

// module.exports = game;