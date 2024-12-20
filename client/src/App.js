import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import AccommodationDetails from "./pages/AccommodationDetails";
import Home from "./pages/Home";
import AddAccommodation from "./pages/AddAccommodation";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetails";
import Picnics from "./pages/Picnics";
import PicnicDetails from "./pages/PicnicDetails";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import { Home as HomeIcon, MapPin, TreePalm, User, Plus } from "lucide-react";

const App = () => {
const [bookingItems, setbookingItems] = useState([
    { id: "1", name: "Luxury Villa", price: 5000, nights: 3 },
    { id: "2", name: "Snorkeling Trip", price: 2000, nights: 1 },
  ]);
const removeItem = (id) => {
  setbookingItems((prevItems) => prevItems.filter((item) => item.id !== id));
};
  return (
    <Router>
      <Header />
      
      <main className="pt-20 pb-16">
        <Routes>
          <Route path="/accommodation" element={<Home />} />
          <Route path="/accommodation/:id" element={<AccommodationDetails />} />
  	  <Route path="/bookings" element={<Bookings items={bookingItems} removeItem={removeItem} />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/picnics" element={<Picnics />} />
          <Route path="/picnics/:id" element={<PicnicDetails />} />
          <Route path="/services" element={<Services />} />
	  
        </Routes>
      </main>
      <BottomNav />
    </Router>
  );
};

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-10 py-2 px-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">
          Open<span className="text-gray-800">stays</span>
        </div>
        <button className="bg-gray-100 p-2 rounded-full shadow hover:shadow-md">
          <User className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </header>
  );
};

const BottomNav = () => {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: "Home", icon: HomeIcon, path: "/accommodation" },
    { label: "Trips", icon: MapPin, path: "/trips" },
    { label: "Picnics", icon: TreePalm, path: "/picnics" },
    { label: "Services", icon: User, path: "/services" },
    { label: "Tab", icon: Plus, path: "/Bookings" },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10 transition-transform duration-300 ${
        showNav ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <nav className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? "text-blue-600" : "text-gray-600"}`} />
              <span className={`text-xs ${isActive ? "text-blue-600" : "text-gray-600"}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default App;
