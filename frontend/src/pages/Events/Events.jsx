import React, { useContext, useState } from 'react';
import '../../styles/pages/pagesEvents.css';
import eventsbanner from '../../assets/images/eventbanner.webp';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { CityContext } from '../../context/CityContext';

const Events = () => {

  const { city } = useContext(CityContext);

  // Dropdown open state
  const [openFilter, setOpenFilter] = useState({
    Date: false,
    Categories: false,
    Price: false,
  });

  // Selected values
  const [selectedFilters, setSelectedFilters] = useState({
    Date: [],
    Categories: [],
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

  // Clear filter
  const clearFilter = (type) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: [],
    }));
  };

  return (
    <div className="events-page">

      {/* ================= Banner ================= */}
      <div className="events-banner">
        <img src={eventsbanner} alt="Events Banner" />
      </div>

      <div className="events-page-container">

        {/* ================= LEFT ================= */}
        <div className="events-container-left">
          <div className="events-page-container-left">

            <div className="events-page-container-left-heading">
              <h2>Filter</h2>

              {/* ================= DATE ================= */}
              <div className="events-page-container-left-data">
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
                    {['Today', 'Tomorrow', 'This Weekend'].map((date) => (
                      <label key={date}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.Date.includes(date)}
                          onChange={() => handleCheckboxChange('Date', date)}
                        />
                        {date}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* ================= CATEGORIES ================= */}
              <div className="events-page-container-left-data">
                <div
                  className={`filter-header ${openFilter.Categories ? 'open' : ''}`}
                  onClick={() => toggle('Categories')}
                >
                  <h3>
                    {openFilter.Categories ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    Categories
                  </h3>

                  <div
                    className="filter-header-clear"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('Categories');
                    }}
                  >
                    Clear
                  </div>
                </div>

                {openFilter.Categories && (
                  <div className="filter-content">
                    {['Music', 'Comedy', 'Workshop', 'Meetup', 'Exhibition'].map((cat) => (
                      <label key={cat}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.Categories.includes(cat)}
                          onChange={() => handleCheckboxChange('Categories', cat)}
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* ================= PRICE ================= */}
              <div className="events-page-container-left-data">
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
                    {['Free', '₹0 - ₹500', '₹500+'].map((price) => (
                      <label key={price}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.Price.includes(price)}
                          onChange={() => handleCheckboxChange('Price', price)}
                        />
                        {price}
                      </label>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <button className="events-page-container-left-button">
              Browse by Venues
            </button>

          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="events-page-container-right">
          <div className="events-page-container-right-heading">
            <h2>Events in {city}</h2>

            <div className="events-page-container-right-heading-togel">
              <div>Music</div>
              <div>Comedy</div>
              <div>Workshop</div>
              <div>Meetup</div>
              <div>Exhibition</div>
            </div>
          </div>

          {/* Event cards will go here */}
        </div>

      </div>
    </div>
  );
};

export default Events;
