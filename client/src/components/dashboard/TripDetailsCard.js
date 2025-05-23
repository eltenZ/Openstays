import React from 'react';
import { MapPin, Calendar, Users, Edit } from 'lucide-react';

export const TripDetailsCard = ({ holiday }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-medium">
            {holiday.title} – {holiday.location}
          </h2>
          <button className="p-1.5 rounded-full hover:bg-gray-100">
            <Edit size={16} />
          </button>
        </div>
        <p className="text-gray-500 mt-2">{holiday.description}</p>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-1.5" />
            <span>{holiday.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-1.5" />
            <span>{holiday.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-1.5" />
            <span>{holiday.participants.join(', ')}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Itinerary</h3>
          <button className="text-sm text-gray-600 hover:text-black">
            + Add Item
          </button>
        </div>
        <ul className="space-y-3">
          <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <div>
              <h4 className="font-medium">Luxury Beach Villa in Diani</h4>
              <p className="text-sm text-gray-500">Accommodation • 4 nights</p>
            </div>
            <span className="text-sm font-medium">KES 30,000</span>
          </li>
          <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <div>
              <h4 className="font-medium">Mombasa City Tour</h4>
              <p className="text-sm text-gray-500">Experience • Half day</p>
            </div>
            <span className="text-sm font-medium">KES 8,000</span>
          </li>
          <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <div>
              <h4 className="font-medium">Kilifi Cultural Experience</h4>
              <p className="text-sm text-gray-500">Experience • Full day</p>
            </div>
            <span className="text-sm font-medium">KES 7,000</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
