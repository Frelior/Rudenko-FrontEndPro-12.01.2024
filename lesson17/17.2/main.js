const main = document.querySelector('.main')
const btnGroup = document.querySelector('.btn-group')
const weatherXhr = new XMLHttpRequest()


weatherXhr.onload = () => {
    if (weatherXhr.status >= 200 && weatherXhr.status < 300) {
        const response = JSON.parse(weatherXhr.responseText);

        //rendering weather info
        const weatherInfoTemplate = `
            <div class="card-body">
                <h4 class="card-title">Weather in ${response.name}</h4>
                <div class="card-desc">
                    <p class="card-text">${response.weather[0].description[0].toUpperCase() + response.weather[0].description.slice(1)}</p>
                    <img src="https://openweathermap.org/img/w/${response.weather[0].icon}.png" alt="img">
                </div>
                <hr>
                <p class="card-text">Temperature: ${response.main.temp}°C</p>
                <p class="card-text">Pressure: ${response.main.pressure} hPa</p>
                <p class="card-text">Humidity: ${response.main.humidity}%</p>
                <p class="card-text">Wind Speed: ${response.wind.speed} m/s</p>
                <p class="card-text">Wind Direction: ${response.wind.deg}°</p>
            </div>`
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = weatherInfoTemplate;
    
        main.textContent = '';
        main.appendChild(card);
    } else {
        console.log('Error loading weather data' + weatherXhr.status);
    }
}

btnGroup.addEventListener('click', (event) => {
    if (event.target.tagName === 'LABEL') {
        const city = event.target.textContent
        getRequestForCity(city)
    }
})

function getRequestForCity(city) {
    weatherXhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`);
    weatherXhr.send();
}