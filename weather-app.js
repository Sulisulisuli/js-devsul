'use strict';

const wrapper = document.querySelector('.forcast-wrapper');
const inputApp = document.querySelector('.app-input');
const messageApp = document.querySelector('.app-message');
const locationBtn = document.getElementById('locationbtn');
const checkBtn = document.getElementById('checkBtn');
const appFirstView = document.querySelector('.app-first-view');
const appInfoView = document.querySelector('.forcast-info-wrapper');
const backArrow = document.querySelector('.back-arrow');

let api;

document.addEventListener('keyup', function (e) {
  //if user press enter
  if (e.key == 'Enter' && inputApp.value != '') {
    requestApi(inputApp.value);
    backArrow.classList.remove('hide');
  }
});

checkBtn.addEventListener('click', function () {
  if (inputApp.value != '') {
    requestApi(inputApp.value);
    backArrow.classList.remove('hide');
  }
});

locationBtn.addEventListener('click', function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    messageApp.textContent = `Getting weather details...`;
    messageApp.classList.remove('hide');
    backArrow.classList.remove('hide');
  } else {
    alert(`Your browser not support geolocation api :(`);
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=7ce53f6867bc4664837e8fe0bd604f75`;
  fetchData();
}

function onError(error) {
  messageApp.textContent = error.message;
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7ce53f6867bc4664837e8fe0bd604f75`;
  fetchData();
}

function fetchData() {
  messageApp.textContent = 'Getting weather details...';
  messageApp.classList.remove('hide');
  fetch(api)
    .then(response => response.json())
    .then(result => weatherDetails(result));
}

function weatherDetails(info) {
  if (info.cod == '404') {
    messageApp.textContent = `${inputApp.value} is not valid city!`;
    messageApp.classList.remove('hide');
  } else {
    // changing content based on api
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, temp } = info.main;

    if (id == 800) {
      document.getElementById('sun').classList.remove('hide');
    } else if (id >= 200 && id <= 232) {
      document.getElementById('storm').classList.remove('hide');
    } else if (id >= 300 && id <= 321) {
      document.getElementById('rain').classList.remove('hide');
    } else if (id >= 500 && id <= 531) {
      document.getElementById('rain').classList.remove('hide');
    } else if (id >= 600 && id <= 622) {
      document.getElementById('snow').classList.remove('hide');
    } else if (id >= 701 && id <= 781) {
      document.getElementById('fog').classList.remove('hide');
    } else if (id >= 802 && id <= 804) {
      document.getElementById('cloudy').classList.remove('hide');
    } else if (id == 801) {
      document.getElementById('sun-cloudy').classList.remove('hide');
    }

    document.querySelector('.temperature').textContent = `${Math.floor(
      temp
    )} °C`;
    document.querySelector('.weather-discription').textContent = description;
    document.querySelector('.city-name').textContent = city;
    document.querySelector('.country-name').textContent = country;

    appFirstView.classList.add('hide');
    appInfoView.classList.remove('hide');
    messageApp.classList.add('hide');
  }
}
backArrow.addEventListener('click', function () {
  appInfoView.classList.add('hide');
  appFirstView.classList.remove('hide');
  backArrow.classList.add('hide');
  //document.querySelector('.forecast-image').classList.toggle('hide');
  document.getElementById('sun-cloudy').classList.add('hide');
  document.getElementById('cloudy').classList.add('hide');
  document.getElementById('fog').classList.add('hide');
  document.getElementById('snow').classList.add('hide');
  document.getElementById('rain').classList.add('hide');
  document.getElementById('storm').classList.add('hide');
  document.getElementById('sun').classList.add('hide');
});
// test
