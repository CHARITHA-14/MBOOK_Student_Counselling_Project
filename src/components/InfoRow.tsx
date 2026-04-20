import React from 'react';

interface InfoRowProps {
  label: string;
  value: string | number;
  className?: string;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, className = '' }) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100 ${className}`}>
      <span className="text-sm font-medium text-gray-600 sm:w-1/3">{label}:</span>
      <span className="text-sm text-gray-800 sm:w-2/3 mt-1 sm:mt-0">{value}</span>
    </div>
  );
};
