'use strict';
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');

const score0El = document.querySelector('#score-0');
// getelement tylko jak chcesz coś z id powiazac
const score1El = document.getElementById('score-1');
const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

score0El.textContent = 0;
score1El.textContent = 0;
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('active');
  player1El.classList.toggle('active');
};

// rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1 generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.add('hide');
    // 2 display dice
    // diceEl.classList.remove('hide');
    // diceEl.src = `dice-${dice}.png`;
    document.getElementById(`dice-${dice}`).classList.remove('hide');

    // 3 chceck for 1 if ture switch next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1 add current score to active player
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];
    // chceck score >= 100
    if (scores[activePlayer] >= 20) {
      // finish game
      playing = false;
      document.querySelector(`.player-${activePlayer}`).classList.add('winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');
      diceEl.classList.add('hide');
    } else {
      // change player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hide');
  player0El.classList.remove('winner');
  player1El.classList.remove('winner');
  player0El.classList.add('active');
  player1El.classList.remove('active');
});
