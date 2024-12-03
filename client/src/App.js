import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct the import
import AccommodationDetails from "./pages/AccommodationDetails"; // Fix truncated import
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
  <i className="fas fa-bars"></i> {/* Menu icon */}
</button>
        <nav className={`navbar ${menuVisible ? "show" : ""}`}>
  <ul>
    <li>
      <a href="/">
        <i className="fas fa-home"></i> {/* Accommodation icon */}
        <span>Accommodations</span>
      </a>
    </li>
    <li>
      <a href="/trips">
        <i className="fas fa-map-marker-alt"></i> {/* Trips icon */}
        <span>Trips</span>
      </a>
    </li>
    <li>
      <a href="/picnics">
        <i className="fas fa-picnic-table"></i> {/* Picnics icon */}
        <span>Picnics</span>
      </a>
    </li>
    <li>
      <a href="/services">
        <i className="fas fa-cogs"></i> {/* Services icon */}
        <span>Services</span>
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
      <p>© 2024 Openstays. All rights reserved.</p>
    </footer>
  );
};

export default App;
