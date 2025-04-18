// DOM Elements
const button = document.querySelector(".button");
const inputValue = document.querySelector(".inputValue");
const nameElement = document.querySelector(".name");
const tempElement = document.querySelector(".temp");
const descElement = document.querySelector(".desc");
const dateElement = document.querySelector(".date");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherIcon = document.getElementById("weather-img");
const weatherContainer = document.querySelector(".weather-container");
const errorMessage = document.querySelector(".error-message");

// API Key
const apiKey = "c983aed69b497603ff80d72814dbadd1";

// Create suggestions container
const suggestionsContainer = document.createElement("div");
suggestionsContainer.className = "suggestions";
document.querySelector(".search-box").appendChild(suggestionsContainer);

// Cities database for suggestions (common cities)
const cities = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Berlin",
  "Moscow",
  "Beijing",
  "Rome",
  "Madrid",
  "Amsterdam",
  "Dubai",
  "Singapore",
  "Toronto",
  "Los Angeles",
  "Chicago",
  "Miami",
  "San Francisco",
  "Las Vegas",
  "Barcelona",
  "Mumbai",
  "Delhi",
  "Cairo",
  "Istanbul",
  "Bangkok",
  "Seoul",
  "Hong Kong",
  "Rio de Janeiro",
  "Mexico City",
  "Cape Town",
  "Casablanca",
  "Stockholm",
  "Vienna",
  "Prague",
  "Budapest",
  "Athens",
  "Dublin",
  "Edinburgh",
  "Warsaw",
  "Helsinki",
  "Oslo",
  "Copenhagen",
  "Brussels",
  "Lisbon",
  "Marrakech",
  "Nairobi",
  "Johannesburg",
  "Auckland",
  "Melbourne",
  "Vancouver",
  "Montreal",
  "Boston",
  "Seattle",
  "Denver",
  "Dallas",
  "Houston",
  "Atlanta",
  "New Orleans",
  "Nashville",
  "Kyoto",
  "Shanghai",
  "Manila",
  "Jakarta",
  "Kuala Lumpur",
  "Doha",
  "Abu Dhabi",
  "Tel Aviv",
  "Jerusalem",
  "Beirut",
  "Ankara",
  "Baghdad",
  "Tehran",
  "Riyadh",
  "Zurich",
  "Geneva",
  "Milan",
  "Naples",
  "Florence",
  "Venice",
  "Munich",
  "Frankfurt",
  "Hamburg",
  "Cologne",
  "Lyon",
  "Nice",
  "Marseille",
  "Valencia",
  "Seville",
  "Porto",
  "Lisbon",
  "Taipei",
  "Busan",
  "Osaka",
  "Sapporo",
  "Delhi",
  "Kolkata",
  "Chennai",
  "Bangalore",
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Wellington",
  "Christchurch",
  "Hanoi",
  "Ho Chi Minh City",
  "Manila",
  "Kuala Lumpur",
  "Jakarta",
  "Bali",
];

// Event Listeners
button.addEventListener("click", getWeatherData);
inputValue.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeatherData();
  }
});

// Input event for suggestions
inputValue.addEventListener("input", showSuggestions);

// Close suggestions when clicking outside
document.addEventListener("click", function (event) {
  if (!event.target.closest(".search-box")) {
    suggestionsContainer.innerHTML = "";
  }
});

// Check if there's a saved city in localStorage
document.addEventListener("DOMContentLoaded", function () {
  const savedCity = localStorage.getItem("lastCity");
  if (savedCity) {
    inputValue.value = savedCity;
    getWeatherData();
  }
});

// Show city suggestions
function showSuggestions() {
  const input = inputValue.value.trim().toLowerCase();

  // Clear previous suggestions
  suggestionsContainer.innerHTML = "";

  if (input.length < 2) return; // Only show suggestions after 2 characters

  // Filter cities that match the input
  const matches = cities
    .filter((city) => city.toLowerCase().includes(input))
    .slice(0, 5); // Limit to 5 suggestions

  // If we have exact API city data, we could fetch from API instead
  // For demonstration, we'll use the local array

  if (matches.length > 0) {
    matches.forEach((city) => {
      const suggestion = document.createElement("div");
      suggestion.className = "suggestion-item";
      suggestion.textContent = city;

      suggestion.addEventListener("click", function () {
        inputValue.value = city;
        suggestionsContainer.innerHTML = "";
        getWeatherData();
      });

      suggestionsContainer.appendChild(suggestion);
    });
  }
}

// Main function to get weather data
function getWeatherData() {
  const city = inputValue.value.trim();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  // Save to localStorage
  localStorage.setItem("lastCity", city);

  // Clear suggestions
  suggestionsContainer.innerHTML = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  // Show loading state
  weatherContainer.style.opacity = "0.5";
  nameElement.textContent = "Loading...";
  tempElement.textContent = "";
  descElement.textContent = "";
  humidityElement.textContent = "";
  windElement.textContent = "";
  errorMessage.style.display = "none";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      showError(
        error.message === "City not found"
          ? "City not found. Please check the spelling and try again."
          : "Something went wrong. Please try again later."
      );
      weatherContainer.style.opacity = "0";
    });
}

// Display the weather data
function displayWeatherData(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const { description, icon } = data.weather[0];
  const { speed } = data.wind;

  // Format the date
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  // Update UI
  nameElement.textContent = name;
  dateElement.textContent = formattedDate;
  tempElement.innerHTML = `${Math.round(temp)}&deg;C`;
  descElement.textContent = description;
  humidityElement.textContent = `Humidity: ${humidity}%`;
  windElement.textContent = `Wind: ${speed} m/s`;

  // Set weather icon
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // Show weather container with animation
  weatherContainer.style.opacity = "1";
  weatherContainer.classList.add("visible");
}

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

// Function to get user's location weather
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            inputValue.value = data.name;
            displayWeatherData(data);
          })
          .catch((error) => {
            showError("Unable to fetch weather for your location");
          });
      },
      () => {
        showError("Location permission denied");
      }
    );
  } else {
    showError("Geolocation is not supported by your browser");
  }
}

// Advanced city search using OpenWeatherMap's Geo API
function searchCities(query) {
  const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

  fetch(geocodingUrl)
    .then((response) => response.json())
    .then((data) => {
      suggestionsContainer.innerHTML = "";

      if (data.length > 0) {
        data.forEach((city) => {
          const suggestion = document.createElement("div");
          suggestion.className = "suggestion-item";

          // Format city with country
          const cityDisplay = `${city.name}, ${city.country}`;
          suggestion.textContent = cityDisplay;

          suggestion.addEventListener("click", function () {
            inputValue.value = city.name;
            suggestionsContainer.innerHTML = "";
            getWeatherData();
          });

          suggestionsContainer.appendChild(suggestion);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching city suggestions:", error);
    });
}

// Optional: Uncomment to get weather for user's location on page load
// document.addEventListener('DOMContentLoaded', function() {
//   getLocationWeather();
// });

// Optional: Advanced API-based city search
// This uses the actual API for real-time city suggestions
inputValue.addEventListener("input", function () {
  const query = inputValue.value.trim();

  if (query.length >= 3) {
    // Comment this line if you want to use the local array instead
    searchCities(query);

    // Uncomment this line if you want to use the local array
    // showSuggestions();
  } else {
    suggestionsContainer.innerHTML = "";
  }
});
