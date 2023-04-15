function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let weatherIcon = document.querySelector("#weather-icon");

  temperatureElement.innerHTML = Math.round(
    response.data.daily[0].temperature.day
  );
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerText = response.data.daily[0].condition.description;
  humidityElement.innerHTML = response.data.daily[0].temperature.humidity;
  windElement.innerHTML = Math.round(response.data.daily[0].wind.speed);
  dateElement.innerHTML = formatDate(response.data.daily[0].time * 1000);
  weatherIcon.setAttribute("src", response.data.daily[0].condition.icon_url);
  weatherIcon.setAttribute("alt", response.data.daily[0].condition.icon);
}

function search(cityName) {
  let apiKey = "e4df2db09463dff4ode493te4146ad7b";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}
search("London")


function submitHandler(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  search(input.value)
  input.value = null
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitHandler)
