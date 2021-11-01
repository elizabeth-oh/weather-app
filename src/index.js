function formatDate() {
    let now = new Date();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[now.getDay()];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let month = months[now.getMonth()];
  
    let hours = now.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
    return `${day} ${month} ${now.getDate()} ${now.getFullYear()} ${hours}:${minutes} ${timezone}`;
  }
  
  function switchToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#currentTemp");
    let unitElement = document.querySelector("#temp-unit");
    temperatureElement.innerHTML = 17;
    unitElement.innerHTML = `°C`;
  }
  
  function switchToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#currentTemp");
    let unitElement = document.querySelector("#temp-unit");
    let temperature = temperatureElement.innerHTML;
    temperature = Number(temperature);
    console.log(Math.round((temperature * 9) / 5 + 32));
    temperatureElement.innerHTML = `${Math.round((temperature * 9) / 5 + 32)}`;
    unitElement.innerHTML = `°F`;
  }
  
  function displayInfo(response) {
    let temp = Math.round(response.data.main.temp);
    let currentTempElement = document.querySelector("#currentTemp");
    currentTempElement.innerHTML = `${temp}`;
    let city = document.querySelector("h1");
    city.innerHTML = response.data.name;
  }
  
  function search(city) {
    let apiKey = "2465cf67c79b581f012f9a417fbb141d";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(displayInfo);
  }
  
  function searchCityInput(event) {
    event.preventDefault();
    let city = document.querySelector("#cityInput").value;
    search(city);
  }
  
  function searchPosition(position) {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let apiKey = "2465cf67c79b581f012f9a417fbb141d";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(displayInfo);
  }
  
  function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchPosition);
  }
  
  let displayedTime = document.querySelector("#current-time");
  displayedTime.innerHTML = `${formatDate()}`;
  
  let citySearchForm = document.querySelector("#search-form");
  citySearchForm.addEventListener("submit", searchCityInput);
  
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", switchToFahrenheit);
  celsius.addEventListener("click", switchToCelsius);
  
  let currentLocButton = document.querySelector("#current-loc-button");
  currentLocButton.addEventListener("click", getCurrentPosition);
  
  search("Paris");
  