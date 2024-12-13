import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccommodationDetails from './pages/AccommodationDetails'; 
import Home from './pages/Home';
import AddAccommodation from './pages/AddAccommodation'; 

import menuIcon from './assets/icons/menu.svg'; 
import './App.css'; 

const App = () => {
  return (
    <Router>
      <Header /> 
      <main> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodation/:id" element={<AccommodationDetails />} />
          <Route path="/add-accommodation" element={<AddAccommodation />} /> 
          {/* Add future routes for Trips, Picnics, Services */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-open">Open</span>
          <span className="logo-stays">stays</span>
        </div>
      </div>
      <div className="header-right">
        <button 
          className="menu-button" 
          onClick={toggleMenu} 
          aria-label="Toggle navigation menu"
        >
          <img src={menuIcon} alt="Menu" className="menu-icon" />
        </button>
        <nav className={`navbar ${menuVisible ? 'show' : ''}`}>
          <ul>
            <li className="tab">
              <a href="/">
               
                <span>Accommodations</span>
              </a>
            </li>
            <li className="tab">
              <a href="/trips">
                
                <span>Trips</span>
              </a>
            </li>
            <li className="tab">
              <a href="/picnics">
                
                <span>Picnics</span>
              </a>
            </li>
            <li className="tab">
              <a href="/services">
                
                <span>Services</span>
              </a>
            </li>
            <li className="tab">
              <a href="/add-accommodation">
                <span>Add Accommodation</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2024 Openstays. All rights reserved.</p> 
    </footer>
  );
};

export default App;

