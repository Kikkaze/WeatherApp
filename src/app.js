function showWeekday(timestamp) {
  let date = new Date(timestamp);

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let dayMonth = date.getDate();
  let year = date.getFullYear();
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = `${month} ${dayMonth}, ${year}`;

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
  let weekday = document.querySelector("#weekday");
  weekday.innerHTML = `${day}`;
  return `${day}`;
}

function showForecastWeekday(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#following-days");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 forecast">
              <span id="forecast-day">${showForecastWeekday(
                forecastDay.time
              )}</span>
              <br />
              <img
                id="forecast-icon"
                src=${forecastDay.condition.icon_url}
                alt="sun and clouds icon"
              />
              <br />
              <span id="forecast-temp-max">${Math.round(
                forecastDay.temperature.maximum
              )}</span>° /
              <span id="forecast-temp-min">${Math.round(
                forecastDay.temperature.minimum
              )}</span>°
            </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "368a5t8b9e10a64e78c55aob0f467b4c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let descriptionElement = document.querySelector("#weatherDescription");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
  let dayElement = document.querySelector("#weekday");
  dayElement.innerHTML = showWeekday(response.data.time * 1000);
  let iconElement = document.querySelector("#mainIcon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "368a5t8b9e10a64e78c55aob0f467b4c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function searchWeather(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchWeather);

search("San Francisco");

showForecast();
