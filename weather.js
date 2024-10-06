/**
 * Array of objects with locations of 5 places
 */
const locations = [
    {city: 'Gjøvik', latitude: 60.7957, longitude: 10.6915},
    {city: 'Oslo', latitude: 59.9127, longitude: 10.7461},
    {city: 'Tokyo', latitude: 35.6895, longitude: 139.6917},
    {city: 'Kristiansand', latitude: 58.1467, longitude: 7.9956},
    {city: 'Grimstad', latitude: 58.3405, longitude: 8.5934}
];



const container = document.getElementById('weather-container');

// clears the text in weather container
function clearDocument() {
    container.innerHTML = ``;
}


/**
 * 
 * @param {*} location
 * fetches weather data from a location
 * and creates a div to display the fetched data 
 */
function getWeather(location){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`
    
    fetch(url)
    .then(response => {
        // error handling
        if(!response.ok){
            throw new Error(`Error! status: ${response.status}`)
        }
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

/**
 * Clears document so the old data is removed
 * loops through the array of objects and calls on the function 
 * with the current location beeing looped through
 */
function fetchAll(){
    clearDocument();
    locations.forEach(location => {
        getWeather(location);
    });
}

// initial fetch
fetchAll();


/**
 * function is called upon every hour 
 */
setInterval(fetchAll, 3600000)
