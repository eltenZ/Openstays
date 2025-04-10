import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, Search, Star } from "lucide-react";
import AccommodationFilters from "../components/AccommodationFilters";
import AccommodationCarousel from "../components/carousel.js";

const Home = () => {
  const [accommodations, setAccommodations] = useState([]);
  
  const [availableAmenities, setAvailableAmenities] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [searchSuggestions, setSearchSuggestions] = useState([]); // State for search suggestions
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [cities, setCities] = useState([]);
  // Detect screen size on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)"); // Adjust the breakpoint as needed
    setShowFilters(mediaQuery.matches);
  }, []);
 
// Api fetch accommodations

  useEffect(() => {
    const fetchData = async () => {
      try {
       const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/accommodations`);
        if (!response.ok) {
          throw new Error("Failed to fetch accommodations.");
        }
        const data = await response.json();

        // Normalize accommodations data: convert `amenities` to arrays
        const normalizedData = data.map((acc) => ({
          ...acc,
          amenities: acc.amenities
            ? acc.amenities.split(",").map((amenity) => amenity.trim().toLowerCase())
            : [],
          location: acc.location.toLowerCase(), // Normalize location for comparison
          title: acc.title.toLowerCase(), // Normalize title for comparison
        }));

        setAccommodations(normalizedData);
       

        // Extract unique amenities
        // Extract unique cities from accommodations
        const uniqueCities = [...new Set(data.map(accommodation => accommodation.city))];
        setCities(uniqueCities);
        
        const amenitiesSet = new Set();
        normalizedData.forEach((acc) => acc.amenities.forEach((amenity) => amenitiesSet.add(amenity)));
        setAvailableAmenities([...amenitiesSet]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();
  }, []);


// Generate search suggestions based on input
const generateSuggestions = (input) => {
  if (!input) {
    setSearchSuggestions([]); // Clear suggestions if input is empty
    return;
  }

  const suggestions = accommodations
    .filter((accommodation) =>
      (accommodation.title || "").toLowerCase().includes(input.toLowerCase()) ||
      (accommodation.location || "").toLowerCase().includes(input.toLowerCase())
    )
    .flatMap((accommodation) => [accommodation.title, accommodation.location]); // Extract title and location

  // Remove duplicates and limit suggestions to 5
  const uniqueSuggestions = Array.from(new Set(suggestions)).slice(0, 5);
  setSearchSuggestions(uniqueSuggestions);
};

const handleSearchChange = (input) => {
  setSearchInput(input); // Update search input state
  generateSuggestions(input); // Generate suggestions based on input
};

// api for fetch availability

  const fetchAvailability = async (id, startDate, endDate) => {
    try {
    const response = await fetch(
  `${process.env.REACT_APP_API_BASE_URL}/api/availability?accommodation_id=${id}&start_date=${startDate}&end_date=${endDate}`
);

      if (!response.ok) {
        throw new Error("Failed to check availability.");
      }
      const data = await response.json();
      return data.available; // Return true if available, false otherwise
    } catch (error) {
      console.error("Error fetching availability:", error.message);
      return false; // Assume unavailable on error
    }
  };

// Logic for filters
const [filterCriteria, setFilterCriteria] = useState({
  priceRange: [0, Infinity], // [min, max]
  location: "",
  amenities: [], // Array of selected amenities
  bedrooms: null,
  maxGuests: null,
}); 

 const filteredAccommodations = accommodations.filter((accommodation) => {
  const matchesSearch =
    (accommodation.title || "").toLowerCase().includes(searchInput.toLowerCase()) ||
    (accommodation.location || "").toLowerCase().includes(searchInput.toLowerCase());

  const matchesPrice =
    accommodation.price_per_night >= filterCriteria.priceRange[0] &&
    accommodation.price_per_night <= filterCriteria.priceRange[1];

  const matchesLocation = filterCriteria.location
    ? accommodation.location.toLowerCase().includes(filterCriteria.location.toLowerCase())
    : true;

  const matchesAmenities = filterCriteria.amenities.length
    ? filterCriteria.amenities.every((amenity) => accommodation.amenities.includes(amenity.toLowerCase()))
    : true;

  const matchesBedrooms = filterCriteria.bedrooms
    ? accommodation.bedrooms >= filterCriteria.bedrooms
    : true;

  const matchesMaxGuests = filterCriteria.maxGuests
    ? accommodation.max_guests >= filterCriteria.maxGuests
    : true;

  return (
    matchesSearch &&
    matchesPrice &&
    matchesLocation &&
    matchesAmenities &&
    matchesBedrooms &&
    matchesMaxGuests
  );
});

const updateFilterCriteria = (field, value) => {
  setFilterCriteria((prevCriteria) => ({
    ...prevCriteria,
    [field]: value,
  }));
};


  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <main className="min-h-screen bg-white">
      <div className="relative mt-2 mb-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row md:flex-row items-center gap-4 w-full md:w-auto lg:w-[150vh]">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Find your stay"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchSuggestions.length > 0 && (
              <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-md max-h-40 overflow-y-auto z-50">
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearchInput(suggestion); // Set input to selected suggestion
                      setSearchSuggestions([]); // Clear suggestions
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Filter className="w-6 h-6" />
          </button>
        </div>

        {showFilters && (
<AccommodationFilters
  filterCriteria={filterCriteria}
  updateFilterCriteria={updateFilterCriteria}
  availableAmenities={availableAmenities}
  closeFilters={() => setShowFilters(false)} // For closing the filter component
  availabiity={availability}
  cities={cities}
/>
)}
      </div>

<section className="mb-8 container mx-auto absolute px-4 max-w-6xl">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredAccommodations.map((accommodation) => (
      <Link
        to={`/accommodation/${accommodation.id}`}
        key={accommodation.id}
        className="rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-white transition-all duration-300 hover:-translate-y-1"
      >
        <div>
          <div className="h-72">
          <AccommodationCarousel accommodation={accommodation} />
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
                {accommodation.rating || 0} ({accommodation.reviews_count || 0} reviews)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold">
                Kes {accommodation.price_per_night}
                <span className="text-sm text-gray-500">/night</span>
              </span>
              <button
                className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors duration-300"
                aria-label={`Book ${accommodation.title}`}
              >
                Book now
              </button>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>
    </main>
  );
};

export default Home;
