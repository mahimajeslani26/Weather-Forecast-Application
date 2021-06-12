const request = require('postman-request');

//takes in adress and gives geocode as latitude and longitude for the address
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWplczEyMyIsImEiOiJjajZ0ZGNmYmwwZ2EyMzhvMzBnMG1ubTZnIn0.rRal0x_beWhKtmOEZahvww&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('unable to connect to geocode service.', undefined);
    } else if (body.features.length === 0) {
      callback(
        'Cannot search for the entered location. Try searching again usin ga valid location name',
        undefined
      );
    } else {
      const place_name = body.features[0].place_name;
      const longLang = body.features[0].center;
      const longitude = longLang[0];
      const latitude = longLang[1];
      callback(undefined, {
        latitude,
        longitude,
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
