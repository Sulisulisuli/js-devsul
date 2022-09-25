'use strict';

const wrapper = document.querySelector('forcast-wrapper');
const inputApp = document.querySelector('form-input');
const messageApp = document.querySelector('app-message');

document.addEventListener('keyup', function (e) {
  //if user press enter
  if (e.key == 'Enter' && inputApp.value != '') {
    requestApi(inputApp.value);
  }
});

function requestApi(city) {
  let api =
    'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={7ce53f6867bc4664837e8fe0bd604f75}';
  messageApp.textContent = 'Getting weather details...';
  messageApp.classList.remove('hide');
  fetch(api)
    .then(Response => Response.json())
    .then(result => weatherDetails(result));
}

function weatherDetails(info) {
  console.log(info);
}

document.addEventListener('keyup', function (e) {
  //if user press enter
  if (e.key == 'Enter' && inputApp.value != '') {
    console.log(hello);
  }
});
