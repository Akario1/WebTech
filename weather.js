const locations = [
    {city: 'Gjøvik', latitude: 60.7957, longitude: 10.6915},
    {city: 'Oslo', latitude: 59.9127, longitude: 10.7461},
    {city: 'Tokyo', latitude: 35.6895, longitude: 139.6917},
    {city: 'Kristiansand', latitude: 58.1467, longitude: 7.9956},
    {city: 'Grimstad', latitude: 58.3405, longitude: 8.5934}
];



const container = document.getElementById('weather-container');

function clearDocument() {
    container.innerHTML = ``;
}

function getWeather(location){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`
    
    fetch(url)
    .then(response => {
         return response.json();
    })

    .then(data => {
        
        const currentWeather = data.current_weather;
        const weatherDiv = document.createElement('div');

        weatherDiv.classList.add('city-weather')
        weatherDiv.innerHTML = `
            <h2>${location.city}</h2>
            <p>Last updated: ${currentWeather.time}GMT</p>
            <p>Temperature: ${currentWeather.temperature}°C</p>
            <p>Windspeed: ${currentWeather.windspeed}km/h</p>
        `;

        container.appendChild(weatherDiv);
    })
}

function fetchAll(){
    clearDocument();
    locations.forEach(location => {
        getWeather(location);
    });
}

fetchAll();

setInterval(fetchAll, 900000)
