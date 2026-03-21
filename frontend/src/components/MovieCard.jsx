import React, { useEffect, useState, useRef } from 'react';
import {Link} from "react-router-dom";


import {
  fetchPopularMovieslatest,
  getMoviePoster,
} from '../services/movieService';

import StarIcon from '@mui/icons-material/Star';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

const MovieCard = ({ isGlobal, isGrid, className, movies: propMovies }) => {
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    if (!propMovies) {
      fetchPopularMovieslatest(10).then(setFetchedMovies);
    }
  }, [propMovies]);

  const displayMovies = propMovies || fetchedMovies;

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={`row_wrapper ${isGrid ? 'grid_wrapper' : ''}`}>
      {!isGrid && (
        <div 
          className="scroll_btn left_btn" 
          onClick={() => handleScroll('left')}
        >
          <ChevronLeftIcon fontSize="large" />
        </div>
      )}

      <div className={`${isGrid ? 'movie_grid_container' : 'movie_row'} ${isGlobal && !isGrid ? 'global_movie_row' : ''} ${className || ''}`} ref={rowRef}>
      {displayMovies.map(movie => (
        <Link 
          to={`/movies/${movie.id}`} 
          key={movie.id} 
          className={`movie_link ${isGlobal ? 'global_movie_link' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <div className={`movie_card ${isGlobal ? 'global_movie_card' : ''}`}>
            <div className="poster_wrapper">
              <img
                src={getMoviePoster(movie.poster_path)}
                alt={movie.title}
              />

              {movie.vote_average > 0 && (
                <div className="rating_overlay">
                  <StarIcon style={{ fontSize: 16, color: '#f84464' }} />
                  <span className="votes">
                    {movie.vote_average.toFixed(1)}/10&nbsp;&nbsp;{movie.vote_count?.toLocaleString()} Votes
                  </span>
                </div>
              )}
            </div>

            <div className={isGlobal ? 'global_movie_info' : 'regular_movie_info'}>
              <h3>{movie.title}</h3>
              <p>
                {movie.genre_ids
                  ?.map(id => GENRE_MAP[id])
                  .filter(Boolean)
                  .join("/")}
              </p>
            </div>
          </div>
        </Link>
      ))}

      </div>

      {!isGrid && (
        <div 
          className="scroll_btn right_btn" 
          onClick={() => handleScroll('right')}
        >
          <ChevronRightIcon fontSize="large" />
        </div>
      )}
    </div>
  );
};

export default MovieCard;
