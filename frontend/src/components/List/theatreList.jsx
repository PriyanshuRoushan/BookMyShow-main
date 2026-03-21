import React, { useEffect, useState } from "react";
import { useCity } from "../../context/CityContext";
import { useLocation, useNavigate } from "react-router-dom";
import { getShows } from "../../services/showAPI";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

import './theatreList.css'

const TheatreList = () => {
  const { selectedCity, setShowCityModal } = useCity();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Fallback demo state if navigated without explicit movie context
  const movie = location.state?.movie || { title: "Project Hail Mary - (English)", genres: [{name:"Action"}, {name:"Adventure"}, {name:"Drama"}, {name:"Sci-Fi"}] };

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCity?._id) return;

    const fetchShows = async () => {
      setLoading(true);
      try {
        const data = await getShows(selectedCity._id, movie.id, new Date().toISOString().split('T')[0]);
        setShows(data);
      } catch (err) {
        console.error("Failed to fetch shows", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, [selectedCity, movie.id]);

  // Aggregate Shows into their distinct Theatres
  const theatresMap = {};
  shows.forEach(show => {
      const tId = show.theatreID._id;
      if (!theatresMap[tId]) {
          theatresMap[tId] = {
              theatre: show.theatreID,
              shows: []
          };
      }
      theatresMap[tId].shows.push(show);
  });
  const theatresList = Object.values(theatresMap);

  return (
    <div className="theatre-list-page">
      {/* 1. Header Section */}
      <div className="theatre-movie-header">
        <div className="theatre-movie-container">
            <h1>{movie.title}</h1>
            <div className="theatre-movie-tags">
                {movie.genres && movie.genres.map(g => (
                    <span key={g.name} className="movie-tag">{g.name}</span>
                ))}
            </div>
        </div>
      </div>

      {/* 2. Filters & Dates Section */}
      <div className="theatre-filters-bar">
        <div className="theatre-filters-container">
            <div className="dates-strip">
                <div className="date-item active">
                    <span className="date-month">THU</span>
                    <span className="date-day">26</span>
                    <span className="date-month">MAR</span>
                </div>
                <div className="date-item">
                    <span className="date-month">FRI</span>
                    <span className="date-day">27</span>
                    <span className="date-month">MAR</span>
                </div>
                <div className="date-item">
                    <span className="date-month">SAT</span>
                    <span className="date-day">28</span>
                    <span className="date-month">MAR</span>
                </div>
                <div className="date-item">
                    <span className="date-month">SUN</span>
                    <span className="date-day">29</span>
                    <span className="date-month">MAR</span>
                </div>
            </div>

            <div className="filters-strip">
                <div className="filter-dropdown">
                    English - 4DX <KeyboardArrowDownIcon style={{fontSize: "18px"}}/>
                </div>
                <div className="filter-dropdown">
                    Price Range <KeyboardArrowDownIcon style={{fontSize: "18px"}}/>
                </div>
                <div className="filter-dropdown">
                    Preferred Time <KeyboardArrowDownIcon style={{fontSize: "18px"}}/>
                </div>
                <div className="filter-dropdown">
                    Sort By <KeyboardArrowDownIcon style={{fontSize: "18px"}}/>
                </div>
                <div className="filter-search-icon">
                    <SearchIcon style={{fontSize: "20px"}}/>
                </div>
            </div>
        </div>
      </div>

      {/* Info Strip */}
      <div className="theatre-info-strip">
          <div className="theatre-info-container">
            <div className="info-left">
                <span className="info-badge">LAN</span> indicates subtitle language, if subtitles are available <span className="info-link">Got it</span>
            </div>
            <div className="info-right">
                <span className="dot dot-available"></span> AVAILABLE 
                <span className="dot dot-filling"></span> FAST FILLING
            </div>
          </div>
      </div>

      {/* 3. Theatres List Layout */}
      <div className="theatres-main-content">
          <div className="theatres-list">
              
              {loading ? ( <p className="loading-theatres">Loading theatres...</p> ) : theatresList.length === 0 ? (
                  <div className="no-theatres">
                      <p>Unable to find what you are looking for?</p>
                      <button className="change-loc-btn" onClick={() => setShowCityModal(true)}>Change Location</button>
                  </div>
              ) : (
                  theatresList.map(item => (
                      <div key={item.theatre._id} className="theatre-card">
                          <div className="theatre-card-left">
                              <FavoriteBorderIcon className="theatre-heart-icon" />
                              <div className="theatre-name-wrap">
                                  <h4 className="theatre-name">{item.theatre.brand}: {item.theatre.name}, {selectedCity.name}</h4>
                                  <InfoOutlinedIcon className="theatre-info-icon" />
                              </div>
                              <div className="theatre-amenities">
                                  <span className="amenity-icon">🍿</span>
                                  <span className="amenity-icon">🎫</span>
                              </div>
                          </div>
                          
                          <div className="theatre-card-right">
                              <div className="showtimes-grid">
                                  {item.shows.map(show => (
                                      <div key={show._id} className="showtime-box-wrapper" onClick={() => navigate(`/screens/${show.screenID._id}`)}>
                                          <div className="showtime-box">
                                              <div className="show-time-text">{show.startTime}</div>
                                              <div className="show-format">4DX</div>
                                          </div>
                                          <div className="showtime-tooltip">Non-cancellable</div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  ))
              )}

          </div>
      </div>

    </div>
  );
};

export default TheatreList;
