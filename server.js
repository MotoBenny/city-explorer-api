'use strict';
// imports
// const e = require('express');


// requires
require('dotenv').config();
const { response } = require('express');
const express = require('express');
const { default: axios } = require('axios');
const cors = require('cors'); // to share data

// use
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
const WEATHER = process.env.WEATHER_API_KEY;
const MOVIE = process.env.MOVIE_API_KEY;

// routes
// Send data from weather API to client
// WEATHER GET CALL
app.get('/weather', async (req, res) => {
  try {
    let city = req.query.city_name; // searchQuery
    let forecastData = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${WEATHER}`);

    let cityForecast = new Forecast(forecastData.data);
    res.send(cityForecast); // weather data from weatherAPI
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Movie API call.
app.get('/movies', async (req, res) => {
  try {
    let location = req.query.city_name;
    let moviesArr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE}&language=en-US&query=${location}&include_adult=false`);

    let moviesParsed = new MovieData(moviesArr.data);
    res.send(moviesParsed);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// invalid URL catch
app.get('*', (req, res) => {
  res.send('This page does not exist, move along');
});

// error handling

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// classes constructor

class Forecast {
  constructor(cityObj) {
    this.cityName = cityObj.data[0].city_name;
    this.description = cityObj.data[0].weather.description;
    this.date = cityObj.data[0].ob_time;
  }
}

class MovieData {
  constructor(moviesArr) {
    this.moviesParsed = [];
    moviesArr.results.forEach(movie => {
      this.moviesParsed.push({ title: movie.original_title, overview: movie.overview, vote_average: movie.vote_average, vote_count: movie.vote_count, img: movie.poster_path, popularity: movie.popularity, release_date: movie.release_date });
    });

  }
}

// listen

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

