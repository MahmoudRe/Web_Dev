
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

    var newCell_pos = e.target.id;
    x_new = parseInt(newCell_pos.substring(0,1));
    y_new = parseInt(newCell_pos.substring(2,3));

    var element_id = e.dataTransfer.getData("targetID");
    let piece = getJsObj(element_id);


    if (piece.allowedMov(x_new, y_new) && piece.allowedTurn()) {

        // as long this passed allowedMov test → if there a piece in
        // the given cell, this piece is the rivals' piece, so remove it
        if (e.target.hasChildNodes()) {
            e.target.removeChild(e.target.firstChild);
        }
        piece.setPosition(x_new, y_new);
        e.preventDefault(); 
        e.target.append(document.getElementById(element_id));
    } else {
        // alert("not allowed move");
    }
}
function dragEnter() {
    this.classList.add("hold");
}
function dragLeave() {
    this.classList.remove("hold");
}
