const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const body = document.body;

async function searchCity() {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  hideError();
  hideWeatherCard();
  showLoading();
  searchBtn.disabled = true;

  try {
    const cityResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=en&format=json`
    );
    const cityData = await cityResponse.json();

    if (!cityData.results || cityData.results.length === 0) {
      throw new Error("City not found");
    }

    const cityInfo = cityData.results[0];
    const { latitude, longitude, name, country, population, timezone } =
      cityInfo;

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
    );
    const weatherData = await weatherResponse.json();

    updateWeatherUI(name, country, population, timezone, weatherData);
    hideLoading();
    showWeatherCard();
  } catch (error) {
    hideLoading();
    showError(error.message || "Failed to fetch weather data");
  } finally {
    searchBtn.disabled = false;
  }
}

function updateWeatherUI(name, country, population, timezone, weatherData) {
  const isDay = weatherData.current.is_day === 1;
  const currentTemp = weatherData.current.temperature_2m;
  const minTemp = weatherData.daily.temperature_2m_min[0];
  const maxTemp = weatherData.daily.temperature_2m_max[0];

  body.className = isDay ? "day" : "night";

  document.getElementById("cityName").textContent = name;
  document.getElementById("currentTemp").textContent = `${currentTemp} °C`;
  document.getElementById("country").textContent = country;
  document.getElementById("timezone").textContent = timezone;
  document.getElementById("population").textContent = population
    ? population.toLocaleString()
    : "N/A";
  document.getElementById(
    "forecast"
  ).innerHTML = `Low: ${minTemp} °C<br>Max: ${maxTemp} °C`;
}

function showLoading() {
  loading.classList.add("show");
}

function hideLoading() {
  loading.classList.remove("show");
}

function showWeatherCard() {
  weatherCard.classList.add("show");
}

function hideWeatherCard() {
  weatherCard.classList.remove("show");
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.add("show");
}

function hideError() {
  errorDiv.classList.remove("show");
}

searchBtn.addEventListener("click", searchCity);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchCity();
  }
});

window.addEventListener("load", () => {
  searchCity();
});
