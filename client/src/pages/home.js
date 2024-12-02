import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AccommodationCard from '../components/AccommodationCard';

const Home = () => {
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        // Fetch accommodations from backend API (to be set up later)
        fetch('http://localhost:5000/api/accommodations')
            .then((response) => response.json())
            .then((data) => setAccommodations(data));
    }, []);

    return (
        <div>
            <Header />
            <div>
                <h1>Welcome to Openstays</h1>
                <input type="text" placeholder="Search accommodations..." />
                <div className="accommodation-list">
                    {accommodations.map((accommodation) => (
                        <AccommodationCard key={accommodation.id} accommodation={accommodation} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
