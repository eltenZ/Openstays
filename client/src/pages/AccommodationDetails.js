import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './AccommodationDetails.css'; // Ensure styling is available

const AccommodationDetails = () => {
    const { id } = useParams(); // Get ID from route parameters
    const [accommodation, setAccommodation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch accommodation details from backend API
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/accommodation/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch accommodation details.');
                }
                const data = await response.json();
                setAccommodation(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="accommodation-details">
            <main>
                <h1>{accommodation.name}</h1>
                <img src={accommodation.image_url} alt={accommodation.name} className="detail-image" />
                <p className="description">{accommodation.description}</p>
                <p className="address"><strong>Address:</strong> {accommodation.location}</p>
                <p className="price"><strong>Price:</strong> {accommodation.price} per night</p>
                <p className="features"><strong>Features:</strong> {accommodation.amenities}</p>
                <p className="availability">
                    <strong>Availability:</strong> {accommodation.availability}
                </p>
                <button className="book-now-btn">Book Now</button>
                <Link to="/" className="back-btn">Back to Home</Link>
            </main>
        </div>
    );
};

export default AccommodationDetails;
