import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AccommodationDetails = () => {
    const { id } = useParams();
    const [accommodation, setAccommodation] = useState(null);

    useEffect(() => {
        // Fetch accommodation details from backend API
        fetch(`http://localhost:5000/api/accommodation/${id}`)
            .then((response) => response.json())
            .then((data) => setAccommodation(data));
    }, [id]);

    if (!accommodation) return <div>Loading...</div>;

    return (
        <div>
            <Header />
            <div>
                <h1>{accommodation.name}</h1>
                <img src={accommodation.image} alt={accommodation.name} />
                <p>{accommodation.description}</p>
                <p>{accommodation.address}</p>
                <p>{accommodation.price}</p>
                <button>Book Now</button>
            </div>
            <Footer />
        </div>
    );
};

export default AccommodationDetails;
