import React, { useState, useEffect } from 'react';
import { SearchIcon, FilterIcon } from 'lucide-react';
import AccommodationCard from '../components/AccommodationCard';
import FilterPanel from '../components/FilterPanel';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HomePage = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [availableAmenities, setAvailableAmenities] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle card click to navigate to the accommodation details page
  const handleCardClick = (id) => {
    navigate(`/accommodation/${id}`);
  };


  // API data fetching and normalization
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/accommodations');
        if (!response.ok) {
          throw new Error("Failed to fetch accommodations.");
        }
        const data = await response.json();

        // Normalize the accommodation data:
        // - Convert `amenities` string to an array
        // - Normalize `location` and `title` to lowercase for comparisons
        const normalizedData = data.map(acc => ({
          ...acc,
          amenities: acc.amenities
            ? acc.amenities.split(",").map(amenity => amenity.trim().toLowerCase())
            : [],
          location: acc.location.toLowerCase(),
          title: acc.title.toLowerCase(),
        }));

        setAccommodations(normalizedData);
        setFilteredAccommodations(normalizedData);

        // Extract unique amenities
        const amenitiesSet = new Set();
        normalizedData.forEach(acc => acc.amenities.forEach(amenity => amenitiesSet.add(amenity)));
        setAvailableAmenities([...amenitiesSet]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Existing search suggestions function
  const fetchSearchSuggestions = async (query) => {
    if (!query) {
      setSearchSuggestions([]);
      return;
    }

    try {
      // Filter available titles and locations that match the query
      const suggestions = accommodations
        .filter(acc =>
          acc.title.includes(query.toLowerCase()) ||
          acc.location.includes(query.toLowerCase())
        )
        .flatMap(acc => [acc.title, acc.location]);

      // Deduplicate suggestions
      const uniqueSuggestions = Array.from(new Set(suggestions));
      setSearchSuggestions(uniqueSuggestions);
    } catch (error) {
      console.error("Error fetching search suggestions:", error.message);
    }
  };

  const handleSearchChange = (input) => {
    setSearchInput(input);
    fetchSearchSuggestions(input);
  };

  const handleSearchSelect = (selectedOption) => {
    setSearchInput(selectedOption);
    setSearchSuggestions([]);
    const searchedData = accommodations.filter(acc =>
      acc.title.includes(selectedOption.toLowerCase()) ||
      acc.location.includes(selectedOption.toLowerCase())
    );
    setFilteredAccommodations(searchedData);
  };

  // Existing filtering function (to be passed to the FilterPanel)
  const applyFilters = async (filters) => {
    let filteredData = accommodations.filter(accommodation => {
      // Filter by destination (if provided)
      if (filters.destination && !accommodation.location.includes(filters.destination.toLowerCase())) {
        return false;
      }

      // Filter by price range (using price_per_night as standard rate)
      const [minPrice, maxPrice] = filters.priceRange || [0, Infinity];
      if (
        accommodation.price_per_night < minPrice ||
        accommodation.price_per_night > maxPrice
      ) {
        return false;
      }

      // Filter by rooms and guests
      if (filters.rooms && filters.rooms > accommodation.bedrooms) {
        return false;
      }
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

      return true;
    });

    // Availability check by dates can be added here as needed

    setFilteredAccommodations(filteredData);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Search and Filter Bar */}
      <div className="bg-white border-b py-4 px-6 md:px-10 lg:px-16 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              placeholder="Search accommodations..."
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
          <button
            className="md:hidden ml-4 flex items-center text-gray-600"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterIcon className="h-5 w-5 mr-1" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <div
        className={`md:hidden transition-all duration-300 ${showFilters ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="px-6">
          <FilterPanel 
            isMobile={true} 
            applyFilters={applyFilters} 
            availableAmenities={availableAmenities} 
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row px-6 md:px-10 lg:px-16 py-6 gap-8">
        {/* Accommodation Cards Grid */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredAccommodations.map(accommodation => (
            <AccommodationCard 
              key={accommodation.id} 
              accommodation={accommodation}
              onClick={() => handleCardClick(accommodation.id)} // Pass the click handler
            />
          ))}
        </div>
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block w-1/3">
          <div className="sticky top-24">
            <h2 className="text-xl font-light mb-6 text-gray-800">Filters</h2>
            <FilterPanel 
              applyFilters={applyFilters} 
              availableAmenities={availableAmenities} 
             
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
