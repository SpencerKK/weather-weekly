// Form
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const form = document.getElementById("city-form");

// OResults
const resultsWrapper = document.querySelector(".results-wrapper");
const forecastWrapper = document.querySelector(".forecast");


let myKey = "6288f54703513946c8d1266bac4466c2";


// variables
let currentTemp = 0;
let locale = 'none';
let humidity = 0;
let windSpeed = 0;
let todayDesc = "";
let feelsLike = 0;

let icon = null;



// Get the day's weather
async function getWeather(e) {
  e.preventDefault();
  let city = searchInput.value;
  let response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${myKey}`
  );

  let todayData = await response.json();

  console.log(todayData);

  currentTemp = Math.ceil(todayData.main.temp);
  locale = todayData.name;
  humidity = todayData.main.humidity;
  windSpeed = todayData.wind.speed;
  todayDesc = todayData.weather[0].main;
  feelsLike = Math.ceil(todayData.main.feels_like);

  icon = todayData.weather[0].icon;
}

// Get forecast / I also call the getWeather function here
async function getForecast(e) {
  e.preventDefault();
  getWeather(e);

  let forecastedCity = searchInput.value;
  let response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${forecastedCity}&units=imperial&appid=${myKey}`
  );
  
  let data = await response.json();

  resultsWrapper.innerHTML = `
  <div class="results-card">
  <div class="card-head">
    <h2 id="city-name">${locale}</h2>
    <h3 id="desc">${todayDesc}</h3>
    <p>${moment(data.dt).format("ll")}</p>
  </div>
  <div class="cur-weather">
    <h1 id="current-temp">${currentTemp}°</h1>
    <div class="icon">
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" />
    </div>
    <div class="cur-details">
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} mph</p>
      <p>Feels Like: ${feelsLike}</p>
    </div>
  </div>
</div>
  `

  let forecast = document.createElement("div");
  forecast.className = "forecast";
  document.querySelector(".results-card").append(forecast);

  let weekForecast = data.list;
  for (i = 5; i < weekForecast.length; i += 8) {
    console.log(weekForecast[i]);

    let icon = document.createElement("div");
    icon.className = "icon";

    icon.innerHTML = `
        <div class="icon">
            <img src="http://openweathermap.org/img/wn/${weekForecast[i].weather[0].icon}@2x.png" alt="" />
            <p>${Math.ceil(weekForecast[i].main.temp)}°</p>
            <p>${moment(weekForecast[i].dt_txt).format("dddd")}</p>
        </div>
    `

    document.querySelector(".forecast").append(icon);
  }
}

form.addEventListener("submit", (e) => getForecast(e));