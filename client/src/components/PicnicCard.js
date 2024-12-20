import React from "react";
import { Link } from "react-router-dom";

const PicnicCard = ({ picnic }) => {
  return (
    <div className="w-full max-w-[360px] mx-auto bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-[240px]">
        <img
          src={`${process.env.PUBLIC_URL}/${picnic.image}`}
          alt={picnic.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-black/40 text-white text-sm px-3 py-1 rounded-md">
          <p>Verified</p>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold">{picnic.title}</h2>
        <p className="text-sm text-gray-600 truncate">{picnic.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-blue-600 font-bold text-lg">
            {`KES ${picnic.price}`}
          </span>
          <Link
            to={`/picnics/${picnic.id}`}
            className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PicnicCard;
