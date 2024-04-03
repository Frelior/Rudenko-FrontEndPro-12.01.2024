const main = document.querySelector('.main')
const buttons = document.querySelector('.header-buttons')

buttons.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const city = event.target.innerText.toUpperCase()
        getWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
            .then(renderWeather)
            .catch(error => console.log(error))
    }
})


async function getWeather(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

async function renderWeather(weatherData) {
    const weatherObj = {
        name: weatherData.name,
        temp: weatherData.main.temp,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        description: weatherData.weather[0].description[0].toUpperCase() + weatherData.weather[0].description.slice(1),
        icon: weatherData.weather[0].icon,
        deg: weatherData.wind.deg,
        speed: weatherData.wind.speed
    }

    for (let key in weatherObj) {
        const element = main.querySelector(`[key = "${key}"]`);
        if (key === 'icon') {
            element.src = `https://openweathermap.org/img/w/${weatherObj[key]}.png`;
        } else {
            element.innerHTML = weatherObj[key];
        }
    }
    
    main.classList.remove('display-none');
}

