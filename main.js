const currentMatch = document.querySelector(".current-match");
const currentStats = document.querySelector(".current-stats");
let intervalId;
let pauseId;
let isAutoplaying = false;
let score = JSON.parse(localStorage.getItem("score"));
if (score === null) {
    score = {win: 0, lose: 0, draw: 0};
}

const scoreHTML = document.querySelector(".score");
const autoplayBtn = document.querySelector(".auto")

function autoplay() {
    if (autoplayBtn.innerText === "Autoplay") {
        autoplayBtn.innerText = "Stop Playing";
        isAutoplaying = true;
        let move;

        intervalId = setInterval(function startAutoplay(){
            move = generateRandomMove();
            playMove(move);
        }, 800);
    } else {
        clearInterval(intervalId);
        autoplayBtn.innerText = "Autoplay";
        isAutoplaying = false;
    }
}

function viewScore() {
    currentMatch.innerText = "";
    currentStats.innerText = "";
    scoreHTML.innerText = `Win: ${score.win}, Lose: ${score.lose}, Draw: ${score.draw}`;
}

function resetScore() {
    const ensure = prompt("Are you sure? [Y/N]");
    if (ensure == "Y" || ensure == "y" || ensure == "Yes" || ensure == "yes") {
        localStorage.removeItem("score");
        score = {win: 0, lose: 0, draw: 0};
        viewScore();
        clearInterval(intervalId);
        alert("Your progress has been reset");
    }
}

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
    function play() {
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
    if (!isAutoplaying) {
        isAutoplaying = true;
        currentMatch.innerText = `${userMove} VS ...`;
        pauseId = setInterval(function() {
            play();
            clearInterval(pauseId);
            isAutoplaying = false;
        }, 800)
    } else {
        play();
    }
}