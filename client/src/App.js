// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Update this to match the correct path
import AccommodationDetails from './pages/AccommodationDetails'; // Update this as well

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accommodation/:id" element={<AccommodationDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
