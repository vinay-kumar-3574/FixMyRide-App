import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-sm">
        <Navbar />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content and Footer Wrapper */}
      <div className={`flex flex-col min-h-screen pt-16 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Main Content */}
        <main className="flex-grow bg-gray-50 dark:bg-gray-900">
          <div className="p-6 text-black dark:text-white">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto bg-white dark:bg-gray-800 text-black dark:text-white w-full">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Layout;
