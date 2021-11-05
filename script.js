const sQuery = query => document.querySelector(query);
const sQueryAll = query => document.querySelectorAll(query);

const square = sQueryAll(".square"),
    mole = sQueryAll(".mole"),
    timeLeft = sQuery("#time_left");

let score = sQuery("#score"),
    result = 0, hitPosition, timerId = null,
    currentTime = 60;

// Keep moving the mole to different pits
function randomSquare() {
    square.forEach(squares => { squares.classList.remove("mole"); })
    let randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add("mole");

    // assign the id of the randomPosition to hitPosition for us to use later
    hitPosition = randomPosition.id;
};

// To check if the user hits the mole
square.forEach(squares => {
    squares.addEventListener("mousedown", function() {
        if (squares.id == hitPosition) {
            result ++;
            score.textContent = result;
            hitPosition = null;
        }
    });
});

function moveMole() { timerId = setInterval(randomSquare, 500); };

moveMole();

// To run down the timer of a minute
function countDown() {
    currentTime --;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert("GAME OVER! Your final score is " + result);
    }
}

let countDownTimerId = setInterval(countDown, 1000);