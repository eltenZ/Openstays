import React from "react";
import { Wifi, Car, Tv, Coffee, BedDouble } from "lucide-react";

interface AmenitiesProps {
  amenities: string[];
}

const amenityIcons: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-6 h-6 text-gray-600" />,
  Car: <Car className="w-6 h-6 text-gray-600" />,
  Tv: <Tv className="w-6 h-6 text-gray-600" />,
  Coffee: <Coffee className="w-6 h-6 text-gray-600" />,
  Bed: <BedDouble className="w-6 h-6 text-gray-600" />,
};

const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => {
          const Icon = amenityIcons[amenity] ? amenityIcons[amenity] : <BedDouble className="w-6 h-6 text-gray-600" />;
          return (
            <div key={index} className="flex items-center gap-2">
              {Icon}
              <span className="text-gray-700">{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Amenities;
