const request = require('postman-request');

const forecast = ({ latitude, longitude }, callback) => {
  //we expect latitude and longitude in the location data
  if (!latitude || !longitude) {
    callback('Require valid latitude and longitude');
  } else {
    const url = `http://api.weatherstack.com/current?access_key=07c08db3a5f6c6926283f105b147b424&query=${latitude},${longitude}&units=m`;
    request({ url, json: true }, (err, { body }) => {
      if (err) {
        callback('unable to connect to weather service.');
      } else if (body.error) {
        callback(body.error.info);
      } else {
        const location = body.location.name;
        const temperature = body.current.temperature;
        const forecast = body.current.weather_descriptions[0];
        const precip = body.current.precip;
        callback(undefined, {
          temperature,
          location,
          forecast,
          precip,
        });
      }
    });
  }
};

module.exports = forecast;
