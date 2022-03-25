'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getForecast = require('../forecast.js');
const getMovies = require('../movies.js');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('./forecast', getForecast);

app.get('/movies', getMovies);

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
