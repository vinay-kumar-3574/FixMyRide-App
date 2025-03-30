import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Car, 
  HelpCircle, 
  History, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const sidebarLinks = [
    {
      path: "/dashboard/vehicles",
      icon: <Car size={20} />,
      label: "Vehicles"
    },
    {
      path: "/dashboard/request",
      icon: <HelpCircle size={20} />,
      label: "Request Assistance"
    },
    {
      path: "/dashboard/history",
      icon: <History size={20} />,
      label: "History"
    },
    {
      path: "/dashboard/settings",
      icon: <Settings size={20} />,
      label: "Settings"
    }
  ];

  return (
    <div className={`fixed left-0 top-[64px] h-[calc(100vh-64px)] bg-white dark:bg-gray-800 shadow-md 
      transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-4 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md 
          hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Navigation Links */}
      <nav className="p-4">
        {sidebarLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) => `
              flex items-center gap-4 p-3 rounded-lg mb-2
              ${isActive ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 
                'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}
              transition-all duration-200
            `}
          >
            <span className="text-inherit">{link.icon}</span>
            {isOpen && (
              <span className="text-inherit font-medium whitespace-nowrap overflow-hidden">
                {link.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
