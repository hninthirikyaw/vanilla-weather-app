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
  // console.log(response.data);
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
  celsiusTemperature = response.data.daily[0].temperature.day;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerText = response.data.daily[0].condition.description;
  humidityElement.innerHTML = response.data.daily[0].temperature.humidity;
  windElement.innerHTML = Math.round(response.data.daily[0].wind.speed);
  dateElement.innerHTML = formatDate(response.data.daily[0].time * 1000);
  weatherIcon.setAttribute("src", response.data.daily[0].condition.icon_url);
  weatherIcon.setAttribute("alt", response.data.daily[0].condition.icon);
  getForecast(response.data.coordinates);
}

function search(cityName) {
  let apiKey = "e4df2db09463dff4ode493te4146ad7b";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function submitHandler(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  search(input.value);
  input.value = null;
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function getForecast(coordinates) {
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let apiKey = "e4df2db09463dff4ode493te4146ad7b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast)
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  forecast.forEach((forecastDay, index) => {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="col-2">
<div id="weather-forecast-date">
${formatDay(forecastDay.time)}
</div>
<img src=${forecastDay.condition.icon_url} width="48" alt="">
<div>
<span id="weather-forecast-max">${Math.round(forecastDay.temperature.maximum)}°</span>
<span id="weather-forecast-min">${Math.round(forecastDay.temperature.minimum)}°</span>
</div>
</div>
`;
    }
  });
  forecastElement.innerHTML = forecastHtml + `</div>`;
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitHandler);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

search("London");
