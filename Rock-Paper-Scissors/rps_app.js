let userScore = 0;
let compScore = 0;
const userScore_span = document.getElementById("user_score");
const compScore_span = document.getElementById("comp_score");
const scoreBoard_div = document.querySelector(".score");
const result_div = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");


function getCompChoice() {
    const choices = ['r', 'p', 's'];
    const randomNum = Math.floor(Math.random() * 3);
    return choices [randomNum];
}

function convertTo (letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    return "Scissers";
}

function win(userChoice, compChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_div.innerHTML = convertTo(userChoice) + " beats " + convertTo(compChoice) + ". you win!";
    document.getElementById(userChoice).classList.add("green-glow");
    setTimeout(function() {
        document.getElementById(userChoice).classList.remove("green-glow")
    }, 300);
}

function lose(userChoice, compChoice) {
    compScore++;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_div.innerHTML = convertTo(userChoice) + " beats " + convertTo(compChoice) + ". you lost!";
    document.getElementById(userChoice).classList.add("red-glow");
    setTimeout(function() {
        document.getElementById(userChoice).classList.remove("red-glow")
    }, 300);
}

function draw() {
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_div.innerHTML = "it is draw";
}

function game(userChoice) {
    const compChoice = getCompChoice();
    
    switch (userChoice + compChoice) {
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, compChoice);
            break;

        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, compChoice);
            break;

        case "pr":
        case "sp":
        case "rs":
            win(userChoice, compChoice);
            break;
    }

}

function main () {
    rock_div.addEventListener('click', function() {
        game("r");
    });
    
    paper_div.addEventListener('click', function(){
        game("p");
    });
    
    scissors_div.addEventListener('click', function() {
        game("s");
    });
}

main();
