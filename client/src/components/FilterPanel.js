import React, { useState } from 'react';
import { CalendarIcon, BedDoubleIcon, HomeIcon, WifiIcon, CarIcon } from 'lucide-react';
import PriceSlider from './PriceSlider';
import DateSelector from './DateSelector';

const FilterPanel = ({ isMobile = false, applyFilters, availableAmenities }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [priceRange, setPriceRange] = useState([5000, 100000]);
  const [selectedDates, setSelectedDates] = useState([]); 
  const [rooms, setRooms] = useState(null);
  const [beds, setBeds] = useState(null);

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleRoomSelect = (value) => {
    setRooms(value === '4+' ? 4 : value);
  };

  const handleBedSelect = (value) => {
    setBeds(value === '4+' ? 4 : value);
  };

  const handleApplyFilters = () => {
    const filters = {
      // destination is handled by the search bar outside the filter panel
      priceRange: priceRange,
      dates: selectedDates.length === 2 ? selectedDates : null,
      rooms: rooms,
      guests: beds, // using "beds" here as a proxy for guests (as in your original filtering logic)
      amenities: {}
    };

    selectedAmenities.forEach(amenity => {
      filters.amenities[amenity] = true;
    });

    applyFilters(filters);
  };

  return (
    <div className={`bg-white rounded-lg ${!isMobile && 'shadow-md p-6'}`}>
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-800">
          Price Range (KES)
        </h3>
        <PriceSlider 
          min={5000} 
          max={100000} 
          onChange={(minVal, maxVal) => setPriceRange([minVal, maxVal])}
        />
      </div>
      {/* Dates */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-800">Dates</h3>
        <button 
          className="w-full flex items-center justify-between border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-gray-800" 
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <span className="text-gray-600">
            {selectedDates.length === 2
              ? `${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`
              : 'Select dates'}
          </span>
          <CalendarIcon className="h-4 w-4 text-gray-500" />
        </button>
        {showDatePicker && (
          <div className="mt-2">
            <DateSelector onDateSelect={(dates) => setSelectedDates(dates)} />
          </div>
        )}
      </div>
      {/* Rooms & Beds */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-800">Rooms & Beds</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <HomeIcon className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-600">Rooms</span>
            </div>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, '4+'].map(num => (
                <button 
                  key={num} 
                  onClick={() => handleRoomSelect(num)}
                  className={`h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 ${
                    rooms === (num === '4+' ? 4 : num) ? 'bg-gray-900 text-white border-gray-900' : ''
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <BedDoubleIcon className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-600">Beds</span>
            </div>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, '4+'].map(num => (
                <button 
                  key={num}
                  onClick={() => handleBedSelect(num)}
                  className={`h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 ${
                    beds === (num === '4+' ? 4 : num) ? 'bg-gray-900 text-white border-gray-900' : ''
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Amenities */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-800">Amenities</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'WiFi', icon: <WifiIcon className="h-4 w-4" /> },
            { name: 'Pool', icon: <div className="h-4 w-4" /> },
            { name: 'Parking', icon: <CarIcon className="h-4 w-4" /> },
            { name: 'Kitchen', icon: <HomeIcon className="h-4 w-4" /> }
          ].map(amenity => (
            <button 
              key={amenity.name}
              onClick={() => toggleAmenity(amenity.name)}
              className={`flex items-center px-3 py-2 rounded-md border ${
                selectedAmenities.includes(amenity.name)
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'border-gray-300 text-gray-700 hover:border-gray-800'
              }`}
            >
              <span className="mr-2">{amenity.icon}</span>
              <span>{amenity.name}</span>
            </button>
          ))}
        </div>
      </div>
      <button 
        onClick={handleApplyFilters}
        className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterPanel;
