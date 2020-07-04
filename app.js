const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const url =
  "http://api.weatherstack.com/current?access_key=af3ed4c867c473dd3786dad2d6cb2f06&query=New%20York";

request({ url: url, json: true }, (error, response) => {
  const data = JSON.parse(response.body.current);
  console.log(data);
});

// Geocoding
// Address -> Lat/Long -> Weather

// const geocodeURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicGF2YW4tMTciLCJhIjoiY2tjMnBvcHd5MjV5dDM0bXgyNWE5YjRuYiJ9.D0Xfg3FFlPDABvifpMBidQ&limit=1";

// request({ url: geocodeURL, json: true }, (error, response) => {
//   const latitude = response.body.features[0].center[1];
//   const longitude = response.body.features[0].center[0];
//   console.log(latitude, longitude);
// });

geocode("Boston", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});
