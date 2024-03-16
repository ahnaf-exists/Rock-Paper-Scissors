const currentMatch = document.querySelector(".current-match");
const currentStats = document.querySelector(".current-stats");
const score = JSON.parse(localStorage.getItem("score"));
const scoreHTML = document.querySelector(".score");

function generateRandomMove() {
    const choice = ["Rock", "Paper", "Scissors"];
    return choice[Math.floor(Math.random() * 3)];
}

function displayWin() {
    score.win += 1;
    currentStats.innerText = "You Won";
}

function displayLose() {
    score.lose += 1;
    currentStats.innerText = "You Lost";
}

function displayDraw() {
    score.draw += 1;
    currentStats.innerText = "It's a draw";
}

function playMove(userMove) {
    const computerMove = generateRandomMove();
    currentMatch.innerText = `${userMove} VS ${computerMove}`;
    if (userMove === computerMove) {
        displayDraw();
    } else if (userMove === "Rock" && computerMove === "Paper") {
        displayLose();
    } else if (userMove === "Rock" && computerMove === "Scissors") {
        displayWin();
    } else if (userMove === "Paper" && computerMove === "Rock") {
        displayLose();
    } else if (userMove === "Paper" && computerMove === "Scissors") {
        displayWin();
    } else if (userMove === "Scissors" && computerMove === "Rock") {
        displayLose();
    } else if (userMove === "Scissors" && computerMove === "Paper") {
        displayWin();
    }
    localStorage.setItem("score", JSON.stringify(score));
    scoreHTML.innerText = `Win: ${score.win}, Lose: ${score.lose}, Draw: ${score.draw}`;
}