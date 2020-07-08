const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=af3ed4c867c473dd3786dad2d6cb2f06&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions +
          "It is currently " +
          body.current.temperature +
          "degrees out.There is a " +
          body.current.precip +
          "% chance of Rain."
      );
    }
  });
};

module.exports = forecast;
