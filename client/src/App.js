import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AccommodationDetails from "./pages/AccommodationDetails";
import Home from "./pages/Home";
import AddStays from "./components/AddStays";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetails";
import Picnics from "./pages/Picnics";
import PicnicDetails from "./pages/PicnicDetails";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import AdminPanel from './pages/AdminPanel'; // Admin Dashboard page
import PaymentModal from "./components/PaymentModal"; // Import the PaymentModal
import { Home as HomeIcon, MapPin, TreePalm, User, Plus } from "lucide-react";

const App = () => {
  const [bookingItems, setBookingItems] = useState([]); // Existing state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  // Function to add new booking items
  const addBookingItem = (newItem) => {
    setBookingItems((prevItems) => [...prevItems, newItem]);
  };

  // Function to remove booking items
  const removeItem = (id) => {
    setBookingItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to open the payment modal
  const openPaymentModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the payment modal
  const closePaymentModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <Header />

      <main className="pt-20 pb-16">
        <Routes>
          <Route path="/accommodation" element={<Home />} />
          <Route
            path="/accommodation/:id"
            element={<AccommodationDetails addBookingItem={addBookingItem} />}
          />
          <Route
            path="/bookings"
            element={
              <Bookings
                items={bookingItems}
                removeItem={removeItem}
                openPaymentModal={openPaymentModal} // Pass openPaymentModal to bookings
              />
            }
          />
          <Route path="/trips" element={<Trips />} />
          <Route
            path="/trips/:id"
            element={<TripDetails addBookingItem={addBookingItem} />}
          />
          <Route
            path="/picnics"
            element={<Picnics />}
          />
          <Route
            path="/picnics/:id"
            element={<PicnicDetails addBookingItem={addBookingItem} />}
          />
          <Route
            path="/services"
            element={<Services addBookingItem={addBookingItem} />}
          />
	<Route path="/admin" element={<AdminPanel />} />
        <Route path="/addStays" element={<AddStays />} />
        </Routes>
      </main>

      {/* Conditionally render the PaymentModal */}
      {isModalOpen && (
        <PaymentModal
          bookingItems={bookingItems} // Pass bookingItems
          closeModal={closePaymentModal} // Pass closePaymentModal
        />
      )}

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
	<Link to={'/admin'}>
        <button className="bg-gray-100 p-2 rounded-full shadow hover:shadow-md">
          <User className="w-6 h-6 text-gray-600" />
        </button>
	</Link>
      </div>
    </header>
  );
};

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Add useNavigate hook
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selected, setSelected] = useState(''); // Default selected

  const navItems = [
    { label: "Home", icon: <HomeIcon />, path: "/accommodation" },
    { label: "Trips", icon: <MapPin />, path: "/trips" },
    { label: "Picnics", icon: <TreePalm />, path: "/picnics" },
    { label: "Services", icon: <User />, path: "/services" },
    { label: "Tab", icon: <Plus />, path: "/bookings" },
  ];

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

  const buttonVariants = {
    initial: {
      gap: 0,
      paddingLeft: ".5rem",
      paddingRight: ".5rem",
    },
    animate: (isSelected) => ({
      gap: isSelected ? ".5rem" : 0,
      paddingLeft: isSelected ? "1rem" : ".5rem",
      paddingRight: isSelected ? "1rem" : ".5rem",
    }),
  };

  const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
  };

  const transition = {
    delay: 0.1,
    type: "spring",
    bounce: 0,
    duration: 0.35,
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10 transition-transform ${
        showNav ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <nav className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isSelected = location.pathname === item.path || selected === item.path;

          return (
            <motion.button
              key={item.path}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={isSelected}
              transition={transition}
              onClick={() => {
                setSelected(item.path); // Update selected state
                navigate(item.path); // Navigate to the corresponding path
              }}
              className={`relative flex items-center rounded-full px-4 py-2 text-sm font-medium ${
                isSelected ? "bg-blue-500/15 text-blue-500" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {item.icon}
              <AnimatePresence>
                {isSelected && (
                  <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};
export default App;
