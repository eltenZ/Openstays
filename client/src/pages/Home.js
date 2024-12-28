import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, Search, Star } from "lucide-react";
import AccommodationFilters from "../components/AccommodationFilters";

const Home = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [availableAmenities, setAvailableAmenities] = useState([]);
    const [searchInput, setSearchInput] = useState(""); // State for search input
  const [searchSuggestions, setSearchSuggestions] = useState([]); // State for search suggestions
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.24.100:5000/api/accommodations");
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
        setFilteredAccommodations(normalizedData);

        // Extract unique amenities
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

const fetchSearchSuggestions = async (query) => {
    if (!query) {
      setSearchSuggestions([]);
      return;
    }

    try {
      // Filter available titles and locations that match the query
      const suggestions = accommodations.filter(
        (acc) =>
          acc.title.includes(query.toLowerCase()) ||
          acc.location.includes(query.toLowerCase())
      )
	.flatMap((acc) => [acc.title, acc.location]);

      // Deduplicate and prepare the suggestions list
      const uniqueSuggestions = Array.from(
        new Set(suggestions));

      setSearchSuggestions(uniqueSuggestions);
    } catch (error) {
      console.error("Error fetching search suggestions:", error.message);
    }
  };

  const handleSearchChange = (input) => {
    setSearchInput(input);
    fetchSearchSuggestions(input); // Fetch suggestions as the user types
  };

  const handleSearchSelect = (selectedOption) => {
    setSearchInput(selectedOption);
    setSearchSuggestions([]);
    const searchedData = accommodations.filter(
      (acc) =>
        acc.title.includes(selectedOption.toLowerCase()) ||
        acc.location.includes(selectedOption.toLowerCase())
    );
    setFilteredAccommodations(searchedData);
  };

  const fetchAvailability = async (id, startDate, endDate) => {
    try {
      const response = await fetch(
        `http://192.168.24.100:5000/api/availability?accommodation_id=${id}&start_date=${startDate}&end_date=${endDate}`
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

 

  const applyFilters = async (filters) => {
    let filteredData = accommodations.filter((accommodation) => {
      // Filter by destination
      if (
        filters.destination &&
        !accommodation.location.includes(filters.destination.toLowerCase())
      ) {
        return false;
      }

      // Filter by price range
      const [minPrice, maxPrice] = filters.priceRange || [0, Infinity];
      if (
        accommodation.price_per_night < minPrice ||
        accommodation.price_per_night > maxPrice
      ) {
        return false;
      }

      // Filter by rooms
      if (filters.rooms && filters.rooms > accommodation.bedrooms) {
        return false;
      }

      // Filter by guests
      if (filters.guests && filters.guests > accommodation.max_guests) {
        return false;
      }

      // Filter by amenities
      if (filters.amenities) {
        for (const [amenity, selected] of Object.entries(filters.amenities)) {
          if (selected && !accommodation.amenities.includes(amenity.toLowerCase())) {
            return false;
          }
        }
      }

      return true; // Pass all non-availability filters
    });

    // Check availability if dates are specified
if (filters.dates && filters.dates.length === 2) {
  const [startDate, endDate] = filters.dates;

  if (startDate && endDate) { // Ensure dates are valid
    const availabilityChecks = await Promise.all(
      filteredData.map((acc) =>
        fetchAvailability(acc.id, startDate.toISOString(), endDate.toISOString())
      )
    );

    // Filter accommodations based on availability
    filteredData = filteredData.filter((_, index) => availabilityChecks[index]);
  }
}
    setFilteredAccommodations(filteredData);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="relative mt-2 mb-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
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
                    onClick={() => handleSearchSelect(suggestion)}
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
            applyFilters={applyFilters}
            availableAmenities={availableAmenities}
            closeFilters={() => setShowFilters(false)}
          />
        )}
      </div>

      <section className="mb-8 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-white transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56">
                <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full shadow-md">
                  <span className="text-sm text-gray-800">Verified</span>
                </div>
                
		 <img
  src={`${process.env.PUBLIC_URL}/${accommodation.image_urls.split(',')[0].trim()}`}
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
                    {accommodation.rating || 0} ({accommodation.reviews_count || 0} reviews)
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
