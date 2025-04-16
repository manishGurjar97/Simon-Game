let userseq = [];
let gameseq = [];
let gamestart = false;
let level = 0;
let color = ["yellow", "green", "purple", "yellow"];
let gamerun;
let gamerunAudio = new Audio("sounds/gamerun.mp3");
gamerunAudio.loop = true; // loop the gamerun sound


let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let highScore = localStorage.getItem("highScore") || 0;

// Start game on keypress
document.addEventListener("keypress", function () {
    if (gamestart === false) {
     gamerunAudio.play();

        console.log("game is started");
        gamestart = true;
        levelup();
    }
});

// Flash effect for random button
function buttonflash(randbtn) {
    randbtn.classList.add("flash");
    setTimeout(function () {
        randbtn.classList.remove("flash");
    }, 250);
}

// Flash effect for user press
function userflase(allbts) {
    allbts.classList.add("userflash");
    setTimeout(function () {
        allbts.classList.remove("userflash");
    }, 250);
}

// Increase level and show random color
function levelup() {
    userseq = [];
    level++;
    h3.innerText = `level ${level}`;

    let randomidx = Math.floor(Math.random() * 3);
    let randcolor = color[randomidx];
    gameseq.push(randcolor);

    let randbtn = document.querySelector(`.${randcolor}`);
    buttonflash(randbtn);
}

// On button press by user
function pressbutton() {
    let allbtn = this;
    let userpress = allbtn.getAttribute("id");

    console.log(userpress);
    userseq.push(userpress);
    userflase(allbtn);
    check(userseq.length - 1);
}

// Check user input with game sequence
function check(indx) {
    if (userseq[indx] === gameseq[indx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
     gamerunAudio.pause();
     gamerunAudio.currentTime = 0;
     
     playSound("end");
     setTimeout(function(){
          playSound("lough")
     } ,2000)
        updateHighScore();
        h3.innerText = `Game over, please try again \n press any keboard key to start again!`;
        h2.innerText = `Your high score is ${highScore}`;
        gamereset();

        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        setTimeout(function () {
            body.style.backgroundColor = "white";
        }, 500);
    }
}

// Reset game state
function gamereset() {
    userseq = [];
    gameseq = [];
    gamestart = false;
    level = 0;
}

// High score logic
function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
    }
}

// Add event listeners to all buttons
let allbts = document.querySelectorAll(".btn");
for (btn of allbts) {
    btn.addEventListener("click", pressbutton);
}


function playSound(name) {
     let audio = new Audio(`sounds/${name}.mp3`);
     audio.play();
 }
 