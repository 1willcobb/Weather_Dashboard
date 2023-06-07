const search = document.getElementById("search_bar");
const search_history = document.getElementById("search_history");
const current_weather = document.getElementById("current_weather");
const five_day_forecast = document.getElementById("five_day_forecast");
const search_input = document.getElementById("search_input");
const search_button = document.getElementById("search_button");

const api_key = '299904627aa376bb1af068e98cf76490';
var city_name;
let city_lat;
let city_lon;

var geo_location_api;


var pageLaunch = async () => {
    search_storage = getStorage();
    previousSearch(search_storage);
    [city_lat, city_lon] = await searchGeo();
    current();
    callFiveDay();
    storeCity(search_storage);
}

var previousSearch = () => {
    if (!search_storage) {
        return;
    }
    search_history.innerHTML = '';
    for (var i in search_storage) {
        var search_history_button = document.createElement('button')
        search_history_button.setAttribute('id', search_storage[i])
        search_history_button.innerText = search_storage[i]
        search_history.appendChild(search_history_button)
    }
}

var current = async () => {
    const currentWeatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + city_lat + '&lon=' + city_lon + '&appid=' + api_key;
    await fetch(currentWeatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            console.log(data)
            var temp = Math.round(((data.main.temp)-273.15) * (9/5) + 32);
                
            var humidity = Math.round(data.main.humidity/8);
            var windSpeed = Math.round(data.wind.speed/8);
            var date_string = dayjs().format('MMM DD, YYYY')
            var icon = data.weather[0].icon

            current_weather.innerHTML = '';
            const todays_weather = document.createElement("div");
            todays_weather.innerHTML = 
                '<h2>' + data.name + '</h2>' +
                '<div>Today is ' + date_string + '. have a great day!</div>' +
                '<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" />' +
                '<div>Temp: '+ temp +'</div>' +
                '<div>Wind Speed: '+ windSpeed +'mph</div>' + 
                '<div>Humidity: '+ humidity +'%</div>' +
                '<br/>'
            current_weather.appendChild(todays_weather);
        })
}

var callFiveDay = async () => {
    const weather_api = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + city_lat + '&lon=' + city_lon + '&appid=' + api_key;
    await fetch(weather_api )
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            console.log(data)
            for (var i = 0; i < data.list.length; i += 8) {
                
                var avgTemp = 0;
                var avgWind = 0;
                var avgHumidity = 0;
                var avgCloudyness = 0;

                // loop for averages 
                for (var j = i; j < i + 8; j++){
                    avgTemp += data.list[j].main.temp;
                    avgWind += data.list[j].wind.speed;
                    avgHumidity += data.list[j].main.humidity;
                    avgCloudyness += data.list[j].clouds.all;
                }

                avgTemp = avgTemp / 8
                var temp = Math.round(((avgTemp)-273.15) * (9/5) + 32);
                
                var humidity = Math.round(avgHumidity/8);
                var windSpeed = Math.round(avgWind/8);
                var cloudyness = Math.round(avgCloudyness/8);
                var date = data.list[i].dt_txt
                var date_string = dayjs(date).format('MMM DD, YYYY')
                var icon = data.list[i + 3].weather[0].icon

                // generate 5 widgets
                const forecast_widget = document.createElement("a");
                forecast_widget.innerHTML = 
                    '<div>Date: ' + date_string + '</div>' +
                    '<img src="https://openweathermap.org/img/wn/' + icon + '@2x.png" />' +
                    '<div>Temp: '+ temp +'</div>' +
                    '<div>Wind Speed: '+ windSpeed +'mph</div>' + 
                    '<div>Humidity: '+ humidity +'%</div>' +
                    '<br/>'
                five_day_forecast.appendChild(forecast_widget);
            }
        })
}

var searchGeo = async () => {
    const response = await fetch(geo_location_api);
    const data = await response.json();
    city_lat = data[0].lat;
    city_lon = data[0].lon;
    return [city_lat, city_lon];
}

var getStorage = () => {
    var search_storage = localStorage.getItem('weather_search');
    if (search_storage) {
        search_storage = JSON.parse(search_storage);
    } else {
        search_storage = [];
    }
    return search_storage;
}

var storeCity = (search_storage) => {
    console.log(search_storage);
    if (!search_storage.includes(city_name)) {
        search_storage.push(city_name)
    }
    localStorage.setItem('weather_search', JSON.stringify(search_storage));
    previousSearch(search_storage);
}

search_button.addEventListener("click", function(event){
    event.preventDefault()
    five_day_forecast.innerHTML = '';
    city_name = search_input.value;
    geo_location_api = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city_name + '&appid=' + api_key;
    pageLaunch();
});

search_history.addEventListener("click", function(event) {
    event.preventDefault()
    var element = event.target;
    city_name = element.innerText;
    five_day_forecast.innerHTML = '';
    geo_location_api = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city_name + '&appid=' + api_key;
    pageLaunch();
});

pageLaunch()


