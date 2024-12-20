import React from 'react';
import { Link } from 'react-router-dom';

const AccommodationCard = ({ accommodation }) => {
  const firstImageUrl = accommodation.image_urls.split(',')[0]; 

  return (
    <div className="accommodation-card">
      <img 
        src={`/images/${firstImageUrl}`} 
        alt={accommodation.title} 
      />
      <h3>{accommodation.title}</h3>
      <p>{accommodation.description.substring(0, 100)}...</p> 
      <p className="price">{accommodation.price_per_night.toFixed(2)}/ night</p>
      <Link to={`/accommodation/${accommodation.id}`}>
        View Details
      </Link>
    </div>
  );
};

export default AccommodationCard;

