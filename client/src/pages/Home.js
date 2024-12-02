import React from 'react';
import './Home.css'; // Ensure you have specific styles for the home page if needed.

const Home = () => {
  const accommodations = [
    {
      id: 1,
      name: 'Cozy Beachfront Villa',
      description: 'Experience luxury living with ocean views.',
      price: 'KES 15,000 per night',
      image: 'villa.jpg', // Replace with actual image path or URL.
    },
    {
      id: 2,
      name: 'Modern City Apartment',
      description: 'Located in the heart of the city.',
      price: 'KES 10,000 per night',
      image: 'apartment.jpg', // Replace with actual image path or URL.
    },
    {
      id: 3,
      name: 'Rustic Cabin Retreat',
      description: 'Perfect for nature lovers and adventurers.',
      price: 'KES 8,000 per night',
      image: 'cabin.jpg', // Replace with actual image path or URL.
    },
  ];

  return (
    <main className="home">
      <section className="accommodations">
       
        <div className="accommodation-cards">
          {accommodations.map((accommodation) => (
            <div className="card" key={accommodation.id}>
              <img src={accommodation.image} alt={accommodation.name} className="card-image" />
              <div className="card-content">
                <h3>{accommodation.name}</h3>
                <p>{accommodation.description}</p>
                <p className="price">{accommodation.price}</p>
                <a href={`/accommodation/${accommodation.id}`} className="btn">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
