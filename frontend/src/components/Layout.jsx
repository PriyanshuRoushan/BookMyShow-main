import React, { useContext, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { CityContext } from '../context/CityContext';

const Layout = () => {
  const { selectedCity, setShowCityModal } = useContext(CityContext);
  const location = useLocation();

  useEffect(() => {
    // List of second navbar routes that require a city to be selected
    const secondNavRoutes = [
      '/movies', '/stream', '/events', '/plays', 
      '/sports', '/activities', '/list-your-show', 
      '/corporates', '/offers', '/gift-cards'
    ];

    if (!selectedCity && secondNavRoutes.some(route => location.pathname.startsWith(route))) {
      setShowCityModal(true);
    }
  }, [location.pathname, selectedCity, setShowCityModal]);

  return (
    <div>
      <Header />
      <Outlet/>
      <Footer />
    </div>
  )
}

export default Layout;

