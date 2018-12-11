(function(exports){

    /* Client to Server: game is complete */
    exports.T_GAME_WON_BY = "GAME-WON-BY";
    exports.O_GAME_WON_BY= {
        type: exports.T_GAME_WON_BY,
        data: null
    };


    /* Server to Client: abprt game */
    exports.O_GAME_ABORTED = {
        type: "GAME-ABORTED"
    };
    exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);

    /* Server to Client: make a move */
    exports.O_MAKE_MOV = { type: "MAKE-MOV" };
    exports.S_MAKE_MOV = JSON.stringify(exports.O_MAKE_MOV);

    /* Server to Client: set as Player A */
    exports.T_PLAYER_TYPE = "PLAYER-TYPE";
    exports.O_PLAYER_A = {
        type: exports.T_PLAYER_TYPE,
        data: "A"
    };
    exports.S_PLAYER_A = JSON.stringify(exports.O_PLAYER_A);

    /* Server to Client: set as Player B */
    exports.O_PLAYER_B = {
        type: exports.T_PLAYER_TYPE,
        date: "B"
    };
    exports.S_PLAYER_B = JSON.stringify(exports.O_PLAYER_B);

    /* A to Server OR server to B: WHITE-TURN */
    exports.T_WHITE_TURN = "WHITE-TURN";
    exports.O_WHITE_TURN = {
        type: exports.T_WHITE_TURN,
        data: null
    };

    /* B to Server OR server to A: BLACK-TURN */
    exports.T_BLACK_TURN = "BLACK-TURN";
    exports.O_BLACK_TURN = {
        type: exports.T_BLACK_TURN,
        data: null
    };


}(typeof exports === "undefined" ? this.Messages = {} : exports));
