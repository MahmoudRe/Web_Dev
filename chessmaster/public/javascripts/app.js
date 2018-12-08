
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

// Constructor of the father piece
function ChessPiece (x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color; // color => 'B' or 'W'
}

ChessPiece.prototype.getPosition = function() {
    return [this.x, this.y];
};
ChessPiece.prototype.setPosition = function(x,y) {
    this.x = x;
    this.y = y;
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
        if (this.isSameColor(x_new, y_new)) {
            return false;
        }
        
        // cheking if all cells in between are empty
        // all positions in between can be achieved using this formula:
        // pos_between = old + (change - change/abs(change) * i) :∀i < abs(change)
        // i=0 → the new position; i=x_change → the old position
        for (let i = 1; i < Math.abs(x_change); i++) {
            x_between = this.x + (x_change - x_change/Math.abs(x_change)*i);
            y_between = this.y + (y_change - y_change/Math.abs(y_change)*i); 
            
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
            for (let i = 1; i < x_change; i++) {
                x_between = this.x + (x_change - x_change/Math.abs(x_change)*i);

                if (!isEmpty(x_between, y_new)) { return false; }
            }
        }

        if (y_change != 0) {
            for (let i = 1; i < y_change; i++) {
                y_between = this.y + (y_change - y_change/Math.abs(y_change)*i);

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


////////////// CONSTRUCTORS of ALL PIECES /////////////////////

function Pawn(x, y, color) {
    ChessPiece.call(this, x, y, color);
    if (color == 'B') { board_arr[x][y] = -1; }
    else {board_arr[x][y] = 1;}

    document.getElementById(y + "_" + x).innerHTML = "P";
}

Pawn.prototype = Object.create(ChessPiece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.allowedMov = function (x_new, y_new) {
    // check for normal movment
    if (x_new === this.x && y_new === this.y + 1 && isEmpty(x_new,y_new)) {
        return true;
    }

    // check for capture movment
    if ((x_new === this.x + 1 || x_new === this.x - 1) && y_new === this.y + 1) {
        return !isEmpty(x_new,y_new) && !this.isSameColor(x_new, y_new);
    }
    return false;
};

function King(x, y, color) {
    ChessPiece.call(this, x, y, color);
    if (color == 'B') { board_arr[x][y] = -6; }
    else {board_arr[x][y] = 6;}

    document.getElementById(y + "_" + x).innerHTML = "K";
}

King.prototype = Object.create(ChessPiece.prototype);
King.prototype.constructor = King;

King.prototype.allowedMov = function (x_new, y_new) {
    x_cahnge = x_new - this.x;
    y_change = x_new - this.y;

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

    document.getElementById(y + "_" + x).innerHTML = "N";
}

Knight.prototype = Object.create(ChessPiece.prototype);
Knight.prototype.constructor = Knight;

Knight.prototype.allowedMov = function (x_new, y_new) {
    x_cahnge = x_new - this.x;
    y_change = y_new - this.y;

    if (Math.abs(x_change) === 1 && Math.abs(y_change) === 2) {

        //check if the wanted position is empty or has diffrent color
        return !this.isSameColor(x_new, y_new);
    }

    if (Math.abs(y_change) === 2 && Math.abs(y_change) === 1) {

        //check if the wanted position is empty or has diffrent color
        return !this.isSameColor(x_new, y_new);
    }

    return false;
};


function Bishop (x, y, color) {
    ChessPiece.call(this, x, y, color);
    if (color == 'B') { board_arr[x][y] = -3; }
    else {board_arr[x][y] = 3;}

    document.getElementById(y + "_" + x).innerHTML = "B";
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

    document.getElementById(y + "_" + x).innerHTML = "R";
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

    document.getElementById(y + "_" + x).innerHTML = "Q";
}

Queen.prototype = Object.create(ChessPiece.prototype);
Queen.prototype.constructor = Rook;

Queen.prototype.allowedMov = function (x_new, y_new) {
    return this.straightlyMov(x_new, y_new) || this.diagonallyMov(x_new, y_new);
};

//////////////////////////////////////////////////////////////////

function start() {
    //create the white pieces
    let pawn1_w = new Pawn (1,2,'W');
    let pawn2_w = new Pawn (2,2,'W');
    let pawn3_w = new Pawn (3,2,'W');
    let pawn4_w = new Pawn (4,2,'W');
    let pawn5_w = new Pawn (5,2,'W');
    let pawn6_w = new Pawn (6,2,'W');
    let pawn7_w = new Pawn (7,2,'W');
    let pawn8_w = new Pawn (8,2,'W');

    let rook1_w = new Rook (1,1,'W');
    let rook2_w = new Rook (8,1,'W');

    let knight1_w = new Knight(2,1, 'W');
    let knight2_w = new Knight(7,1, 'W');

    let bishop1_w = new Bishop(3,1, 'W');
    let bishop2_w = new Bishop(6,1, 'W');

    let queen_w = new Queen(4,1, 'W');
    let king_w = new King(5,1, 'W');


    //create the balck  pieces
    let pawn1_b = new Pawn (1,7,'B');
    let pawn2_b = new Pawn (2,7,'B');
    let pawn3_b = new Pawn (3,7,'B');
    let pawn4_b = new Pawn (4,7,'B');
    let pawn5_b = new Pawn (5,7,'B');
    let pawn6_b = new Pawn (6,7,'B');
    let pawn7_b = new Pawn (7,7,'B');
    let pawn8_b = new Pawn (8,7,'B');

    let rook1_b = new Rook (1,8,'B');
    let rook2_b = new Rook (8,8,'B');

    let knight1_b = new Knight(2,8, 'B');
    let knight2_b = new Knight(7,8, 'B');

    let bishop1_b = new Bishop(3,8, 'B');
    let bishop2_b = new Bishop(6,8, 'B');

    let queen_b = new Queen(4,8, 'B');
    let king_b = new King(5,8, 'B');
 }

 start();

 document.getElementById("board").addEventListener('click', function() {
     console.log("test");
 })



// Test
// var p = new Pawn(5,4,'B');
// var p2 = new Pawn(6,5,'W');

// console.log(p.diagonallyMov(7,6));

// console.log(p.getPosition());
// console.log(p.allowedMov(6,5));





