import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AccommodationDetails from "./pages/AccommodationDetails";
import Home from "./pages/Home";
import AddStays from "./pages/AddStays";
import AddExperiences from "./pages/addExperiences";
import Experiences from "./pages/Experiences";
import AdminDashboard from "./pages/AdminPanel";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";

// 🔥 Trip context
import { TripProvider } from "./context/TripContext";
import Trips from "./components/Trips"; // <-- floating trip modal

const App = () => {
  return (
    <TripProvider>
      <Router>
        <ScrollToTop />

        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="pt-20 pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accommodation/:id" element={<AccommodationDetails />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/addStays" element={<AddStays />} />
            <Route path="/addExperiences" element={<AddExperiences />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* 🔥 Floating Trips Modal */}
        <Trips />
      </Router>
    </TripProvider>
  );
};

export default App;
