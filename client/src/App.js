import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AccommodationDetails from "./pages/AccommodationDetails";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Inquiries from "./pages/Inquiries";
import AdminDashboard from "./pages/AdminPanel";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
<ScrollToTop />
      {/* Header */}
      <Header />

      {/* Page content */}
      <main className="pt-20 pb-16">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/accommodation/:id"
            element={<AccommodationDetails />}
          />

          <Route path="/experiences" element={<Trips />} />

          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/inquiries" element={<Inquiries />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
