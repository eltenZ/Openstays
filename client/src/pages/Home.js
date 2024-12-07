import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Add CSS for cards, images, buttons, etc.

const Home = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all accommodations from the backend API
        const fetchAccommodations = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/accommodations');
                if (!response.ok) {
                    throw new Error('Failed to fetch accommodations.');
                }
                const data = await response.json();
                setAccommodations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAccommodations();
    }, []);

    // Function to truncate description
    const truncateDescription = (description, maxLength = 75) => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...'; // Truncate and add ellipsis
        }
        return description;
    };

    if (loading) return <div className="loading">Loading accommodations...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="home">
            <main>
                <section className="accommodations">
                    <div className="accommodation-cards">
                        {accommodations.map((accommodation) => (
                            <div className="card" key={accommodation.id}>
                                <img
                                    src={accommodation.image_url}
                                    alt={accommodation.name}
                                    className="card-image"
                                />
                                <div className="card-content">
                                    <h3>{accommodation.name}</h3>
                                    <p>{truncateDescription(accommodation.description)}</p> {/* Truncate the description */}
                                    
                                    <div className="room-and-guests">
                                        <span>{accommodation.rooms} bedrooms</span>
                                        <span>{accommodation.capacity} guests</span>
                                    </div>

                                    <div className="price-and-button">
                                        <span className="price">Kes {accommodation.price}/night</span>
                                        <Link to={`/accommodation/${accommodation.id}`} className="btn">
                                            Book
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
