
var allCells = document.getElementsByClassName("cell");

// add the needed attributes for drag&drop to all div=cell in the board.
// this attributes will excute any assigned function when ...
// 1- ondrop → when an element is dropt into this
// 2- ondragover → while an element draged over this
// 3- (listen) dragenter → when an element enter the zone of this
// 4- (listen) dragleave → when an element leave the zone of this
for (const cell of allCells) {
    var att1 = document.createAttribute("ondrop");
    att1.value = "drop(event)";
    cell.setAttributeNode(att1);

    var att2 = document.createAttribute("ondragover");
    att2.value = "allowDrop(event)";
    cell.setAttributeNode(att2);

    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
}


function allowDrop(e) {
    // default: refuse drop element in other element, se we prefventDefault ;)
    e.preventDefault();        
}
function drag(e) {
    // e.target = the cell where the element is 
    // save the id of this for later use in drop()
    e.dataTransfer.setData("targetID", e.target.id);
}
function drop(e) {
    e.target.classList.remove("hold");  //remove the hovering style

    let target_cell = e.target;

    let newCell_pos = target_cell.id;
    let x_new = parseInt(newCell_pos.substring(0,1));
    let y_new = parseInt(newCell_pos.substring(2,3));

    // check if the e.target is the piece on top of the cell
    // fix the problem by reassign the variabels to the prober values manualy
    if (e.target.classList[0] != "cell") {
        let pawn = getJsObj(e.target.id);
        x_new = pawn.getPosition()[0];
        y_new = pawn.getPosition()[1];

        target_cell = document.getElementById(x_new+"_"+y_new);
    }

    let element_id = e.dataTransfer.getData("targetID");
    let piece = getJsObj(element_id);


    if (piece.allowedMov(x_new, y_new) && piece.allowedTurn()) {

        // as long this passed allowedMov test → if there a piece in
        // the given cell, this piece is the rivals' piece, so remove it
        // if this piece is the king, terminate the game
        if (target_cell.hasChildNodes()) {
            if (target_cell.firstChild.id == "5-8") {
                alert("The king is captured. The white won");
                reomveAllPieces();
                whiteTurn = true;
                start();

                // send the movment to the other player
                let dataToSend = [sessionID, "mov", element_id, x_new, y_new];
                socket.send(JSON.stringify(dataToSend));
                return;
            }
            if (target_cell.firstChild.id == "5-1") {
                alert("The king is captured. The black won");
                reomveAllPieces();
                whiteTurn = true;
                start();

                // send the movment to the other player
                let dataToSend = [sessionID, "mov", element_id, x_new, y_new];
                socket.send(JSON.stringify(dataToSend));
                return;
            }
            target_cell.removeChild(target_cell.firstChild);
        }
        piece.setPosition(x_new, y_new);
        e.preventDefault(); 
        target_cell.append(document.getElementById(element_id));

        // send the movment to the other player
        let dataToSend = [sessionID, "mov", element_id, x_new, y_new];
        socket.send(JSON.stringify(dataToSend));

    } else {
        // alert("not allowed move");
    }
}
function dragEnter() {
    this.classList.add("hold");
    setTimeout(() => {
        this.classList.remove("hold");
    }, 3000);
}
function dragLeave() {
    this.classList.remove("hold");
}


function setMov(element_id, x_new, y_new) {

    target_cell = document.getElementById(x_new + "_" + y_new);
    let piece = getJsObj(element_id);
    whiteTurn = !whiteTurn;

    // if there a piece in the given cell, this piece is 
    // the rivals' piece, so remove it
    // if this piece is the king, terminate the game
    if (target_cell.hasChildNodes()) {
        if (target_cell.firstChild.id == "5-8") {
            alert("The king is captured. The white won");
            reomveAllPieces();
            whiteTurn = true;
            start();
            return;
        }
        if (target_cell.firstChild.id == "5-1") {
            alert("The king is captured. The black won");
            reomveAllPieces();
            whiteTurn = true;
            start();
            return;
        }
        target_cell.removeChild(target_cell.firstChild);
    }
    old_pos = piece.getPosition();  // return an array contain x and y recpectively
    old_cell = document.getElementById(old_pos[0] + "_" + old_pos[1]);
    target_cell.append(document.getElementById(element_id));
    if (old_cell.hasChildNodes()) {
        old_cell.removeChild(old_cell.firstChild);
    }

    piece.setPosition(x_new, y_new);
}
