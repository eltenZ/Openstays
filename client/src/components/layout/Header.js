import React from 'react';
import { Menu, Plus } from 'lucide-react';

export const Header = ({ toggleSidebar, holidayName, onCreateHoliday }) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="mr-3 md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center">
          <h2 className="ml-2 text-gray-400 font-light">
            Holiday: {holidayName}
          </h2>
        </div>
      </div>
      <button
        className="flex items-center px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
        onClick={onCreateHoliday}
      >
        <Plus size={16} className="mr-1" />
        <span>New Holiday</span>
      </button>
    </header>
  );
};
