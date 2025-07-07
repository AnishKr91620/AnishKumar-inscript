import React from 'react';

type Status = 'In-process' | 'Complete' | 'Blocked' | 'Need to start';

const statusStyles: Record<Status, string> = {
  'In-process': 'bg-yellow-100 text-yellow-800',
  'Complete': 'bg-green-100 text-green-800',
  'Blocked': 'bg-red-100 text-red-800',
  'Need to start': 'bg-red-500 text-gray-800',
};

const StatusPill: React.FC<{ status: Status }> = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>{status}</span>
);

export default StatusPill; 