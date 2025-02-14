function weatherInfo() {
    let israelCities;
    const city = document.querySelector("#city").value;
    const apiKey = '22026426432bae35bfa81d06c43bbdd6';
    let flag = 0;
    let sunrise;
    let sunset;
    document.querySelector(".mainDiv").textContent = "";
    fetch('https://data.gov.il/api/action/datastore_search?resource_id=b7cf8f14-64a2-4b33-8d4b-edb286fdbd37&limit=1500')
        .then((allIsraelCities) => { return allIsraelCities.json(); })
        .then((allIsraelCitiesAsObj) => {
            israelCities = allIsraelCitiesAsObj.result.records; // Get cities names

            for (let index = 0; index < israelCities.length; index++) {
                if (city.toUpperCase().trim() === israelCities[index]["שם_ישוב_לועזי"].trim()) {
                    flag = 1;
                    break;
                }
            }
            if (city === "") {
                alert("First type city name");
            } else if (!flag) {
                alert("City does not exist or mistype");
            } else {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
                    .then((weatherData) => { return weatherData.json(); })
                    .then((weatherDataAsObj) => {
                        console.log(weatherDataAsObj);
                        sunrise = new Date(weatherDataAsObj.sys.sunrise * 1000);
                        sunset = new Date(weatherDataAsObj.sys.sunset * 1000);


                        const weatherDiv = document.createElement('div');
                        const cityName = document.createElement('h2');
                        cityName.classList.add('cityName');
                        cityName.textContent = `The weather details is ${city} are:`;
                        const cityTemp = document.createElement('li');
                        cityTemp.textContent = `Temp: ${weatherDataAsObj.main.temp}°C`;
                        const cityHumidity = document.createElement('li');
                        cityHumidity.textContent = `Humidity: ${weatherDataAsObj.main.humidity}%`;
                        const fellsLike = document.createElement('li');
                        fellsLike.textContent = `feels like: ${weatherDataAsObj.main.feels_like}°C`;
                        const weatherDiscreption = document.createElement('li');
                        weatherDiscreption.textContent = `Short discreption: ${weatherDataAsObj.weather[0].description}`;
                        const weatherSunrise = document.createElement('li');
                        const weatherSunset = document.createElement('li');
                        weatherSunrise.textContent = `Sunrise: ${sunrise.toLocaleTimeString()}`;
                        weatherSunset.textContent = `Sunset: ${sunset.toLocaleTimeString()}`;
                        weatherDiv.appendChild(cityName);
                        weatherDiv.appendChild(cityTemp).nextSibling;
                        weatherDiv.appendChild(cityHumidity).nextSibling;
                        weatherDiv.appendChild(fellsLike).nextSibling;
                        weatherDiv.appendChild(weatherDiscreption).nextSibling;
                        weatherDiv.appendChild(weatherSunrise).nextSibling;
                        weatherDiv.appendChild(weatherSunset).nextSibling;
                        document.querySelector(".mainDiv").appendChild(weatherDiv);
                    });
            }

        })

}