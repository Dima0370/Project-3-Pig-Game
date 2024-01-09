'use strict';

// Selecting Elements
const score0El = document.querySelector("#score--0");
const current0El = document.getElementById("current--0");
const score1El = document.getElementById("score--1");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;

// Starting Conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
};
init();

// Switching the player
const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
    activePlayer = activePlayer === 0 ? 1 : 0;
};

// Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `dice-${dice}.png`;
        diceEl.classList.remove("hidden");
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

// Holding Score
btnHold.addEventListener("click", function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            diceEl.classList.add("hidden");
        } else {
            switchPlayer();
        }
    }
});

// Starting New Game
btnNew.addEventListener("click", init);