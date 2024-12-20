import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, Search, Star } from "lucide-react";
import AccommodationFilters from "../components/AccommodationFilters";

const Home = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
<div className="relative mt-2 mb-4 px-4 sm:px-6 lg:px-8">
  <div className="flex items-center gap-4">
    {/* Search Bar */}
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder="Find your stay"
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Filter Button */}
    <button
      onClick={toggleFilters}
      className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <Filter className="w-6 h-6" />
    </button>
  </div>

  {/* Filters Panel */}
  {showFilters && (
    <div className="mt-4">
      <AccommodationFilters applyFilters={() => console.log("Filters applied")} />
    </div>
  )}
</div>
      {/* Featured Listings */}
      <section className="mb-8 container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-white transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56">
                <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full shadow-md">
                  <span className="text-sm text-gray-800">Verified</span>
                </div>
                <img
                  src={accommodation.image_urls}
                  alt={accommodation.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{accommodation.title}</h3>
                <p className="text-sm text-gray-600 my-2">
                  {accommodation.description.slice(0, 75)}...
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < accommodation.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600">
                    {accommodation.rating} ({accommodation.reviews_count} reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">
                    Kes {accommodation.price_per_night}
                    <span className="text-sm text-gray-500">/night</span>
                  </span>
                  <Link
                    to={`/accommodation/${accommodation.id}`}
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors duration-300"
                  >
                    Book now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
