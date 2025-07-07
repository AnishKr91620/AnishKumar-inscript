import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-50 p-6 font-sans">
    <div className="max-w-[1400px] mx-auto shadow-lg rounded-2xl bg-white p-0">
      {children}
    </div>
  </div>
);

export default Layout; 