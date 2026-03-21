import React from 'react'

import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

// CityAPI
import { useCity } from '../context/CityContext';
import { getCities } from '../services/cityAPI';

// CSS
import '../styles/components/Header.css'

// Frontend component
import Movies from "../pages/Movies/Movies";
import Stream from "../pages/Stream/Stream";
import Events from "../pages/Events/Events";
import Plays from "../pages/Plays/Plays";
import Sports from "../pages/Sports/Sports";
import Activities from "../pages/Activities/Activities";

// logo img
import Logo from '../assets/images/Book_My_Show_Logo.png'
import CricketEvent from "../assets/images/Cricketevent.png";


// Icons
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import BrightnessHighRoundedIcon from '@mui/icons-material/BrightnessHighRounded';
import RedeemRoundedIcon from '@mui/icons-material/RedeemRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import GoogleIcon from '@mui/icons-material/Google';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import AppleIcon from '@mui/icons-material/Apple';


const Header = () => {

  // City selection
  const { selectedCity, setSelectedCity, showCityModal, setShowCityModal} = useCity();

    const selectCity = (city) => {
      setSelectedCity(city);      // store full object
      setShowCityModal(false);
    };

  const [cities, setCities] = useState([]); 

  useEffect(() => {
  const fetchCities = async () => {
    try {
      const data = await getCities();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  fetchCities();
}, []);


  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();


  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
    <header className='navbar'>
      <div className="navbar-left">
        <NavLink to={'/'}>
        <img src={Logo} alt="Book My Show Logo" className="navbar-logo" />
        </NavLink>
        <div className="search-container">
          <SearchIcon className='search-icon' />
          <input 
          type="text" 
          className="search-bar" 
          placeholder="Search for Movies, Events, Plays, Sports and Activities" 
        />
      </div>
        </div>
        
      
      <div className="navbar-right">

          <span 
            className='navbar-city'
            onClick={() => setShowCityModal(true)}>
            {selectedCity?.name || "Select City"}
            <KeyboardArrowDownIcon className='city-down-arrow'/>
          </span>

          {/* =========== login signup ===========*/}
        <button  
          className='navbar-signin'
          onClick={() => setOpenPopup(true)}>
          Sign In
        </button>
        {/* ======== LOGIN POPUP =============== */}
        {openPopup && (
          <div className="auth-overlay">
            <div className="auth-popup">
              <div className="auth-header">
                  <h2 className="auth-header-title">Get Started</h2>
              <div className="auth-header-right">
                <button onClick={() => setOpenPopup(false)} className='auth-popup-close'><ClearIcon style={{color: "gray", fontSize: "25px"}} /></button>
              </div>
              </div>

              <div className="auth-body">
                <button className="auth-btn"><GoogleIcon className="auth-icon" /> Continue with Google</button>
                <button className="auth-btn"><MailOutlineRoundedIcon className="auth-icon" /> Continue with Email</button>
                <button className="auth-btn"><AppleIcon className="auth-icon" /> Continue with Apple</button>

                <p className="auth-divider">OR</p>
                <p className='auth-input-heading'>Email or Phone</p>
                <input
                  type="text"
                  placeholder="Enter your email or phone number"
                  className="auth-input"
                />
                <p className='auth-input-heading'>Password</p>
                <input
                  type="password" 
                  placeholder='Enter the password'
                  className='auth-input'
                />
                <button className='auth-input-submit'>Continue</button>

              </div>
            </div>
          </div>
        )}

        {/* ============= menubutton =============*/}
        <div className="navbar-menubar" onClick={()=> {setMenuOpen(true)}}>
          <MenuIcon />
        </div>
      </div>
    </header>

    {/* =========================================================== */}
                       {/* Secondary Navbar */}
    {/* =========================================================== */}

    <header className="navbar-secondary">
      <nav className="navbar-secondary-right">
        <NavLink to="/movies" end className="navbar-secondary-button">
          Movies
        </NavLink>
        <NavLink to="/stream" className="navbar-secondary-button">
          Stream
        </NavLink>
        <NavLink to="/events" className="navbar-secondary-button">
          Event
        </NavLink>
        <NavLink to="/plays" className="navbar-secondary-button">
          Plays
        </NavLink>
        <NavLink to="/sports" className="navbar-secondary-button">
          Sports
        </NavLink>
        <NavLink to="/activities" className="navbar-secondary-button">
          Activities
        </NavLink>
      </nav>

      <nav className="navbar-secondary-left">
        <NavLink to="/list-your-show" className="navbar-secondary-button">
          List Your Show
        </NavLink>
        <NavLink to="/corporates" className="navbar-secondary-button">
          Corporates
        </NavLink>
        <NavLink to="/offers" className="navbar-secondary-button">
          Offers
        </NavLink>
        <NavLink to="/gift-cards" className="navbar-secondary-button">
          Gift Cards
        </NavLink>
      </nav>
    </header>


        {/* ================================= */}
                  {/*  CITY DROP DOWN */}
        {/* ================================= */}

    {showCityModal && (
      <div
        className="city-modal-overlay"
        onClick={() => setShowCityModal(false)}
      >
        <div className="city-modal" onClick={(e) => e.stopPropagation()}>
          <div className="city-search-container">
            <SearchIcon className="city-search-icon" />
            <input 
              type="text" 
              placeholder="Search for your city" 
              className="city-search-input"
            />
            <ClearIcon className="city-close-icon" onClick={() => setShowCityModal(false)} />
          </div>

          <div className="city-detect-location">
            <RadioButtonCheckedRoundedIcon className="detect-icon" />
            <span>Detect my location</span>
          </div>

          <div className="popular-cities-section">
            <h3>Popular Cities</h3>
            <div className="city-grid">
              {cities.map((city) => (
                <button
                  key={city._id}
                  onClick={() => selectCity(city)}
                  className="city-grid-item"
                >
                  {city.landmarkImage ? (
                    <img 
                      src={`${process.env.REACT_APP_API_URL}${city.landmarkImage}`} 
                      alt={city.name} 
                      className="city-landmark"
                    />
                  ) : (
                    <div className="city-landmark-placeholder"></div>
                  )}
                  <span>{city.name}</span>
                </button>
              ))}
            </div>

            <div className="view-all-cities">
              View All Cities
            </div>
          </div>
        </div>
      </div>
    )}


        {/* ================================= */}
                    {/* Menu Bar */}
        {/* ================================= */}
      <div className={`sidebar-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
        <div className="sidebar" onClick={(e) => e.stopPropagation()}>
          <h2>Hey!</h2>

          <nav className="sidebar-menu">

          <div className="sidebar-menu-login">
            <div className="sidebar-login">
              <img src={CricketEvent} alt="Cricket Event" />

              <p className="sidebar-login-text">
                Unlock special offers & great benefits
              </p>

            <button
              className="sidebar-login-btn"
              onClick={() => {
                setOpenPopup(true);
                setMenuOpen(false);
              }}
            >
              Login / Register
            </button>

            </div>
          </div>

            <div className="sidebar-menu-button">
              <NotificationsNoneIcon className="sidebar-icon-left" />
                <span className="sidebar-button-text">Notifications</span>
              <ChevronRightIcon className="sidebar-icon-right" />
            </div>

             <div className="sidebar-menu-button">
              <WorkOutlineIcon className="sidebar-icon-left" />
              <div className="sidebar-button-container">
                <span className="sidebar-button-text">Your Orders</span>
                <p className='sidebar-button-subtext'>View all your booking & purchases</p>
              </div>
              <ChevronRightIcon className="sidebar-icon-right" />
            </div>

            <div className="sidebar-menu-button">
              <OndemandVideoIcon className="sidebar-icon-left" />
              <div className="sidebar-button-container">
                <span className="sidebar-button-text">Stream Library</span>
                <p className='sidebar-button-subtext'>View all your booking & purchases</p>
              </div>
              <ChevronRightIcon className="sidebar-icon-right" />
            </div>

            <div className="sidebar-menu-button">
              <CreditCardIcon className="sidebar-icon-left" />
              <div className="sidebar-button-container">
                <span className="sidebar-button-text">Play Credit Card</span>
                <p className='sidebar-button-subtext'>View all your booking & purchases</p>
              </div>
              <ChevronRightIcon className="sidebar-icon-right" />
            </div>

            <div className="sidebar-menu-button">
              <ChatRoundedIcon className="sidebar-icon-left" />
              <div className="sidebar-button-container">
                <span className="sidebar-button-text">Help & Support</span>
              <p className='sidebar-button-subtext'>View all your booking & purchases</p>
              </div>
              <ChevronRightIcon className="sidebar-icon-right" />
            </div>

            <div className="sidebar-menu-button">
              <BrightnessHighRoundedIcon className="sidebar-icon-left" />
              <div className="sidebar-button-container">
                <span className="sidebar-button-text">Account & Settings</span>
              <p className='sidebar-button-subtext'>View all your booking & purchases</p>
              </div>
              <ChevronRightIcon className="sidebar-icon-right" />
            </div>

            <div className="sidebar-menu-button">
              <RedeemRoundedIcon className="sidebar-icon-left" />
              <div className="sidebar-button-container">
                <span className="sidebar-button-text">Rewards</span>
              <p className='sidebar-button-subtext'>View all your booking & purchases</p>
              </div>
              <ChevronRightIcon className="sidebar-icon-right" />
            </div>

            <div className="sidebar-menu-button">
              <RadioButtonCheckedRoundedIcon className="sidebar-icon-left" />
                <span className="sidebar-button-text">Book A Change</span>
              <ChevronRightIcon className="sidebar-icon-right" />          
            </div>
          </nav>
        </div>
      </div>
      
      </>
  )
}

export default Header
