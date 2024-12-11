const AccommodationCard = ({ accommodation }) => {
  return (
    <div className="accommodation-card">
      <img 
        src={accommodation.image_urls} 
        alt={accommodation.title} 
      />
      <h3>{accommodation.title}</h3>
      <p>{accommodation.description}</p>
      <p className="price">Price: {accommodation.price_per_night} per night</p>
      <Link to={`/accommodation/${accommodation.id}`}>View Details</Link>
    </div>
  );
};
