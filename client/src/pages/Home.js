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
                                    src={accommodation.image_urls}
                                    alt={accommodation.title}
                                    className="card-image"
                                />
                                <div className="card-content">
                                    <h3>{accommodation.title}</h3>
                                    <p>{accommodation.description}</p>
                                    <p className="price">: {accommodation.price_per_night}/ night</p>
                                    <Link to={`/accommodation/${accommodation.id}`} className="btn">
                                        View Details
                                    </Link>
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

