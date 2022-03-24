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

// routes
// Send data from weather API to client
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
  constructor(cityObj) { // where foundCity === Seattle object than forecast = desc value
    this.cityName = cityObj.data[0].city_name;
    this.description = cityObj.data[0].weather.description;
    console.log(`this. cityName is: ${this.cityName}` );
    console.log(`this. description is: ${this.description}` );
    // city Lat and Lon.data[0].weather
    // this.latOne = cityObj.data.lat;
    // this.lonOne = cityObj.data.lon;

    // this.foreOne = 

  }
}

// listen

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
