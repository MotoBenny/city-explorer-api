'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./Modules/weather.js');
const getMovies = require('./Modules/movies.js');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('./Modules/weather', weatherHandler);
app.get('./Modules/movies', movieHandler);

function weatherHandler(request, response) {
  const {city} = request.query;
  getWeather(city)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    });
}

function movieHandler(request, response) {
  const {city} = request.query;
  getMovies(city)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
