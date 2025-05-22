import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route }
  from "react-router-dom";
import AccommodationDetails
  from "./pages/AccommodationDetails";
import Home from "./pages/Home";
import AddStays from "./components/AddStays";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetails";
import Picnics from "./pages/Picnics";
import PicnicDetails from "./pages/PicnicDetails";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import AdminDashboard from "./pages/AdminPanel";
import PaymentModal from "./components/PaymentModal";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [bookingItems, setBookingItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add a new item to bookings
  const addBookingItem = (newItem) => {
    setBookingItems((prev) => [...prev, newItem]);
  };

  // Remove an item by ID
  const removeItem = (id) => {
    setBookingItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Open/close payment modal
  const openPaymentModal = () => setIsModalOpen(true);
  const closePaymentModal = () => setIsModalOpen(false);

  return (
    <Router>
      {/* Header */}
      <Header />

      {/* Page content */}
      <main className="pt-20 pb-16">
        <Routes>
	    
          <Route path="/home"
            element={<Home />}
          />
          <Route
            path="/accommodation/:id"
            element={
              <AccommodationDetails
                addBookingItem={addBookingItem}
              />
            }
          />
          <Route
            path="/bookings"
            element={
              <Bookings
                items={bookingItems}
                removeItem={removeItem}
                openPaymentModal={openPaymentModal}
              />
            }
          />
          <Route path="/trips"
            element={<Trips />}
          />
          <Route
            path="/trips/:id"
            element={
              <TripDetails
                addBookingItem={addBookingItem}
              />
            }
          />
          <Route path="/picnics"
            element={<Picnics />}
          />
          <Route
            path="/picnics/:id"
            element={
              <PicnicDetails
                addBookingItem={addBookingItem}
              />
            }
          />
          <Route
            path="/services"
            element={
              <Services
                addBookingItem={addBookingItem}
              />
            }
          />
          <Route path="/admin"
            element={<AdminDashboard />}
          />
          <Route path="/addstays"
            element={<AddStays />}
          />
        </Routes>
      </main>

      {/* Payment Modal */}
      {isModalOpen && (
        <PaymentModal
          bookingItems={bookingItems}
          closeModal={closePaymentModal}
        />
      )}

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
