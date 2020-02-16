import makeMapInteractive from './interactivity.js';
import addListeners from './listeners.js';
import {
  startSearch,
  createNewUser,
  pushNewLocation,
} from './search-functions.js';
import { MVRS_API_KEY } from './env.js';
//  getting geolocation

// object returned :
// latitude: 37.790638699999995
// longitude: -122.390079
// altitude: null
// accuracy: 7725
// altitudeAccuracy: null
// heading: null
// speed: null
// ----------------------

// create your .env file with your API_KEY
// export const API_KEY='${VALUE}'
// add it to your apiKey object

var platform = new H.service.Platform({
  apikey: MVRS_API_KEY,
});
var geocoder = platform.getGeocodingService();

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map;
initmap();

function initmap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      map = new H.Map(
        document.getElementById('mapContainer'),
        maptypes.vector.normal.map,
        {
          zoom: 18,
          center: {
            lng: long,
            lat: lat,
          },
        }
      );
      addListeners(map);
      makeMapInteractive(map, maptypes);
      createNewUser(long, lat);
    });
    navigator.geolocation.watchPosition(function(position) {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;

      const marker = new H.map.Marker({
        lng: long,
        lat: lat,
      });
      map.addObject(marker);
      pushNewLocation(long, lat);
    });
  } else {
    console.error('Geolocation is not supported by this browser!');
  }
}
