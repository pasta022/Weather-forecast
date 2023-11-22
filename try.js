fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid="+ apiKey +"&units=metric")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
    })