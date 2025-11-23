const API_KEY = "c92f26aa6192e629caebac1cb2938dad";

function getWeather() 
{
    const city = document.getElementById("cityInput").value;
    if (!city) return;

    getCurrentWeather(city);
    getForecast(city);
}

function getCurrentWeather(city) 
{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pl&appid=${API_KEY}`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onload = function () {
        console.log("Current weather response:", xhr.responseText);

        const data = JSON.parse(xhr.responseText);

        document.getElementById("currentWeather").innerHTML = `
            <div class="weather-card">
                <h2>Bieżąca pogoda</h2>
                <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                <h3>${data.main.temp.toFixed(1)}°C</h3>
                <p>Odczuwalna: ${data.main.feels_like.toFixed(1)}°C</p>
                <p>${data.weather[0].description}</p>
            </div>
        `;
    };

    xhr.send();
}

   function getForecast(city) 
   {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pl&appid=${API_KEY}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log("Forecast response:", data);

            const forecastDiv = document.getElementById("forecast");
            forecastDiv.innerHTML = "<h2>Prognoza na 3 dni (co 3 godziny)</h2>";

            const days = {};

            data.list.forEach(item => {
                const [date, time] = item.dt_txt.split(" ");

                if (!days[date]) days[date] = [];
                if (days[date].length < 8) days[date].push(item);
            });

            const dates = Object.keys(days).slice(0, 3);

            dates.forEach(date => {
                forecastDiv.innerHTML += `<h3 style="margin-top:20px;">${date}</h3>`;

                days[date].forEach(item => {
                    const card = `
                        <div class="weather-card">
                            <h4>${item.dt_txt.split(" ")[1].slice(0, 5)}</h4>
                            <img class="weather-icon" src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">
                            <p>${item.main.temp.toFixed(1)}°C</p>
                            <p>Odczuwalna: ${item.main.feels_like.toFixed(1)}°C</p>
                            <p>${item.weather[0].description}</p>
                        </div>
                    `;
                    forecastDiv.innerHTML += card;
                });
            });
        });
}