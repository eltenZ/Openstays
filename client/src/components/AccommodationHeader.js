import React from 'react';
import { StarIcon } from 'lucide-react';

interface AccommodationHeaderProps {
  title: string;
  location: string;
  rating: number;
  pricePerNight: number;
}

const AccommodationHeader: React.FC<AccommodationHeaderProps> = ({
  title,
  location,
  rating,
  pricePerNight,
}) => {
  const lowSeasonRate = (pricePerNight * 0.75).toFixed(0);
  const highSeasonRate = (pricePerNight * 2).toFixed(0);

  return (
    <div className="pb-2 border-b border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <div className="flex items-center">
              <StarIcon size={18} className="text-yellow-500 fill-yellow-500" />
              <span className="ml-1 font-medium">{rating.toFixed(2)}</span>
            </div>
            <span className="mx-2">•</span>
            <span>{location}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-end">
          <div>
            <span className="text-2xl font-semibold">Kes {pricePerNight}</span>
            <span className="text-gray-600"> / night</span>
          </div>
          <div className="mt-1 sm:mt-0 sm:ml-4 text-sm text-gray-500">
            <span>Seasonal rates may apply</span>
            <div className="text-xs">
              <span>Low season: Kes {lowSeasonRate}/night</span>
              <span className="mx-1">•</span>
              <span>High season: Kes {highSeasonRate}/night</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationHeader;
