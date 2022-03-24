'use strict';
const { default: axios } = require('axios');
const MOVIE = process.env.MOVIE_API_KEY;

async function getMovies(req, res) {
  try {
    let location = req.query.city_name;
    let moviesArr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE}&language=en-US&query=${location}&include_adult=false`);
  
    let moviesParsed = new MovieData(moviesArr.data);
    res.send(moviesParsed);
  } catch (error) {
    res.status(500).send(error.message);
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

module.exports = getMovies;
