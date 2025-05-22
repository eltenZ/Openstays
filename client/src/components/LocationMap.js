import React from "react";

interface LocationMapProps {
  latitude: number;
  longitude: number;
  locationName?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude, locationName }) => {
  // Construct the Google Maps Embed URL. Adjust parameters as needed.
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${latitude},${longitude}`;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Location</h2>
      <div className="w-full h-64">
        <iframe
          title="Accommodation Location"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
          className="rounded-2xl"
        ></iframe>
      </div>
      {locationName && <p className="mt-4 text-gray-600">{locationName}</p>}
    </div>
  );
};

export default LocationMap;
