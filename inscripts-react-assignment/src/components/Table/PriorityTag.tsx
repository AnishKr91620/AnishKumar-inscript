import React from 'react';

type Priority = 'High' | 'Medium' | 'Low';

const priorityStyles: Record<Priority, string> = {
  High: 'bg-red-100 text-red-600',
  Medium: 'bg-orange-100 text-orange-600',
  Low: 'bg-blue-100 text-blue-600',
};

const PriorityTag: React.FC<{ priority: Priority }> = ({ priority }) => (
  <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-bold leading-5 ${priorityStyles[priority]}`}>{priority}</span>
);

export default PriorityTag; 