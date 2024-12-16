import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Wifi, Car, Coffee, ShieldCheck } from "lucide-react";
import AccommodationFilters from "../components/AccommodationFilters"; // Import the new filter component

const Home = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch accommodations on component mount
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/accommodations");
        if (!response.ok) {
          throw new Error("Failed to fetch accommodations.");
        }
        const data = await response.json();
        setAccommodations(data);
        setFilteredAccommodations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  // Placeholder for applying filters (you can implement logic for filter results here)
  const applyFilters = (filters) => {
    console.log("Filters applied:", filters);
    // Example filtering logic based on amenities or price range can go here
    const filtered = accommodations.filter((accommodation) => {
      let matches = true;
      // Add filtering logic based on filters object
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange;
        matches = matches && accommodation.price_per_night >= minPrice && accommodation.price_per_night <= maxPrice;
      }
      if (filters.destination) {
        matches = matches && accommodation.location.toLowerCase().includes(filters.destination.toLowerCase());
      }
      if (filters.amenities) {
        Object.keys(filters.amenities).forEach((amenity) => {
          if (filters.amenities[amenity]) {
            matches = matches && accommodation[amenity];
          }
        });
      }
      return matches;
    });

    setFilteredAccommodations(filtered);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home">
      {/* Filters Component */}
      <AccommodationFilters applyFilters={applyFilters} />

      {/* Accommodation Cards */}
      <div className="accommodations grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccommodations.length > 0 ? (
          filteredAccommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className="w-full max-w-[370px] mx-auto bg-white rounded-[20px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-[340px]">
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <ShieldCheck size={16} className="text-green-500 fill-green-500" />
                  <span className="text-white text-sm font-medium">Verified</span>
                </div>
                <img
                  src={accommodation.image_urls}
                  alt={accommodation.title || "Accommodation Image"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold">{accommodation.title || "Accommodation Title"}</h2>
                  <p className="text-sm text-gray-600">{accommodation.location || "Location"}</p>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {`${accommodation.description || "Accommodation description...".substring(0, 75)}`}...
                </p>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < accommodation.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {accommodation.rating} ({accommodation.reviews_count} reviews)
                  </span>
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Wifi size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-600">WiFi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-600">Parking</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coffee size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-600">Breakfast</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-2xl font-bold">
                      ${accommodation.price_per_night}
                    </span>
                    <span className="text-gray-600 text-sm">/night</span>
                  </div>
                  <Link
                    to={`/accommodation/${accommodation.id}`}
                    className="w-1/2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 text-center"
                    aria-label={`Book ${accommodation.title}`}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No accommodations available for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
