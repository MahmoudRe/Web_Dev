let checkmate = false;
const board_arr = create2dArray (9,9);

function create2dArray (x_axis, y_axis) {
    let arr = new Array(x_axis);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(y_axis);
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function isEmpty (x_axis, y_axis) {
    return board_arr[x_axis][y_axis] == 0;
}

function pieceToHTML(x, y, pieceType, color) {

    // this function will create a new element and append it to the correspond div
    // in HTML with all the necessary attributes to preform Drag&Drop
    var thisCell = document.getElementById(x + "_" + y);
    var para = document.createElement("P");
    var txt = document.createTextNode(pieceType);
    para.append(txt);
    para.className = color + "_Class";
    para.id = x + "-" + y;
    thisCell.append(para);

    // Drag&Drop attributes
    // draggable → set to true
    // ondragstart → do at the moment drag is preformed
    var att1 = document.createAttribute("draggable");
    att1.value = "true";
    para.setAttributeNode(att1);

    var att2 = document.createAttribute("ondragstart");
    att2.value = "drag(event)";
    para.setAttributeNode(att2);
}

/****** Not used ********/
function pieceCapture(x, y) {
    var thisCell = document.getElementById(x + "_" + y);
    thisCell.removeChild(thisCell.firstChild);
}

// Constructor of the father piece
function ChessPiece (x, y, color) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.color = color; // color => 'B' or 'W'
}

ChessPiece.prototype.getPosition = function() {
    return [this.x, this.y];
};
ChessPiece.prototype.setPosition = function(x,y) {
    temp = board_arr[this.x][this.y];
    board_arr[this.x][this.y] = 0;
    board_arr[x][y] = temp;

    this.x = parseInt(x);
    this.y = parseInt(y);
};
ChessPiece.prototype.isSameColor = function (x, y) {
    
    // As long White represented with positive num Black with negative
    // so the multibication of the same color (sign) should > 0
    // position == 0? → false
    return (board_arr[this.x][this.y] * board_arr[x][y]) > 0;
};
ChessPiece.prototype.diagonallyMov = function(x_new,y_new) {
    let x_change = x_new - this.x;
    let y_change = y_new - this.y;

    //check if the wanted cell exists and located diagonally w.r.t. the old cell
    if ( x_new <= 8 && y_new <= 8 && Math.abs(x_change) == Math.abs(y_change) ) {

        // in case there is a piece in the wanted block, check for color
        // this will check automatically if there is no move (new pos = old pos)
        if (this.isSameColor(x_new, y_new) && !isEmpty(x_new, y_new)) {
            return false;
        }
        
        // cheking if all cells in between are empty
        // all positions in between can be achieved using this formula:
        // pos_between = old + (change - change/abs(change) * i) :∀i < abs(change)
        // i=0 → the new position; i=x_change → the old position
        for (let i = 1; i < Math.abs(x_change); i++) {
            x_between = parseInt(this.x) + (x_change - x_change/Math.abs(x_change)*i);
            y_between = parseInt(this.y) + (y_change - y_change/Math.abs(y_change)*i); 
            
            if(!isEmpty(x_between, y_between)) { return false; }
        }
        return true;
    }
    return false;
};
ChessPiece.prototype.straightlyMov = function(x_new,y_new) {
    let x_change = x_new - this.x;
    let y_change = y_new - this.y;

    if (x_new <= 8 && y_new <= 8 && (x_change === 0 || y_change === 0)) {
        
        // in case there is a piece in the wanted position, check for color
        // this will check automatically if there is no move (new pos = old pos)
        if (this.isSameColor(x_new, y_new)) {
            return false;
        }

        // check if all cells in between are empty
        // i=0 → the new position; i=change → the old position
        if (x_change != 0) {
            for (let i = 1; i < Math.abs(x_change); i++) {
                x_between = parseInt(this.x) + (x_change - x_change/Math.abs(x_change)*i);

                if (!isEmpty(x_between, y_new)) { return false; }
            }
        }

        if (y_change != 0) {
            for (let i = 1; i < Math.abs(y_change); i++) {
                y_between = parseInt(this.y) + (y_change - y_change/Math.abs(y_change)*i);

                if (!isEmpty(x_new, y_between)) { return false; }
            }
        }

        return true;
    }
    return false;
};
ChessPiece.prototype.moveTo = function (x_new, y_new) {
    if (this.allowedMov(x_new, y_new)) {
        board_arr[x_new][y_new] = board_arr[this.x][this.y]
        board_arr[this.x][this.y] = 0;
    } else {
        alert("not allowed movement");
    }
};

