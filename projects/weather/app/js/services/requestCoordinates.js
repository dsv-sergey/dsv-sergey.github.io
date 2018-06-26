UserInfo.getInfo(function(data) {
    var userLocation = [data[position][latitude], data[position][longitude]];
    
    // the "data" object contains the info
  }, function(err) {
    // the "err" object contains useful information in case of an error
  });
  
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY
let GOOGLE_API_KEY = "AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY";
let getLatLng = (addr) => fetch("https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}")
  .then((req) => req.json())
  .then((data) => data.results[0].geometry.location);
  /*  { lat: 53.890838, lng: 27.5372046 }  */