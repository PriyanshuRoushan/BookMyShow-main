import React from 'react'
import '../../styles/pages/pagesSports.css';
import sportsbanner from '../../assets/images/sportsbanner.avif';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useContext } from 'react';
import { CityContext } from '../../context/CityContext';
import {useState} from 'react';

const Sports = () => {

const { city } = useContext(CityContext);

  // Dropdown open state
  const [openFilter, setOpenFilter] = useState({
    Date: false,
    Catagories: false,
    Price: false,
  });

  // Selected values
  const [selectedFilters, setSelectedFilters] = useState({
    Date: [],
    Catagories: [],
    Price: [],
  });

  // Toggle dropdown
  const toggle = (key) => {
    setOpenFilter((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Checkbox handler
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

  // Clear function
  const clearFilter = (type) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: [],
    }));
  };


  return (
                            // {/* ================= Banner ================= */} 
    <div className='sports-page'>
      <div className="sports-banner">
        <img src={sportsbanner} alt="Sports Banner" />
      </div>

    <div className="sports-page-container">
      {/* LEFT */}
      <div className="sports-container-left">
        
                                  {/* FILTER */}
           <div className="sports-page-container-left">
            <div className="sports-page-container-left-heading">
              <h2>Filter</h2>

              {/* =================DATE ================= */}
              <div className="sports-page-container-left-data">
                <div
                  className={`filter-header ${openFilter.Date ? 'open' : ''}`}
                  onClick={() => toggle('Date')}
                >
                  <h3>
                    {openFilter.Date ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    Dates
                  </h3>

                  <div
                    className="filter-header-clear"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('Date');
                    }}
                  >
                    Clear
                  </div>
                </div>

                {openFilter.Date && (
                  <div className="filter-content">
                    {['English', 'Hindi', 'Tamil'].map((lang) => (
                      <label key={lang}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.Date.includes(lang)}
                          onChange={() => handleCheckboxChange('Date', lang)}
                        />
                        {lang}
                      </label>
                    ))}
                  </div>
                )}
              </div>


              {/* ================= Catagories ================= */}
              <div className="sports-page-container-left-data">
                <div
                  className={`filter-header ${openFilter.Catagories ? 'open' : ''}`}
                  onClick={() => toggle('Catagories')}
                >
                  <h3>
                    {openFilter.Catagories ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    Catagories
                  </h3>

                  <div
                    className="filter-header-clear"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('Catagories');
                    }}
                  >
                    Clear
                  </div>
                </div>

                {openFilter.Catagories && (
                  <div className="filter-content">
                    {['Action', 'Drama', 'Comedy'].map((Catagories) => (
                      <label key={Catagories}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.Catagories.includes(Catagories)}
                          onChange={() => handleCheckboxChange('Catagories', Catagories)}
                        />
                        {Catagories}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* ================= Price ================= */}
              <div className="sports-page-container-left-data">
                <div
                  className={`filter-header ${openFilter.Price ? 'open' : ''}`}
                  onClick={() => toggle('Price')}
                >
                  <h3>
                    {openFilter.Price ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    Price
                  </h3>

                  <div
                    className="filter-header-clear"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('Price');
                    }}
                  >
                    Clear
                  </div>
                </div>

                {openFilter.Price && (
                  <div className="filter-content">
                    {['2D', '3D', 'IMAX'].map((Price) => (
                      <label key={Price}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.Price.includes(Price)}
                          onChange={() => handleCheckboxChange('Price', Price)}
                        />
                        {Price}
                      </label>
                    ))}
                  </div>
                )}
              </div>

            </div>
            <button className="sports-page-container-left-button">Browse by Venues</button>
          </div>
          </div>

      {/* RIGHT */}
      <div className="sports-page-container-right">
            <div className="sports-page-container-right-heading">
              <h2>Sports in {city}</h2>

              <div className="sports-page-container-right-heading-togel">
                <div>Cricket</div>
                <div>Running</div>
                <div>Chess</div>
                <div>Cycling</div>
                <div>Motosports</div>
                <div>Shooting</div>
                <div>Boxing</div>
              </div>
            </div>

            {/* Movie cards will go here */}
          </div>
          </div>
    </div>
  )
}

export default Sports

