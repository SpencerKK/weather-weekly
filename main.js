const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const form = document.getElementById("city-form");

// Output Data
const cityName = document.getElementById("city-name");
const desc = document.getElementById("desc");
const currentTemp = document.getElementById("current-temp");

// API Call
let myKey = "6288f54703513946c8d1266bac4466c2";

async function getWeather(e) {
  e.preventDefault();
  let city = searchInput.value;
  let response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${myKey}`
  );
  let data = await response.json();
  console.log(data);

  // Update HTML
  cityName.innerHTML = data.name;
  desc.innerHTML = data.weather[0].description;
  currentTemp.innerHTML = Math.ceil(data.main.temp) + "°";
}

form.addEventListener("submit", (e) => getWeather(e));
