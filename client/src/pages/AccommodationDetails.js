import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AccommodationDetails.css';

const AccommodationDetails = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/accommodation/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch accommodation details.');
        }
        const data = await response.json();

        // Ensure numeric fields are numbers
        data.price_per_night = parseFloat(data.price_per_night);

        setAccommodation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleDateChange = (event, type) => {
    if (type === 'checkin') {
      setCheckInDate(event.target.value);
    } else if (type === 'checkout') {
      setCheckOutDate(event.target.value);
    }
  };

  const calculateTotalCost = () => {
    if (!checkInDate || !checkOutDate || !accommodation) {
      return 0;
    }

    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffDays = Math.round((checkOut - checkIn) / oneDay);

    return diffDays * accommodation.price_per_night;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const amenitiesList = accommodation.amenities ? accommodation.amenities.split(',') : [];

  return (
    <div className="accommodation-details">
      <main>
        <div className="image-section">
          <img
            src={`/images/${accommodation.image_url}`}
            alt={accommodation.title}
            className="accommodation-image"
          />
        </div>

        <h1>{accommodation.title}</h1>

        <div className="description">
          <p>{accommodation.description}</p>
        </div>

        <div className="details-section">
          <div className="rooms-guests">
            <div>
              <strong>Number of Rooms:</strong> {accommodation.bedrooms}
            </div>
            <div>
              <strong>Max Guests:</strong> {accommodation.max_guests}
            </div>
          </div>

          <div className="amenities">
            <strong>Amenities:</strong>
            <ul>
              {amenitiesList.length > 0 ? (
                amenitiesList.map((amenity) => <li key={amenity}>{amenity}</li>)
              ) : (
                <li>No amenities listed</li>
              )}
            </ul>
          </div>

          <div className="calendar">
            <div>
              <strong>Check-in:</strong>
              <input
                type="date"
                value={checkInDate || ''}
                onChange={(e) => handleDateChange(e, 'checkin')}
              />
            </div>
            <div>
              <strong>Check-out:</strong>
              <input
                type="date"
                value={checkOutDate || ''}
                onChange={(e) => handleDateChange(e, 'checkout')}
              />
            </div>
          </div>

          <div className="price-section">
            <strong>Price per Night:</strong> ${accommodation.price_per_night.toFixed(2)}
          </div>

          <div className="total-cost">
            <strong>Total Cost:</strong> ${calculateTotalCost().toFixed(2)}
          </div>

          <div className="book-button">
            <button className="book-now-btn">Book Now</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccommodationDetails;
