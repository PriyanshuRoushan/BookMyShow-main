import React, { useContext, useEffect, useState } from 'react';
import BannerSlider from '../../components/BannerSlider';
import '../../styles/pages/pagesMovies.css';

import { CityContext } from '../../context/CityContext';
import { fetchPopularMovieslatest } from '../../services/movieService';
import PlaceholderPoster from '../../assets/images/Book_My_Show_Logo.png';
import MovieCard from '../../components/MovieCard';


// Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const Movies = () => {
  const { selectedCity } = useContext(CityContext);

  // ================= GENRES STATE =================
  const [selectedGenres, setSelectedGenres] = useState([]);

  // ================= FILTER STATES =================
  const [openFilter, setOpenFilter] = useState({
    language: false,
    genre: false,
    format: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    language: [],
    genre: [],
    format: [],
  });

  // ================= MOVIES STATES =================
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPopularMovieslatest(20)
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);


  // ================= FILTER FUNCTIONS =================
  const toggle = (key) => {
    setOpenFilter((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCheckboxChange = (type, value) => {
    setSelectedFilters((prev) => {
      const exists = prev[type].includes(value);
      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  };

  const clearFilter = (type) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: [],
    }));
  };

  // Geeneric genres list for demo purposes
  const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
];
const handleGenreToggle = (genreId) => {
  setSelectedGenres((prev) =>
    prev.includes(genreId)
      ? prev.filter((id) => id !== genreId)
      : [...prev, genreId]
  );
};
const filteredMovies =
  selectedGenres.length === 0
    ? movies
    : movies.filter((movie) =>
        selectedGenres.some((id) =>
          movie.genre_ids?.includes(id)
        )
      );

// ============== Main ==============
  return (
    <div className="movies-page">
      <BannerSlider />

      <div className="movies-page-hero">
        <div className="movies-page-container">

          {/* ================= LEFT FILTER ================= */}
          <div className="movies-page-container-left">
            <div className="movies-page-container-left-heading">
              <h2>Filter</h2>

              {/* ================= LANGUAGES ================= */}
              <div className="movies-page-container-left-data">
                <div
                  className={`filter-header ${openFilter.language ? 'open' : ''}`}
                  onClick={() => toggle('language')}
                >
                  <h3>
                    {openFilter.language ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    Languages
                  </h3>
                  <div
                    className="filter-header-clear"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('language');
                    }}
                  >
                    Clear
                  </div>
                </div>

                {openFilter.language && (
                  <div className="filter-content">
                    {['English', 'Hindi', 'Tamil'].map((lang) => (
                      <label key={lang}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.language.includes(lang)}
                          onChange={() => handleCheckboxChange('language', lang)}
                        />
                        {lang}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* ================= GENRES ================= */}
              <div className="movies-page-container-left-data">
                <div
                  className={`filter-header ${openFilter.genre ? 'open' : ''}`}
                  onClick={() => toggle('genre')}
                >
                  <h3>
                    {openFilter.genre ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    Genres
                  </h3>
                  <div
                    className="filter-header-clear"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('genre');
                    }}
                  >
                    Clear
                  </div>
                </div>

                {openFilter.genre && (
                  <div className="filter-content">
                    {['Action', 'Drama', 'Comedy'].map((genre) => (
                      <label key={genre}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.genre.includes(genre)}
                          onChange={() => handleCheckboxChange('genre', genre)}
                        />
                        {genre}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* ================= FORMAT ================= */}
              <div className="movies-page-container-left-data">
                <div
                  className={`filter-header ${openFilter.format ? 'open' : ''}`}
                  onClick={() => toggle('format')}
                >
                  <h3>
                    {openFilter.format ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    Format
                  </h3>
                  <div
                    className="filter-header-clear"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('format');
                    }}
                  >
                    Clear
                  </div>
                </div>

                {openFilter.format && (
                  <div className="filter-content">
                    {['2D', '3D', 'IMAX'].map((format) => (
                      <label key={format}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.format.includes(format)}
                          onChange={() => handleCheckboxChange('format', format)}
                        />
                        {format}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button className="movies-page-container-left-button">
              Book by Cinemas
            </button>
          </div>

          {/* ================= RIGHT MOVIES ================= */}
          <div className="movies-page-container-right">
            <div className="movies-page-container-right-heading">
              <h2>Movies in {selectedCity?.name}</h2>
            </div>
              <div className="movies-page-container-right-heading-togel">
                {genres.map((genre) => (
                  <div
                    key={genre.id}
                    className={`genre-pill ${
                      selectedGenres.includes(genre.id) ? "active" : ""
                    }`}
                    onClick={() => handleGenreToggle(genre.id)}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>

            <div className="movies-page-container-right-comingsoon">
              <h2>Coming Soon</h2>
              <p>Explore Upcoming Movies <ChevronRightIcon /></p>
            </div>

            {/* ================= MOVIE CARDS ================= */}
                {loading ? (
                  <p>Loading movies...</p>
                ) : filteredMovies.length === 0 ? (
                  <p>No movies match the selected genres.</p>
                ) : (
                  <MovieCard isGlobal={true} isGrid={true} className="movies-card-movies" movies={filteredMovies} />
                )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
