import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the DatePicker
import './Home.css';

const Home = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    amenities: [],
    dates: [null, null], // Array to store start and end date
  });

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/accommodations');
        if (!response.ok) {
          throw new Error('Failed to fetch accommodations.');
        }
        const data = await response.json();
        setAccommodations(data);
        setFilteredAccommodations(data); // Initially show all accommodations
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  useEffect(() => {
    const filtered = accommodations.filter((accommodation) => {
      // Price filtering
      if (filters.minPrice && accommodation.price_per_night < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && accommodation.price_per_night > filters.maxPrice) {
        return false;
      }

      // Amenities filtering
      if (filters.amenities.length > 0) {
        const accommodationAmenities = accommodation.amenities.split(',').map((a) => a.trim());
        return filters.amenities.every((amenity) => accommodationAmenities.includes(amenity));
      }

      // Date filtering (simple logic to check if availability matches)
      if (filters.dates[0] && filters.dates[1]) {
        const [startDate, endDate] = filters.dates;
        const accommodationAvailable = accommodation.available_from <= startDate && accommodation.available_to >= endDate;
        if (!accommodationAvailable) return false;
      }

      return true;
    });
    setFilteredAccommodations(filtered);
  }, [accommodations, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    if (name === 'minPrice' || name === 'maxPrice') {
      setFilters({
        ...filters,
        [name]: value ? parseFloat(value) : null,
      });
    } else if (name === 'amenities') {
      if (event.target.checked) {
        setFilters({
          ...filters,
          amenities: [...filters.amenities, value],
        });
      } else {
        setFilters({
          ...filters,
          amenities: filters.amenities.filter((a) => a !== value),
        });
      }
    }
  };

  const handleDateChange = (dates) => {
    setFilters({
      ...filters,
      dates: dates,
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home">
      <div className="filters">
        <h2>Filters</h2>
        <div className="filter-group">
          <label htmlFor="minPrice">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice || ''}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice || ''}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <h3>Amenities:</h3>
          <label>
            <input
              type="checkbox"
              name="amenities"
              value="Wi-Fi"
              checked={filters.amenities.includes('Wi-Fi')}
              onChange={handleFilterChange}
            />
            Wi-Fi
          </label>
          <label>
            <input
              type="checkbox"
              name="amenities"
              value="Kitchen"
              checked={filters.amenities.includes('Kitchen')}
              onChange={handleFilterChange}
            />
            Kitchen
          </label>
          {/* Add more amenities as needed */}
        </div>
        <div className="filter-group">
          <h3>Availability:</h3>
          <DatePicker
            selected={filters.dates[0]}
            onChange={handleDateChange}
            startDate={filters.dates[0]}
            endDate={filters.dates[1]}
            selectsRange
            inline
          />
        </div>
      </div>
      <div className="accommodations">
        {filteredAccommodations.map((accommodation) => (
          <div className="accommodation-card" key={accommodation.id}>
            <img
              src={`/images/${accommodation.image_url}`}
              alt={accommodation.title}
              className="card-image"
            />
            <div className="card-content">
              <h3>{accommodation.title}</h3>
              <p className="description">{accommodation.description}</p>
              <div className="details">
                <span>Rooms: {accommodation.bedrooms}</span>
                <span>Guests: {accommodation.max_guests}</span>
              </div>
              <div className="price-button">
                <span>Price: ${accommodation.price_per_night}</span>
                <Link to={`/accommodation/${accommodation.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
