const locations = [
    {city: 'Gjøvik', latitude: 60.7957, longitude: 10.6915},
    {city: 'Oslo', latitude: 59.9127, longitude: 10.7461},
    {city: 'Tokyo', latitude: 35.6895, longitude: 139.6917},
    {city: 'Kristiansand', latitude: 58.1467, longitude: 7.9956},
    {city: 'Grimstad', latitude: 58.3405, longitude: 8.5934}
];

function fetchWeather(location){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`
    fetch(url)
    .then(response => {
         return response.json();
    })
    .then(data => {
        const currentWeather = data.current_weather;
        const container = document.getElementById('weather-container');
        
        const cityDiv = document.createElement('div');
        cityDiv.classList.add('city-weather');
        
        cityDiv.innerHTTML = `
            <h2>${location.city}</h2>
            <p>Last Updated ${currentWeather.time} GMT</p>
            <p>Temperature: ${currentWeather.temp} °C</p>
            <p>Wind speed: ${currentWeather.windspeed} km/h</p>
        `;
        container.appendChild(cityDiv);
    })
    }
    
    /** 
    url1 = `https://api.open-meteo.com/v1/forecast?latitude=60.7957&longitude=10.6915&current_weather=true`
    fetch(url1)
    .then(response => {
        return response.json()
    })

    .then(data => {
        const currentWeather = data.current_weather;
        document.getElementById('temp-g').textContent = `Temperature: ${currentWeather.temperature}°C`
        document.getElementById('wind-g').textContent = `Windspeed: ${currentWeather.windspeed} km/h`
    
    })
    */




function fetchAll(){
    locations.forEach(location => {
        fetchWeather(location);
    })
}

fetchAll();
setInterval(fetchAll, 3600000);
