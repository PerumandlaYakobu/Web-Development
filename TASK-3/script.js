const apiKey = "YOUR_API_KEY"; // Get free key from https://openweathermap.org/api

document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorMsg = document.getElementById("error");
  const weatherCard = document.getElementById("weatherInfo");

  if (!city) {
    errorMsg.textContent = " Please enter a city name.";
    weatherCard.classList.add("hidden");
    return;
  }

  try {
    errorMsg.textContent = "Loading...";
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    let data = await response.json();

    // Update UI
    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = ` Temp: ${data.main.temp}°C`;
    document.getElementById("description").textContent = ` Weather: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = ` Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = ` Wind: ${data.wind.speed} m/s`;

    weatherCard.classList.remove("hidden");
    errorMsg.textContent = "";

  } catch (error) {
    errorMsg.textContent = ` ${error.message}`;
    weatherCard.classList.add("hidden");
  }
}
