import React, { useState } from 'react';

const tabs = [
  'All Orders',
  'Pending',
  'Reviewed',
  'Arrived',
];

const TabNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex items-center gap-2 px-8 py-2 bg-white border-b border-gray-200">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors duration-150 ${activeTab === idx ? 'bg-blue-50 text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setActiveTab(idx)}
        >
          {tab}
        </button>
      ))}
      <button
        className="ml-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-lg"
        onClick={() => console.log('Add tab clicked')}
        aria-label="Add tab"
      >
        +
      </button>
    </div>
  );
};

export default TabNavigation; 