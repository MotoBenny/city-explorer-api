'use strict';
const { default: axios } = require('axios');
let cache = require('./cache.js');
const MOVIE = process.env.MOVIE_API_KEY;


function getMovies(city) {
  const key = 'movies-' + city;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE}&query=${city}`;
  if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24 * 30)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseMovie(response.data));
  }

  return cache[key].data;
}

function parseMovie(movieData) {
  try {
    const movieSummaries = movieData.results.map(movie => {
      return new Movie(movie);
    });
    console.log(movieSummaries);
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}


class Movie {
  constructor(movie) {
    this.overview = movie.overview,
    this.vote_average = movie.vote_average,
    this.vote_count = movie.vote_count,
    this.title = movie.title,
    this.img = movie.poster_path,
    this.popularity = movie.popularity,
    this.release_date = movie.release_date;
  }
}

module.exports = getMovies;
