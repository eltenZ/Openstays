import React from "react";
import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

const TripCard = ({ id, title, description, image, price }) => {
  return (
    <div className="max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={image || "https://via.placeholder.com/400x300"}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className="backdrop-blur-md bg-white/30 p-2 rounded-full">
            <BadgeCheck className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mt-1 mb-4">
          {description.length > 100 ? `${description.substring(0, 97)}...` : description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">From</span>
            <span className="font-semibold text-lg">Kes {price}</span>
          </div>
          <Link
            to={`/trips/${id}`}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
