import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTheatresByCity } from "../services/theatreAPI";
import { useCity } from "../context/CityContext";
import { useRef } from "react";
import { fetchMovieDetails, getMoviePoster } from "../services/movieService.js";
import { fetchOffersByCategory } from "../services/offersServices.js";
import "../styles/pages/MovieDetailsPage.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedCity } = useCity();

  const [movie, setMovie] = useState(null);
  const [offers, setOffers] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;
const sliderRef = useRef(null);
  /* ==============================
      FETCH MOVIE
  ============================== */
  useEffect(() => {
    fetchMovieDetails(id).then(setMovie);
  }, [id]);

  /* ==============================
      FETCH OFFERS
  ============================== */
  useEffect(() => {
    fetchOffersByCategory("Credit Card").then(setOffers);
  }, []);

  /* ==============================
      FORMAT RUNTIME
  ============================== */
  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours}h ${mins}m`;
  };

  if (!movie) return <h2>Loading...</h2>;

  /* ==============================
      BOOK TICKETS HANDLER
  ============================== */
  const handleBookTickets = async () => {
    if (!selectedCity) {
      alert("Please select a city first from the top navigation bar.");
      return;
    }

    try {
      const theatres = await getTheatresByCity(selectedCity._id);
      if (!theatres || theatres.length === 0) {
        alert(`Movie not available in ${selectedCity.name}`);
      } else {
        const cName = selectedCity.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const mName = movie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        const dateObj = new Date();
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const dateStr = `${year}${month}${day}`;

        navigate(`/movies/${cName}/${mName}/buytickets/${movie.id}/${dateStr}`, { state: { movie } });
      }
    } catch (error) {
      console.error("Error fetching theatres:", error);
      alert("Error checking theatre availability.");
    }
  };

  /* ==============================
      IMAGE URLs
  ============================== */
  const imageUrl = getMoviePoster(movie.poster_path);
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : imageUrl;

  return (
    <div className="movie-details-page">
      
      {/* ================= HERO SECTION ================= */}
      <div
        className="movie-detail-page-hero"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      >
        <div className="hero-overlay"></div>

        <div className="movie-detail-hero-content">
          
          {/* POSTER */}
          <div className="poster-container">
            <img
              src={imageUrl}
              alt={movie.title}
              className="movie-detail-poster"
            />
            <p className="poster-overlay">In Cinemas</p>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="movie-detail-hero-txt">
            
            <h1 className="movie-title">{movie.title}</h1>

            {/* RATING */}
            <div className="rating-box">
              <div className="rating-box-left">
                {" "}
                {movie.vote_average
                  ? movie.vote_average.toFixed(1)
                  : "N/A"}
                /10
              </div>

              <div className="rating-box-right-btn">
                <button>Rate Us</button>
              </div>
            </div>

            {/* META INFO */}
            <div className="movie-meta">
              {formatRuntime(movie.runtime)} •{" "}
              {movie.genres?.map((g) => g.name).join(", ")} •{" "}
              {movie.release_date}
            </div>

            {/* LANGUAGES */}
            <div className="movie-detail-lang">
              {movie.spoken_languages?.map((lang, index) => (
                <div key={index} className="detail-lang-box">
                  {lang.english_name}
                </div>
              ))}
            </div>

            {/* BOOK BUTTON */}
            <button className="book-btn" onClick={handleBookTickets}>
              Book Tickets
            </button>

          </div>
        </div>
      </div>

      {/* ================= OVERVIEW ================= */}
      <div className="movie-detail-overview">
        <h2>About the Movie</h2>
        <p className="overview-detail-movie">
          {movie.overview}
        </p>
      </div>


{/* ================= OFFERS ================= */}
{/* ================= OFFERS ================= */}
<div className="movie-detail-offers">
  <h2 className="offers-heading">Top offers for you</h2>

  <div className="offers-wrapper">

    {/* LEFT BUTTON */}
    <button
      className="offer-nav-btn left"
      onClick={() =>
        sliderRef.current?.scrollBy({
          left: -350,
          behavior: "smooth",
        })
      }
    >
      ◀
    </button>

    {/* SLIDER */}
    <div
      className="offers-slider"
      ref={sliderRef}
    >
      {offers.slice(0, 6).map((offer) => {
        const imageUrl = `${API_URL || ""}${offer.image}`;

        return (
          <div key={offer._id} className="detail-offer-box">
            
            <div className="detail-offer-box-logo">
              <img
                src={imageUrl}
                alt={offer.title}
              />
            </div>

            <div className="detail-offer-box-content">
              <h4 className="detail-offer-box-content-header">
                {offer.title}
              </h4>

              <p className="detail-offer-box-content-bottom">
                {offer.description}
              </p>
            </div>

          </div>
        );
      })}
    </div>

    {/* RIGHT BUTTON */}
    <button
      className="offer-nav-btn right"
      onClick={() =>
        sliderRef.current?.scrollBy({
          left: 350,
          behavior: "smooth",
        })
      }
    >
      ▶
    </button>

  </div>
</div>




    </div>
  );
};

export default MovieDetails;
