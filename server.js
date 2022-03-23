'use strict';
// imports
// const e = require('express');


const { response } = require('express');
// requires
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors'); // to share data


// use
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;



// routes

// Send data from weather API to client
app.get('/weather', (req, res) => {
  try {
    let city = req.query.city_name; // searchQuery
    let cityObj = data.find(x => x.city_name === city);
    let cityForecast = new Forecast(cityObj);
    res.send(cityForecast); // weather data from weatherAPI
  } catch (error) {
    console.error(`Your requested city is not in the database. ${error}`);
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
    this.cityName = cityObj.city_name;
    // day 1 below
    this.forecastOne = cityObj.data[0].weather.description;
    this.dateOne = cityObj.data[0].valid_date;
    // day 2 below
    this.forecastTwo = cityObj.data[1].weather.description;
    this.dateTwo = cityObj.data[1].valid_date;
    // day 3 below
    this.forecastThree = cityObj.data[2].weather.description;
    this.dateThree = cityObj.data[2].valid_date;
  }
}

// listen

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
