import React from 'react';

interface Props { label: string; onClick: () => void; color: string; }
export const ActionButton: React.FC<Props> = ({ label, onClick, color }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2 rounded-full font-bold text-white transition-all transform hover:scale-105 bg-${color}-500`}
  >
    {label}
  </button>
);
