import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-8 h-12 min-h-[48px] border-b border-gray-200 bg-white rounded-t-2xl w-full whitespace-nowrap">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-100 rounded-sm border border-green-300 inline-block mr-1" />
          Workspace
        </span>
        <span className="mx-1">&gt;</span>
        <span>Folder 2</span>
        <span className="mx-1">&gt;</span>
        <span className="text-gray-900 font-semibold">Spreadsheet 3</span>
        <span className="ml-1 text-gray-400">...</span>
      </nav>
      {/* Right side: search, bell, avatar */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search within sheet"
          className="px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-56 bg-gray-50 placeholder-gray-400 align-middle"
        />
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 align-middle"
          onClick={() => console.log('Notifications clicked')}
          aria-label="Notifications"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11c0-3.07-1.64-5.64-5-5.958V4a1 1 0 1 0-2 0v1.042C7.64 5.36 6 7.929 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-base border border-blue-200 align-middle">
          JD
        </div>
      </div>
    </header>
  );
};

export default Header; 