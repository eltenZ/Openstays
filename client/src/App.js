import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccommodationDetails from "./pages/AccommodationDetails";
import Home from "./pages/Home";
import "./App.css"; // Ensure the styles are applied

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accommodation/:id" element={<AccommodationDetails />} />
        {/* Add future routes for Trips, Picnics, Services */}
      </Routes>
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
      <div className="logo">
        <span className="logo-open">Open</span>
        <span className="logo-stays">stays</span>
      </div>
      <button
        className="menu-button"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        Menu
      </button>
      <nav className={`navbar ${menuVisible ? "show" : ""}`}>
        <ul>
          <li>
            <a href="/">Accommodations</a>
          </li>
          <li>
            <a href="/trips">Trips</a>
          </li>
          <li>
            <a href="/picnics">Picnics</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <p>© 2024 Openstays. All rights reserved.</p>
    </footer>
  );
};

export default App;
