import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CityProvider } from './context/CityContext';
import './styles/App.css';

import Layout from './components/Layout';
import Home from './pages/Global';
import SeatLayout from './pages/Seat-layout';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import MovieDetails from './pages/MovieDetails';
import Movies from './pages/Movies/Movies';
import Stream from './pages/Stream/Stream';
import Events from './pages/Events/Events';
import Plays from './pages/Plays/Plays';
import Sports from './pages/Sports/Sports';
import Activities from './pages/Activities/Activities';
import ListYourShow from './pages/ListYourShow/ListYourShow';
import Corporates from './pages/Corporates/Corporates';
import Offers from './pages/Offers/Offers';
import GiftCards from './pages/GiftCards/GiftCards';
import LoginRegister from './pages/LoginRegister';
import BookingLayout from './components/bookingLayout';
import SeatListing from './admin/seatlisting';
import TheatreList from './components/List/theatreList';
import ScreenList from './components/List/ScreenList';

function App() {
  return (
    <CityProvider>
      <Router>
        <Routes>
                      {/* ====== Contains Header ======= */}
            <Route element = {<Layout />}>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/movies' element={<Movies/>}/>
                  <Route path='/stream' element={<Stream/>}/>
                  <Route path='/events' element={<Events/>}/>
                  <Route path='/plays' element={<Plays/>}/>
                  <Route path='/sports' element={<Sports/>}/>
                  <Route path='/activities' element={<Activities/>}/>
                  <Route path='/list-your-show' element={<ListYourShow/>}/>
                  <Route path='/corporates' element={<Corporates/>}/>
                  <Route path='/offers' element={<Offers/>}/>
                  <Route path='/gift-cards' element={<GiftCards/>}/>
                  <Route path='/profile/:id' element={<Profile/>}/>
                  <Route path='/movies/:id' element={<MovieDetails/>}/>
                  <Route path='/login' element={<LoginRegister/>}/>
            
            
            {/* ========== TESTING (not completed) ======== */}
                <Route path="/theatres"element={ <TheatreList />}/>
                <Route path="/theatres/:theatreId/screens"element={ < ScreenList/>}/>

            </Route> 
            {/* =========Dose NOt Contain Header ========= */}

            <Route element ={<BookingLayout/>}>
                  <Route path='/screens/:screenId' element={<SeatLayout/>}/>
                  <Route path='/payment/:id/' element={<Payment/>}/>
                  <Route path='/admin' element={<SeatListing/>}/>
            </Route>



        </Routes>
      </Router>
      </CityProvider>
  );
}

export default App;
