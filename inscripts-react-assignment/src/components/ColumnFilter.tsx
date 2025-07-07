import React from 'react';

interface ColumnFilterProps {
  column: {
    filterValue: string;
    setFilter: (value: string) => void;
  };
}

export const ColumnFilter: React.FC<ColumnFilterProps> = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span className="text-[14px] font-normal text-[var(--Content-Core-contentPrimary,#121212)]">
      Search:{' '}
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
        className="w-[120px] h-[28px] px-2 py-1 border border-[var(--Border-Core-borderTertiary,#EEEEEE)] rounded-[4px] bg-[var(--Background-Core-backgroundPrimary,#fff)] text-[14px] font-normal text-[var(--Content-Core-contentPrimary,#121212)] focus:outline-none focus:ring-2 focus:ring-[var(--Colours-BrandPrimary-500,#4B6A4F)] transition duration-100"
      />
    </span>
  );
}; 