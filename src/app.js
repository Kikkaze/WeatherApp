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
}

let apiKey = "368a5t8b9e10a64e78c55aob0f467b4c";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=San Francisco&key=${apiKey}`;

axios.get(apiUrl).then(showTemperature);
