console.log("lets start using API's")

if (!navigator.geolocation) {
    // handle the error with a message
} else {
    navigator.geolocation.getCurrentPosition(location => {
        let myLat=location.coords.latitude
        let myLon=location.coords.longitude
        getSunriseSunset(myLat, myLon)
    });
}

function getSunriseSunset(lat, lon){
    let query='https://api.sunrise-sunset.org/json?'+
        'lat='+lat+
        '&lng='+lon+
        '&date=today'
        console.log(query)
    fetch(query)
        .then(response=>response.json())
        .then(data=>{
            // console.log(data)
            console.log("sunrise: "+data.results.sunrise)
            console.log("sunset: "+data.results.sunset)
        })
}


