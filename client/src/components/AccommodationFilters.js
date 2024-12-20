import React, { useEffect, useState } from "react";
import { X } from "lucide-react"; // Close icon
import DatePicker from "react-datepicker"; // Calendar
import "react-datepicker/dist/react-datepicker.css";

export default function AccommodationFilters() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [dates, setDates] = useState([null, null]);
  const [destination, setDestination] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [amenities, setAmenities] = useState({
    wifi: false,
    pool: false,
    ac: false,
    parking: false,
    restaurant: false,
    beachAccess: false,
  });

  const destinations = ["Diani", "Mombasa", "Watamu", "Malindi", "Kwale"];

  useEffect(() => {
    const filtered = destinations.filter((dest) =>
      dest.toLowerCase().includes(destination.toLowerCase())
    );
    setFilteredDestinations(filtered);
  }, [destination]);

  const applyFilters = () => {
    console.log("Filters applied:", {
      priceRange,
      dates,
      destination,
      rooms,
      guests,
      amenities,
    });
    setIsFiltersVisible(false); // Hide the filters modal
  };

  return (
    <div className="w-full max-w-[360px] mx-auto p-4">
      {isFiltersVisible && (
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <h2 className="text-xl font-semibold">What you need</h2>
            <button
              onClick={() => setIsFiltersVisible(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6 px-4 py-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Price Range (KES)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="flex-grow"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-20 border rounded-md p-2"
                />
              </div>
            </div>

            {/* Calendar for Dates */}
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
                <div className="mt-2 border rounded-md">
                  {filteredDestinations.map((dest) => (
                    <div
                      key={dest}
                      className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                      onClick={() => setDestination(dest)}
                    >
                      {dest}
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
              onClick={applyFilters}
              className="bg-green-500 text-white py-2 px-4 rounded-md w-full hover:bg-green-600"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
