const apikey = "ab5faaa2a063084f9db907b20ba55439";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Main function to fetch weather
async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const condition = data.weather[0].main.toLowerCase();

        if (condition.includes("cloud")) {
            weatherIcon.src = "images/clouds.png";
        } else if (condition.includes("clear")) {
            weatherIcon.src = "images/clear.png";
        } else if (condition.includes("rain")) {
            weatherIcon.src = "images/rain.png";
        } else if (condition.includes("drizzle")) {
            weatherIcon.src = "images/drizzle.png";
        } else if (condition.includes("mist")) {
            weatherIcon.src = "images/mist.png";
        } else {
            weatherIcon.src = "images/default.png"; 
        }
    } catch (error) {
        alert(error.message);
    }
}

// When user clicks search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    }
});

// When user presses 'Enter'
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// 🧡 Default city when page loads
window.addEventListener("load", () => {
    checkWeather("Vadodara"); // <--- You can change "Vadodara" to any city you want by default
});
