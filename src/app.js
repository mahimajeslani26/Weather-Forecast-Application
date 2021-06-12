const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

//set up handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    author: 'Mahima Jeslani',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    author: 'Mahima Jeslani',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    author: 'Mahima Jeslani',
    message: "I'm here to help you.",
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'Provide address for the location.',
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    } else {
      forecast({ latitude, longitude }, (error, { forecast, precip, temperature } = {}) => {
        if (error) {
          return res.send({
            error,
          });
        } else {
          return res.send({
            location,
            forecast,
            precip,
            temperature,
          });
        }
      });
    }
  });
});

app.get('/help/*', (req, res) => {
  res.render('error-404', {
    title: '404 error',
    message: 'Help article not found.',
    author: 'Mahima Jeslani',
  });
});

app.get('*', (req, res) => {
  res.render('error-404', {
    title: '404 error',
    message: 'Page not found.',
    author: 'Mahima Jeslani',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
