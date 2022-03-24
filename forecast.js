'use strict';
const { default: axios } = require('axios');
const WEATHER = process.env.WEATHER_API_KEY;

async function getForecast(req, res) {
  try {
    let city = req.query.city_name; // searchQuery
    let forecastData = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${WEATHER}`);

    let cityForecast = new Forecast(forecastData.data);
    res.send(cityForecast); // weather data from weatherAPI
  } catch (error) {
    res.status(500).send(error.message);
  }
}

class Forecast {
  constructor(cityObj) {
    this.cityName = cityObj.data[0].city_name;
    this.description = cityObj.data[0].weather.description;
    this.date = cityObj.data[0].ob_time;
  }
}

module.exports = getForecast;
