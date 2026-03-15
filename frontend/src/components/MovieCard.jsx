import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";


import {
  fetchPopularMovieslatest,
  getMoviePoster,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchDiscoverMovies
} from '../services/movieService';

import StarIcon from '@mui/icons-material/Star';

import '../styles/components/MovieCard.css';

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

const MovieCard = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovieslatest().then(setMovies);
  }, []);

  return (
    <div className="movie_row">
    {movies.map(movie => (
      <Link 
        to={`/movies/${movie.id}`} 
        key={movie.id} 
        className="movie_link"
      >
        <div className="movie_card">
          <div className="poster_wrapper">
            <img
              src={getMoviePoster(movie.poster_path)}
              alt={movie.title}
            />

            {movie.vote_average > 0 && (
              <div className="rating_overlay">
                <StarIcon style={{ fontSize: 20, color: '#f84464' }} />
                <span className="votes">
                  {movie.vote_average.toFixed(1)}/10. {movie.vote_count?.toLocaleString()} votes
                </span>
              </div>
            )}
          </div>

          <h3>{movie.title}</h3>
          <p>
            {movie.genre_ids
              ?.map(id => GENRE_MAP[id])
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
      </Link>
    ))}

    </div>
  );
};

export default MovieCard;
