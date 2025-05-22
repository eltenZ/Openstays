import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, BedDoubleIcon } from 'lucide-react';

const AccommodationCard = ({ accommodation }) => {
  // Convert the image_urls string into an array.
  const images = accommodation.image_urls
    ? accommodation.image_urls.split(',').map(img => img.trim())
    : [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Calculate rates
  const standardRate = accommodation.price_per_night;
  const lowSeasonRate = Math.round(0.75 * standardRate);
  const highSeasonRate = Math.round(2.0 * standardRate);

  return (
    <Link to={`/accommodation/${accommodation.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Image carousel */}
        <div className="relative h-64 overflow-hidden">
          <div
            className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${accommodation.title} - Image ${index + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>
          {/* Carousel navigation arrows */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white"
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-800" />
          </button>
          {/* Image indicators */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-1.5 h-1.5 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
          {/* Translucent overlay */}
          <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full shadow-md">
            <span className="text-sm text-gray-800">Verified</span>
          </div>
        </div>
        {/* Card content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {accommodation.title}
          </h3>
          <p className="text-sm text-gray-600 my-2">
            {accommodation.description?.slice(0, 75) || ''}...
          </p>
          {/* Display Rates */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-lg font-medium text-gray-900">
                KES {standardRate.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Low: KES {lowSeasonRate.toLocaleString()} | High: KES {highSeasonRate.toLocaleString()}
              </p>
            </div>
          </div>
          {/* Display Location */}
          <p className="text-sm text-gray-600 mb-2">{accommodation.location}</p>
          {/* Reserve button */}
          <div className="mt-2">
            <span className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors duration-300 block text-center">
              Reserve
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AccommodationCard;
