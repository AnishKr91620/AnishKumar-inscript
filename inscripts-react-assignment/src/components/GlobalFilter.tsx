import React, { useState } from 'react';
import { useAsyncDebounce } from '../utils/useAsyncDebounce';

interface GlobalFilterProps {
  filter: string;
  setFilter: (value: string | undefined) => void;
}

export const GlobalFilter: React.FC<GlobalFilterProps> = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value: string) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
}; 