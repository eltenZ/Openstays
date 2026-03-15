import React from 'react';
import { MapPin, Calendar, Users, Edit } from 'lucide-react';

export const TripDetailsCard = ({ holiday, booking }) => {
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
        

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-1.5" />
            <span>{holiday.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-1.5" />
            <span>{holiday.date}</span>
          </div>
          <div className="hidden flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-1.5" />
            <span>{holiday.participants.join(', ')}</span>
          </div>
        </div>

        {/* Booking Info (if available) */}
        {booking && (
          <div className="mt-5 p-4 bg-blue-50 rounded-md border border-blue-100">
            <h3 className="font-medium mb-2">Your Reservation</h3>
            <p>
              <strong>Check-in:</strong> {booking.checkIn.toDateString()}
            </p>
            <p>
              <strong>Check-out:</strong> {booking.checkOut.toDateString()}
            </p>
            <p>
              <strong>Nights:</strong> {booking.nights}
            </p>
            <p>
              <strong>Price per night:</strong> KES {booking.price.toLocaleString()}
            </p>
            <p className="font-medium">
              <strong>Total:</strong> KES {(booking.price * booking.nights).toLocaleString()}
            </p>
          </div>
        )}
      </div>
	</div>

  );
};
