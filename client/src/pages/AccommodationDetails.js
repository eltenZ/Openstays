import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AccommodationDetails.css'; // Ensure styling for details page.

const AccommodationDetails = () => {
    const { id } = useParams(); // Get ID from route params.
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

    if (loading) return <div className="loading">Loading accommodation details...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="accommodation-details">
            <Header />
            <main>
                <h1>{accommodation.name}</h1>
                <img src={accommodation.image} alt={accommodation.name} className="details-image" />
                <p className="description">{accommodation.description}</p>
                <p className="address">Address: {accommodation.address}</p>
                <p className="price">Price: {accommodation.price} per night</p>
                <button className="book-now-btn">Book Now</button>
                <Link to="/" className="back-btn">Back to Home</Link>
            </main>
            <Footer />
        </div>
    );
};

export default AccommodationDetails;
