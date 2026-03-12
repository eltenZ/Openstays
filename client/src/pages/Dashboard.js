import React from 'react';
import { TripDetailsCard } from '../components/dashboard/TripDetailsCard';
import { PaymentCard } from '../components/dashboard/PaymentCard';


export const Dashboard = ({ holiday, sectionRefs }) => {
  const booking = holiday.reservations?.[0];

  return (
    <div className="space-y-6 pb-10">
      {/* Progress bar */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex justify-between mb-2 text-sm">
          <span className="font-medium">Booking Progress</span>
          <span>{booking ? '10%' : '0%'}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-black h-2 rounded-full"
            style={{ width: booking ? '10%' : '0%' }}
          ></div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div ref={sectionRefs.reservations}>
            <TripDetailsCard holiday={holiday} booking={booking} />
          </div>
         
          <div ref={sectionRefs.payments}>
            <PaymentCard
  booking={booking}
  participants={holiday.participants}
/>
          </div>
        </div>


      </div>
    </div>
  );
};
