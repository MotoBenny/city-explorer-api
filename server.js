'use strict';
// imports
// const e = require('express');


// requires
require('dotenv').config();
const { response } = require('express');
const express = require('express');
const { default: axios } = require('axios');
const cors = require('cors'); // to share data
const getForecast = require('./forecast.js');
const getMovies = require('./movies.js');

// use
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;



// routes
// Send data from weather API to client
// WEATHER GET CALL
app.get('./forecast', getForecast);

// Movie API call.
app.get('/movies', getMovies);

// error handling

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// classes 

// Class for getForecast within ./forecast.js
// Class for getMovies within ./movies.js

// listen

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

