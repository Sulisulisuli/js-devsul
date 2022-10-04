'use strict';

// age game
const currentYear = 2022;
const myAge = currentYear - 1996;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.age-input').value);
  if (guess === myAge) {
    document.querySelector('.text-answer').textContent =
      'Great you guess my age now we know each other little bit better';
  } else if (guess > myAge) {
    document.querySelector(
      '.text-answer'
    ).textContent = `Nooo Nooo Nooo I'm not that old!!!`;
  } else if (guess < myAge) {
    document.querySelector(
      '.text-answer'
    ).textContent = `I know I'm looking young but I'm little bit older :/`;
  }
});

/// Test !!!!
