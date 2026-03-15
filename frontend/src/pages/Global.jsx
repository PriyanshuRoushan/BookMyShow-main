import React from 'react';
import BannerSlider from '../components/BannerSlider';
import MovieCard from '../components/MovieCard';

import homepageBanner from '../assets/images/homepagebanner2.avif';
import comedyevent from '../assets/images/Comedyevent.png';
import workshopevent from '../assets/images/Workshopevent.png';
import musicevent from '../assets/images/Musicevent.png';
import cricketevent from '../assets/images/Cricketevent.png'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import '../styles/global/global.css';

import { upcomingMovies } from '../services/movieService';
const Global = () => {
  return (
    <div>
      {/* Banner Slider */}
      <BannerSlider />

      <div className="global-main">
        <h2>Recommended Movies</h2>

        {/* Movie List */}
        <MovieCard />

        {/* Homepage Banner */}
        <div className="homepagebanner">
          <img src={homepageBanner} alt="Homepage Banner" />
        </div>

        {/*============= Events Section =============*/}
        <div className="events">
          <h2>The Best Of Events</h2>
          <div className="event-banner" onClick={'/event'}>
            <img src={comedyevent} alt="Comedy Event" />
            <img src={musicevent} alt="Music Event" />
            <img src={cricketevent} alt="Cricket Event" />
            <img src={workshopevent} alt="Workshop Event" />
          </div>
        </div>
      </div>
      {/* ========== PREMIERE ============= */}
        <div className="premier">
          <div className="premier-header">
          <PlayCircleIcon style={{ fontSize: 70, color: '#d51b3d' }} />
          <div className="premier-header-content">
                <h1>PREMIERE</h1>
                <p>Watch new movies at home, every Friday</p>
            </div>
          </div>
          <div className="premier-main">
            <h2>Premieres</h2>
            <p>Brand new release every Friday</p>

            
          </div>
        </div>
    </div>
  );
};

export default Global;
