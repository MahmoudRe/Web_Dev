var Game = function (gameID) {
  this.white_ws = null;
  this.black_ws = null;

  this.skill_w = null;
  this.skill_b = null;

  this.plyr_w = null;
  this.plyr_b = null;

  this.session_w = null;
  this.session_b = null;
  
  // Game state: 
  // 0 there is no player yet
  // 1 there is one player
  // 2 there is 2 players
  // 3 the game was aborted
  this.gameState = 0;
  this.id = gameID;
};

Game.prototype.addPlayer = function (ws, sessionID, name, skill) {
    if (this.white_ws == null) {
        this.white_ws = ws;
        this.plyr_w = name;
        this.skill_w = skill;
        this.session_w = sessionID;
        this.gameState++;
        console.log(`[New Player] ${name} (white pieces) has connected...`);
        return;
    } else if (this.black_ws == null) {
        this.black_ws = ws;
        this.plyr_b = name;
        this.skill_b = skill;
        this.session_b = sessionID;
        this.gameState++;
        console.log(`[New Player] ${name} (black pieces) has connected...`);
        return;
    } else {
        console.log(`[Game is Full] ${name} cannot connect... `);
    }
  };
  
  Game.prototype.getGameState = function () {
    return this.gameState;
  };

  Game.prototype.isWhite = function (sessionID) {
    if (sessionID === this.session_w) { return true; }
    if (sessionID === this.session_b) { return false; }
    return new Error("sessionID isn't well defiened");
  };
  
  Game.prototype.getOtherWS = function (sessionID) {
    if (sessionID === this.session_w) { return this.black_ws; }
    if (sessionID === this.session_b) { return this.white_ws; }
  };

  Game.prototype.getOtherByWS = function (ws) {
    if (ws === this.white_ws) { return this.black_ws; }
    if (ws === this.black_ws) { return this.white_ws; }
  };
  
module.exports = Game;