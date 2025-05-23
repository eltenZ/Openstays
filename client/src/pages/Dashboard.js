import React from 'react';
import { TripDetailsCard } from '../components/dashboard/TripDetailsCard';
import { SelectionsCard } from '../components/dashboard/SelectionsCard';
import { PaymentCard } from '../components/dashboard/PaymentCard';
import { NotificationsPanel } from '../components/dashboard/NotificationsPanel';
import { GroupChatSection } from '../components/dashboard/GroupChatSection';

export const Dashboard = ({ holiday, sectionRefs }) => {
  return (
    <div className="space-y-6 pb-10">
      {/* Progress bar */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex justify-between mb-2 text-sm">
          <span className="font-medium">Booking Progress</span>
          <span>65%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-black h-2 rounded-full"
            style={{ width: '65%' }}
          ></div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div ref={sectionRefs.reservations}>
          <TripDetailsCard holiday={holiday} />
          </div>
          <div ref={sectionRefs.selections}>
          <SelectionsCard />
          </div>
          <div ref={sectionRefs.payments}>
          <PaymentCard />
          </div>
        </div>

        <div className="space-y-6">
          <div ref={sectionRefs.notifications}>
          <NotificationsPanel />
          </div>
          <div ref={sectionRefs.groupChat}>
          <GroupChatSection />
          </div>
        </div>
      </div>
    </div>
  );
};