///////////////////// CHECK THE TURN ///////////////////////
let whiteTurn = true;
ChessPiece.prototype.allowedTurn = function () {
    if (whiteTurn && this.color == 'W') {
        // whiteTurn = !whiteTurn;
        return true;
    }
    if (!whiteTurn && this.color == 'B') {
        // whiteTurn = !whiteTurn;
        return true;
    }
    return false;
};

////////////// CONSTRUCTORS of ALL PIECES /////////////////////

function Pawn(x, y, color) {
    this.first_mov = true;
    
    ChessPiece.call(this, x, y, color);
    if (color == 'B') { board_arr[x][y] = -1; }
    else {board_arr[x][y] = 1;}

    pieceToHTML(x, y, "♟", color);
}

Pawn.prototype = Object.create(ChessPiece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.allowedMov = function (x_new, y_new) {

    // this sing will check the color
    // if black → sign = -1; if white sing = +1
    // * board_arr has negative value for black pieces and vice versa 
    let sign = board_arr[this.x][this.y]/Math.abs(board_arr[this.x][this.y]);

    // check for normal movement
    if (x_new === this.x && y_new === this.y + sign*1 && isEmpty(x_new,y_new)) {
        return true;
    }

    // check for capture movment
    if ((x_new === this.x + 1 || x_new === this.x - 1) && y_new === this.y + sign*1) {
        return !isEmpty(x_new,y_new) && !this.isSameColor(x_new, y_new);
    }

    // check for first movement
    if (x_new === this.x && y_new === this.y + sign*2 && isEmpty(x_new,y_new) && this.first_mov) {
        this.first_mov = false;
        return true;
    }

    return false;
};

function King(x, y, color) {
    ChessPiece.call(this, x, y, color);
    if (color == 'B') { board_arr[x][y] = -6; }
    else {board_arr[x][y] = 6;}

    pieceToHTML(x, y, "♚", color);
}

King.prototype = Object.create(ChessPiece.prototype);
King.prototype.constructor = King;

King.prototype.allowedMov = function (x_new, y_new) {
    x_change = x_new - this.x;
    y_change = y_new - this.y;

    // NB: we didn't test if new position is already checked

    // check for normal one block move
    if (Math.abs(x_change) <= 1 && Math.abs(y_change) <= 1) {

        // check if embty or same color (in case empty isSameColor return false)
        return !this.isSameColor(x_new, y_new);
    }
    return false;
};

function Knight (x, y, color) {
    ChessPiece.call(this, x, y, color);
    if (color == 'B') { board_arr[x][y] = -2; }
    else {board_arr[x][y] = 2;}

    pieceToHTML(x, y, "♞", color);
}

Knight.prototype = Object.create(ChessPiece.prototype);
Knight.prototype.constructor = Knight;

Knight.prototype.allowedMov = function (x_new, y_new) {
    x_change = x_new - this.x;
    y_change = y_new - this.y;

    if (Math.abs(x_change) === 1 && Math.abs(y_change) === 2) {

        //check if the wanted position is empty or has diffrent color
        return !this.isSameColor(x_new, y_new);
    }

    if (Math.abs(x_change) === 2 && Math.abs(y_change) === 1) {

        //check if the wanted position is empty or has diffrent color
        return !this.isSameColor(x_new, y_new);
    }

    return false;
};


function Bishop (x, y, color) {
    ChessPiece.call(this, x, y, color);
    if (color == 'B') { board_arr[x][y] = -3; }
    else {board_arr[x][y] = 3;}

    pieceToHTML(x, y, "♝", color);
}

Bishop.prototype = Object.create(ChessPiece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.allowedMov = function (x_new, y_new) {
    return this.diagonallyMov(x_new, y_new);
};


function Rook (x, y, color) {
    ChessPiece.call(this, x, y, color);
    if (color == 'B') { board_arr[x][y] = -4; }
    else {board_arr[x][y] = 4;}

    pieceToHTML(x, y, "♜", color);
}

Rook.prototype = Object.create(ChessPiece.prototype);
Rook.prototype.constructor = Rook;

Rook.prototype.allowedMov = function (x_new, y_new) {
    return this.straightlyMov(x_new, y_new);
};


function Queen (x, y, color) {
    ChessPiece.call(this, x, y, color);
    if (color == 'B') { board_arr[x][y] = -4; }
    else {board_arr[x][y] = 4;}

    pieceToHTML(x, y, "♛", color);
}

Queen.prototype = Object.create(ChessPiece.prototype);
Queen.prototype.constructor = Rook;

Queen.prototype.allowedMov = function (x_new, y_new) {
    return this.straightlyMov(x_new, y_new) || this.diagonallyMov(x_new, y_new);
};

//////////////////////////////////////////////////////////////////

function start() {
    for (let i = 0; i < board_arr.length; i++) {
        board_arr[i].fill(0);
    }

    //create the white pieces
    pawn1_w = new Pawn (1,2,'W');
    pawn2_w = new Pawn (2,2,'W');
    pawn3_w = new Pawn (3,2,'W');
    pawn4_w = new Pawn (4,2,'W');
    pawn5_w = new Pawn (5,2,'W');
    pawn6_w = new Pawn (6,2,'W');
    pawn7_w = new Pawn (7,2,'W');
    pawn8_w = new Pawn (8,2,'W');

    rook1_w = new Rook (1,1,'W');
    rook2_w = new Rook (8,1,'W');

    knight1_w = new Knight(2,1, 'W');
    knight2_w = new Knight(7,1, 'W');

    bishop1_w = new Bishop(3,1, 'W');
    bishop2_w = new Bishop(6,1, 'W');

    queen_w = new Queen(4,1, 'W');
    king_w = new King(5,1, 'W');


    //create the balck  pieces
    pawn1_b = new Pawn (1,7,'B');
    pawn2_b = new Pawn (2,7,'B');
    pawn3_b = new Pawn (3,7,'B');
    pawn4_b = new Pawn (4,7,'B');
    pawn5_b = new Pawn (5,7,'B');
    pawn6_b = new Pawn (6,7,'B');
    pawn7_b = new Pawn (7,7,'B');
    pawn8_b = new Pawn (8,7,'B');

    rook1_b = new Rook (1,8,'B');
    rook2_b = new Rook (8,8,'B');

    knight1_b = new Knight(2,8, 'B');
    knight2_b = new Knight(7,8, 'B');

    bishop1_b = new Bishop(3,8, 'B');
    bishop2_b = new Bishop(6,8, 'B');

    queen_b = new Queen(4,8, 'B');
    king_b = new King(5,8, 'B');
}

function getJsObj(id) {

    // this function will take the id of HTML element as a string 
    // (typically the id of the corresponed element/piece) and return its JavaScript object
    // since the id in html element is well inisiailzed to be "x-y", this will work fine

    switch (id) {
        //white pieces cases
        case "1-2": return pawn1_w;
        case "2-2": return pawn2_w;
        case "3-2": return pawn3_w;
        case "4-2": return pawn4_w;
        case "5-2": return pawn5_w;
        case "6-2": return pawn6_w;
        case "7-2": return pawn7_w;
        case "8-2": return pawn8_w;

        case "1-1": return rook1_w;
        case "8-1": return rook2_w;

        case "2-1": return knight1_w;
        case "7-1": return knight2_w;

        case "3-1": return bishop1_w;
        case "6-1": return bishop2_w;

        case "4-1": return queen_w;
        case "5-1": return king_w;

        //black pieces cases
        case "1-7": return pawn1_b;
        case "2-7": return pawn2_b;
        case "3-7": return pawn3_b;
        case "4-7": return pawn4_b;
        case "5-7": return pawn5_b;
        case "6-7": return pawn6_b;
        case "7-7": return pawn7_b;
        case "8-7": return pawn8_b;

        case "1-8": return rook1_b;
        case "8-8": return rook2_b;

        case "2-8": return knight1_b;
        case "7-8": return knight2_b;

        case "3-8": return bishop1_b;
        case "6-8": return bishop2_b;

        case "4-8": return queen_b;
        case "5-8": return king_b;
    }
}

function reomveAllPieces() {
     for (let x = 1; x <= 8; x++) {
        for (let y = 1; y <= 8; y++) {
            let thisCell = document.getElementById(x+"_"+y);
            if (thisCell.hasChildNodes()) {
                thisCell.removeChild(thisCell.firstChild);
            }
        }
     }
}

start();

const reset_btn = document.getElementById("reset");
reset_btn.addEventListener('click', function() {
    reomveAllPieces();
    whiteTurn = true;
    start();
    socket.send(JSON.stringify([sessionID, "reset"]));
});

