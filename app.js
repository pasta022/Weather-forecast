// load on page load with window event listener 
//load weather of pressent location with navigation geolocation
//search bar for forecast and weather
// forecast for other location

//Declaration of variables
const apiKey = '47143b5844f65bee1dea02c6c54cc635'
const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('#search-button');
let open = () => {
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            console.log(lat, long);
            fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&units=metric&appid='+ apiKey)
            .then(response => {
                return response.json()})
            .then(data => {
                const {temp, humidity} = data.main;
                const {name} = data;
                const {description, icon} = data.weather[0];
                const {speed} = data.wind;
                console.log(temp, humidity, name, description, icon, speed);
                document.querySelector('.current-location').innerHTML = 'Weather in '+ name;
                document.querySelector('.current-temperature').innerHTML = temp + ' °C';
                document.querySelector('.current-icon').src = 'https://openweathermap.org/img/wn/'+ icon +'.png';
                document.querySelector('.current-description').innerHTML = description;
                document.querySelector('.current-humidity').innerHTML = 'Humidity: '+ humidity +'%';
                document.querySelector('.current-wind-speed').innerHTML = 'Wind speed: '+ (speed * 3.6).toFixed(2) + 'km/h'
                document.querySelector('.weather').classList.remove('loading');
                document.querySelector('.boxer').classList.remove('current');
            });
        });
    }
    else{
        alert("can't get position");
    }
}

fetchWeather = (city) => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid="+ apiKey +"&units=metric")
    .then(response => {
        return response.json();
    })
    .then(data => {
        const {lon, lat} = data.coord;
        console.log(lon,lat);

        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+  lat +'&lon='+ lon +'&exclude=minutely&units=metric&appid='+ apiKey)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            /* in 1 hour */
                console.log(data.hourly[0]);
                const hour1 = data.hourly[0];
                let {temp} = hour1;
                let { description, icon } = hour1.weather[0];
                console.log(temp, description, icon);
                document.querySelectorAll('.location span')[0].innerHTML = city;
                document.querySelector('.temperature1').innerHTML = temp + ' °C';
                document.querySelector('.icon1').src = 'https://openweathermap.org/img/wn/'+ icon +'.png';
                document.querySelector('.description1').innerHTML = description;
            /* in 4 hours */
                const hour4 = data.hourly[3];
                let temp4 = hour4.temp;
                let description4 = hour4.weather[0].description;
                let icon4 = hour4.weather[0].icon;
                console.log(temp4, description4, icon4);
                document.querySelectorAll('.location span')[1].innerHTML = city;
                document.querySelector('.temperature4').innerHTML = temp4 + ' °C';
                document.querySelector('.icon4').src = 'https://openweathermap.org/img/wn/'+ icon4 +'.png';
                document.querySelector('.description4').innerHTML = description4;
            /* in 12 hours */
                const hour12 = data.hourly[11];
                let temp12 = hour12.temp;
                let description12 = hour12.weather[0].description;
                let icon12 = hour12.weather[0].icon;
                console.log(temp12, description12, icon12);
                document.querySelectorAll('.location span')[2].innerHTML = city;
                document.querySelector('.temperature12').innerHTML = temp12 + ' °C';
                document.querySelector('.icon12').src = 'https://openweathermap.org/img/wn/'+ icon12 +'.png';
                document.querySelector('.description12').innerHTML = description12;
            /* in 24 hours */
                const hour24 = data.hourly[23];
                let temp24 = hour24.temp;
                let description24 = hour24.weather[0].description;
                let icon24 = hour24.weather[0].icon;
                console.log(temp24, description24, icon24);
                document.querySelectorAll('.location span')[3].innerHTML = city;
                document.querySelector('.temperature24').innerHTML = temp24 + ' °C';
                document.querySelector('.icon24').src = 'https://openweathermap.org/img/wn/'+ icon24 +'.png';
                document.querySelector('.description24').innerHTML = description24;
            document.querySelector('.forecast-box').classList.remove('view')
        });
    });
}

function search(){
    fetchWeather(searchBar.value);
}
function enterSearch(event){
    if (event.key == 'Enter'){
        search();
    }
}

searchButton.addEventListener('click', search);
searchBar.addEventListener('keyup', enterSearch);
window.addEventListener('load', open());