function getDataFromWebAPI() {
    let dataIn = '';
    fetch("https://randomuser.me/api/?results=50")
        .then((dataFromApi) => { return dataFromApi.json(); }) // Waiting for respone from web api
        .then((dataAsObj) => {
            for (const curr of dataAsObj.results) {
                let currentCard = document.createElement('div');
                currentCard.classList.add('profileCard');
                let userName = document.createElement('h3');
                let userEmail = document.createElement('p');
                let userPicture = document.createElement('img');
                userPicture.setAttribute('src', `${curr.picture.large}`);
                userEmail.textContent = `${curr.email}`;
                userName.textContent = `${curr.name.first} ${curr.name.last}`;
                currentCard.appendChild(userPicture);
                currentCard.appendChild(userName).nextSibling;
                currentCard.appendChild(userEmail).nextSibling;
                document.querySelector("#myDiv").appendChild(currentCard);

            }

        });
}

function getDataFromWebAPI2() {

    fetch("https://class-examples.onrender.com/exam/locations")
        .then((dataFromApi2) => {
            return dataFromApi2.json();
        })
        .then((dataAsObj2) => {
            for (const curr of dataAsObj2.locations.slice(1)) {
                const currentLocation = document.createElement('div');
                currentLocation.classList.add('profileCard');
                const locationName = document.createElement('h2');
                locationName.textContent = curr.Vendor_Name;
                const regionName = document.createElement('h4');
                regionName.textContent = curr.Region;
                const lot_lan = document.createElement('p');
                lot_lan.textContent = `lat: ${Number(curr.LON).toFixed(2)} lon: ${Number(curr.LAT).toFixed(2)}`;
                const goToLocationButton = document.createElement('input');
                goToLocationButton.setAttribute('type', "button");
                goToLocationButton.setAttribute('value', "Show on map");
                goToLocationButton.classList.add('mapButton');
                const locationWebsite = document.createElement('a');
                locationWebsite.setAttribute('href', curr.URL);
                locationWebsite.setAttribute('target', "_blank");
                locationWebsite.textContent = "Go to Website";
                const showTemp = document.createElement('input');
                showTemp.setAttribute("type", "button");
                showTemp.setAttribute('value', "Click to show weather");
                showTemp.classList.add('mapButton');
                currentLocation.appendChild(locationName);
                currentLocation.appendChild(regionName).nextElementSibling;
                currentLocation.appendChild(lot_lan).nextElementSibling;
                currentLocation.appendChild(goToLocationButton).nextElementSibling;
                currentLocation.appendChild(locationWebsite).nextElementSibling;
                currentLocation.appendChild(showTemp).nextElementSibling;
                document.querySelector("#myDiv").appendChild(currentLocation);
                // Wait for event listner
                goToLocationButton.addEventListener('click', () => {
                    document.querySelector("#mapDiv iframe").setAttribute('src', `https://www.openstreetmap.org/export/embed.html?bbox=${curr.LAT}%2C${curr.LON}%2C${curr.LAT}%2C${curr.LON}&layer=mapnik&marker=${curr.LON},${curr.LAT}`)
                });

                showTemp.addEventListener('click', () => {
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${curr.LON}&lon=${curr.LAT}&appid=22026426432bae35bfa81d06c43bbdd6`)
                        .then((getWeatherData) => { return getWeatherData.json(); })
                        .then((fetchWeatherData) => {
                            const weatherData = document.createElement('h4');
                            weatherData.textContent = `Current Temp: ${Number(((fetchWeatherData.main.temp) / 10).toFixed(1))} °C`;
                            showTemp.classList.add('hdn');
                            currentLocation.appendChild(weatherData).nextElementSibling;
                        })
                })

            }
        });
}


