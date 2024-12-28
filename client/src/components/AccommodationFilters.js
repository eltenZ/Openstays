import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AccommodationFilters({
  applyFilters,
  availableAmenities,
  closeFilters,
}) {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [dates, setDates] = useState([null, null]);
  const [destination, setDestination] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [amenities, setAmenities] = useState({});
  const [allDestinations, setAllDestinations] = useState([]);

  // Fetch destinations dynamically from the API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://192.168.105.234:5000/api/accommodations");
        if (!response.ok) {
          throw new Error("Failed to fetch destinations.");
        }
        const data = await response.json();

        // Extract unique locations
        const locationsSet = new Set(data.map((acc) => acc.location.toLowerCase()));
        setAllDestinations([...locationsSet]);
      } catch (error) {
        console.error("Error fetching destinations:", error.message);
      }
    };

    fetchDestinations();
  }, []);

  // Initialize amenities dynamically
  useEffect(() => {
    const initialAmenities = {};
    availableAmenities.forEach((amenity) => {
      initialAmenities[amenity] = false;
    });
    setAmenities(initialAmenities);
  }, [availableAmenities]);

  // Filter destinations based on user input
  useEffect(() => {
    if (destination) {
      setFilteredDestinations(
        allDestinations.filter((loc) =>
          loc.toLowerCase().includes(destination.toLowerCase())
        )
      );
    } else {
      setFilteredDestinations([]);
    }
  }, [destination, allDestinations]);

  const handleApplyFilters = () => {
    applyFilters({ priceRange, dates, destination, rooms, guests, amenities });
    closeFilters(); // Close filters modal after applying
  };

  return (
    <div className="w-full max-w-[360px] mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <h2 className="text-xl font-semibold">Filter Your Stay</h2>
        <button onClick={closeFilters} className="text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-6 px-4 py-4">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium mb-2">Price Range (KES)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-20 border rounded-md p-2"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-20 border rounded-md p-2"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Dates</label>
          <DatePicker
            selectsRange
            startDate={dates[0]}
            endDate={dates[1]}
            onChange={(update) => setDates(update)}
            isClearable
            className="w-full px-4 py-2 border rounded-md"
            placeholderText="Select check-in and check-out dates"
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium mb-2">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Search destinations..."
          />
          {filteredDestinations.length > 0 && (
            <div className="mt-2 border rounded-md bg-white max-h-40 overflow-y-auto">
              {filteredDestinations.map((loc, index) => (
                <div
                  key={index}
                  className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDestination(loc);
                    setFilteredDestinations([]);
                  }}
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium mb-2">Amenities</label>
          <div className="flex flex-wrap gap-4">
            {Object.keys(amenities).map((amenity) => (
              <div key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={amenities[amenity]}
                  onChange={() =>
                    setAmenities((prev) => ({
                      ...prev,
                      [amenity]: !prev[amenity],
                    }))
                  }
                />
                <span className="ml-2 capitalize">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rooms and Guests */}
        <div className="flex gap-6">
          {/* Rooms */}
          <div>
            <label className="block text-sm font-medium mb-2">Rooms</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRooms((prev) => Math.max(1, prev - 1))}
                className="bg-gray-300 rounded-full px-2"
              >
                -
              </button>
              <span>{rooms}</span>
              <button
                onClick={() => setRooms((prev) => prev + 1)}
                className="bg-gray-300 rounded-full px-2"
              >
                +
              </button>
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium mb-2">Guests</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                className="bg-gray-300 rounded-full px-2"
              >
                -
              </button>
              <span>{guests}</span>
              <button
                onClick={() => setGuests((prev) => prev + 1)}
                className="bg-gray-300 rounded-full px-2"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <button
          onClick={handleApplyFilters}
          className="bg-green-500 text-white py-2 px-4 rounded-md w-full hover:bg-green-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
