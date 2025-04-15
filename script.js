
const apikey = "ab5faaa2a063084f9db907b20ba55439";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        alert("City not found. Please try again.");
        return;
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const condition = data.weather[0].main.toLowerCase();

    if (condition == "clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (condition == "clear") {
        weatherIcon.src = "images/clear.png";
    } else if (condition == "rain") {
        weatherIcon.src = "images/rain.png";
    } else if (condition == "drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (condition == "mist") {
        weatherIcon.src = "images/mist.png";
    } else {
        weatherIcon.src = "images/default.png"; 
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    }
});

searchBox.addEventListener("keypress", (e) => {
if (e.key === "Enter") {
searchBtn.click();
}
});
