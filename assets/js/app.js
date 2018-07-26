//Splash
setTimeout(function hide() {
  $('#pag1').hide('fast');
  document.getElementById('pag2').style.display = 'block';}, 3000);

  var map, infoWindow;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.4188286, lng: -70.64229209999999},
      zoom: 12
    });
    infoWindow = new google.maps.InfoWindow;

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
      lat: -33.4188286,
      lng: -70.64229209999999
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
  }, function () {
    handleLocationError(true, infoWindow, map.getCenter());
  });
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
/*
function initMap() {
// Creamos un mapa con las coordenadas actuales
navigator.geolocation.getCurrentPosition(function(pos) {
lat = -33.48004501644191;
lon = -70.6811756526364;

let myLatlng = new google.maps.LatLng(lat, lon);

let mapOptions = {
  center: myLatlng,
  zoom: 14,
  mapTypeId: google.maps.MapTypeId.SATELLITE,
};

map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

// Creamos el infowindow
infowindow = new google.maps.InfoWindow();

// Especificamos la localización, el radio y el tipo de lugares que queremos obtener
let request = {
  location: myLatlng,
  radius: 5000,
  types: ['restaurant'],
};

// Creamos el servicio PlaceService y enviamos la petición.
let service = new google.maps.places.PlacesService(map);

service.nearbySearch(request, function(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      crearMarcador(results[i]);
    }
  }
});
});
}
*/


/*

   var zomato = require('zomato');

   var client = zomato.createClient({
    userKey: 'c9358b7a8ecbb24bb098d048eda9cb7b', 
  });

  client.getCategories(null, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});



   //apiZomato c9358b7a8ecbb24bb098d048eda9cb7b

const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI("default-application_5b594235e4b093a6a7fb91c5", "e872a24e-4280-473c-aaf6-85fe8964c331");

rapid.call('Zomato', 'getAllCategories', { 
  'apiKey': 'c9358b7a8ecbb24bb098d048eda9cb7b'
  'coordinates': '-33.48004501644191, -70.6811756526364'

  
}).on('success', (payload)=>{
	 
}).on('error', (payload)=>{
	 
});

*/


fetch(`https://developers.zomato.com/c9358b7a8ecbb24bb098d048eda9cb7b/v2.1/geocode?lat=-33.4600915&lon=-70.6550365`) // t=${movie}(titulo)
  .then(response => response.json())  //si la peticion es correcta va a dar la informacion como una promesa
  .then(data => {
    console.log(data);
    renderInfo(data);
  })


