let myLocation={
    lat: 51.505,
    lng: -0.09
}


var map = L.map('map').setView([myLocation.lat, myLocation.lng], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([myLocation.lat, myLocation.lng]).addTo(map);


function getMyLocation(){
    if (!navigator.geolocation) {
        // handle the error with a message
    } else {
        navigator.geolocation.getCurrentPosition(location => {
            console.log(location.coords)
            myLocation.lat=location.coords.latitude
            myLocation.lng=location.coords.longitude
            map.setView([myLocation.lat, myLocation.lng], 13)
            marker.setLatLng([myLocation.lat, myLocation.lng])
        });
    }
}
