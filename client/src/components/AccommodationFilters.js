import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import ReactSlider from "react-slider";

export default function AccommodationFilters ({ filterCriteria, updateFilterCriteria, availableAmenities, closeFilters, cities })
 {
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  const [locationInput, setLocationInput] = useState("");

  const handleDateChange = (range) => {
    setDateRange(range);
    updateFilterCriteria("startDate", range?.from);
    updateFilterCriteria("endDate", range?.to);
  };

  const filteredCities = cities.filter(city => city.toLowerCase().includes(locationInput.toLowerCase()));

  const resetFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setLocationInput("");
    updateFilterCriteria("startDate", undefined);
    updateFilterCriteria("endDate", undefined);
    updateFilterCriteria("location", "");
    updateFilterCriteria("priceRange", [0, 50000]);
    updateFilterCriteria("amenities", []);
    updateFilterCriteria("bedrooms", null);
    updateFilterCriteria("maxGuests", null);
  };

  return (
    <div className="w-full max-w-[380px] mx-auto p-2 bg-white rounded-lg shadow-lg md:mx-0 md:absolute md:right-4">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button onClick={closeFilters} className="text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-6 px-2 py-4">
        {/* Price Range */}
<div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
  <label className="block text-sm font-medium mb-3 text-gray-700">Price Range (KES)</label>
  <ReactSlider
    className="horizontal-slider w-full h-2 bg-gray-200 rounded-full"
    thumbClassName="slider-thumb w-5 h-5 bg-blue-500 rounded-full shadow-lg"
    trackClassName="slider-track h-2 bg-gray-300 rounded-full"
    min={0}
    max={50000}
    step={500}
    value={filterCriteria.priceRange}
    onChange={(values) => updateFilterCriteria("priceRange", values)}
    renderThumb={(props) => (
      <div {...props} className="slider-thumb bg-blue-500 w-5 h-5 rounded-full shadow-md transform scale-100 hover:scale-110 transition-all relative -mt-1.5">
        
      </div>
    )}
  />
  <div className="flex justify-between text-sm text-gray-600 mt-3">
    <span>KES {filterCriteria.priceRange[0]}</span>
    <span>KES {filterCriteria.priceRange[1]}</span>
  </div>
</div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Select Dates</label>
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={handleDateChange}
          />
        </div>
        {/* Destination */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Destination</label>
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="Where to?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {locationInput && (
            <ul className="mt-2 bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto">
              {filteredCities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setLocationInput(city);
                    updateFilterCriteria("location", city);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Amenities */}
<div className="p-4 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
  <h2 className="text-lg font-semibold mb-4">Filter by Amenities</h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {availableAmenities.length > 0 ? (
      availableAmenities.map((amenity, index) => (
        <div key={index} className="flex flex-col justify-between">
          <span className="text-sm text-gray-700">{amenity}</span>
          <label className="relative inline-block w-12 h-6 cursor-pointer">
            <input
              type="checkbox"
              value={amenity}
              checked={filterCriteria.amenities.includes(amenity)}
              onChange={(e) => {
                const updatedAmenities = e.target.checked
                  ? [...filterCriteria.amenities, amenity]
                  : filterCriteria.amenities.filter((a) => a !== amenity);
                updateFilterCriteria("amenities", updatedAmenities);
              }}
              className="hidden"
            />
            <span className="slider bg-gray-300 border-2 border-blue-500"></span>
          </label>
        </div>
      ))
    ) : (
      <p className="text-sm text-gray-500">No amenities available</p>
    )}
  </div>
</div>

<style jsx>{`
  input:checked + .slider {
    background-color: #3b82f6; /* Blue accent when checked */
  }
  input:checked + .slider:before {
    transform: translateX(20px); /* Moves the circle to the right */
  }
  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 4px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
  }
`}</style>
        {/* Rooms and Guests */}
<div className="p-4 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
  <h2 className="text-lg font-semibold mb-4">Filter by Rooms & Guests</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Bedrooms Filter */}
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Bedrooms</h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={() =>
            updateFilterCriteria("bedrooms", Math.max(0, filterCriteria.bedrooms - 1))
          }
          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          <span className="text-lg font-bold text-gray-600">-</span>
        </button>
        <span className="text-gray-700 font-medium">{filterCriteria.bedrooms ?? 0}</span>
        <button
          onClick={() =>
            updateFilterCriteria("bedrooms", (filterCriteria.bedrooms ?? 0) + 1)
          }
          className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-lg hover:bg-blue-600 text-white focus:outline-none"
        >
          <span className="text-lg font-bold">+</span>
        </button>
      </div>
    </div>

    {/* Guests Filter */}
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Guests</h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={() =>
            updateFilterCriteria("maxGuests", Math.max(0, filterCriteria.maxGuests - 1))
          }
          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          <span className="text-lg font-bold text-gray-600">-</span>
        </button>
        <span className="text-gray-700 font-medium">{filterCriteria.maxGuests ?? 0}</span>
        <button
          onClick={() =>
            updateFilterCriteria("maxGuests", (filterCriteria.maxGuests ?? 0) + 1)
          }
          className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-lg hover:bg-blue-600 text-white focus:outline-none"
        >
          <span className="text-lg font-bold">+</span>
        </button>
      </div>
    </div>
  </div>
</div>
        {/* Apply Filters Button */}
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md w-full hover:bg-green-600"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

