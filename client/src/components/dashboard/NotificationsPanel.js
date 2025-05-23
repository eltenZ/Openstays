import React from 'react';
import { Bell } from 'lucide-react';
export const NotificationsPanel = () => {
  const notifications = [{
    id: '1',
    message: 'Juma added "Mombasa City Tour" to the itinerary.',
    time: '2 mins ago'
  }, {
    id: '2',
    message: 'Amina voted for "Luxury Villa in Diani".',
    time: '15 mins ago'
  }, {
    id: '3',
    message: 'Payment received from Karanja.',
    time: '1 hour ago'
  }, {
    id: '4',
    message: 'Mwangi created the holiday group.',
    time: '2 days ago'
  }];
  return <div className="bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <div className="flex items-center">
          <Bell size={18} className="mr-2" />
          <h2 className="font-medium">Notifications</h2>
        </div>
        <span className="text-sm text-gray-500">Mark all as read</span>
      </div>
      <div className="p-2 max-h-80 overflow-y-auto">
        {notifications.map(notification => <div key={notification.id} className="p-3 hover:bg-gray-50 rounded-md cursor-pointer">
            <p className="text-sm">{notification.message}</p>
            <span className="text-xs text-gray-500">{notification.time}</span>
          </div>)}
      </div>
      <div className="p-3 border-t border-gray-200 text-center">
        <button className="text-sm text-gray-600 hover:text-black">
          View all notifications
        </button>
      </div>
    </div>;
};