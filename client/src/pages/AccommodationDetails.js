import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AccommodationDetails.css';

const AccommodationDetails = () => {
  const { id } = useParams(); // Fetch accommodation ID from URL
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/accommodation/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch accommodation details');
        }
        const data = await response.json();
        setAccommodation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodationDetails();
  }, [id]);

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    alert(`Booking submitted:\nCheck-in: ${bookingDetails.checkIn}\nCheck-out: ${bookingDetails.checkOut}\nGuests: ${bookingDetails.guests}`);
    // Here, you can send the booking data to your backend if needed.
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!accommodation) {
    return <div>Accommodation not found</div>;
  }

  return (
    <div className="details-container">
      <div className="details-header">
        <h1>{accommodation.title}</h1>
        <span>${accommodation.price_per_night} per night</span>
      </div>

      <div className="image-gallery">
        {accommodation.images && accommodation.images.map((image, index) => (
          <img src={`/images/${image}`} alt={`${accommodation.title} ${index + 1}`} key={index} />
        ))}
      </div>

      <div className="details-info">
        <div className="info-section">
          <h2>Description</h2>
          <p>{accommodation.description}</p>
        </div>
        <div className="info-section">
          <h2>Details</h2>
          <p><strong>Location:</strong> {accommodation.location}</p>
          <p><strong>Bedrooms:</strong> {accommodation.bedrooms}</p>
          <p><strong>Max Guests:</strong> {accommodation.max_guests}</p>
          <p><strong>Amenities:</strong> {accommodation.amenities?.join(', ')}</p>
        </div>
      </div>

      <div className="booking-section">
        <h2>Book Now</h2>
        <form onSubmit={handleBookingSubmit}>
          <label htmlFor="checkIn">Check-in:</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={bookingDetails.checkIn}
            onChange={handleBookingChange}
            required
          />

          <label htmlFor="checkOut">Check-out:</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={bookingDetails.checkOut}
            onChange={handleBookingChange}
            required
          />

          <label htmlFor="guests">Guests:</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={bookingDetails.guests}
            onChange={handleBookingChange}
            min="1"
            max={accommodation.max_guests}
            required
          />

          <button type="submit">Submit Booking</button>
        </form>
      </div>
    </div>
  );
};

export default AccommodationDetails;
