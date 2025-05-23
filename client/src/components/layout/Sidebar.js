import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, CreditCard, Bell, MessageSquare, Star, X } from 'lucide-react';

export const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define your dashboard routes
  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Reservation', path: '/dashboard/reservation' },
    { icon: <CheckSquare size={18} />,    label: 'Selections',   path: '/dashboard/selections' },
    { icon: <CreditCard size={18} />,     label: 'Payments',     path: '/dashboard/payments' },
    { icon: <Bell size={18} />,           label: 'Notifications',path: '/dashboard/notifications' },
    { icon: <MessageSquare size={18} />,  label: 'Group Chat',   path: '/dashboard/group-chat' },
    { icon: <Star size={18} />,           label: 'Reviews',      path: '/dashboard/reviews' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full z-30 bg-white w-64
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          border-r border-gray-200
        `}
      >
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="font-medium">Menu</h2>
          <button onClick={closeSidebar} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    navigate(item.path);
                    if (closeSidebar) closeSidebar();
                  }}
                  className={`
                    flex items-center w-full text-left px-6 py-3 text-sm
                    ${location.pathname === item.path
                      ? 'text-black font-medium border-r-2 border-black bg-gray-50'
                      : 'text-gray-500 hover:text-black hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};