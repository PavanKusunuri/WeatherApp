const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=af3ed4c867c473dd3786dad2d6cb2f06&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to Weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        response.body.daily.data[0].summary +
          "It is currently " +
          response.body.current.temperature +
          "degrees out.There is a " +
          response.body.currently.precipProbability +
          "% chance of Rain."
      );
    }
  });
};

module.exports = forecast;
