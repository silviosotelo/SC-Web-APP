import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, selected }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white rounded-2xl p-4 transition-all duration-200
        ${onClick ? 'cursor-pointer hover:shadow-md active:scale-[0.98]' : ''}
        ${selected ? 'ring-2 ring-secondary-500 bg-secondary-50' : 'border border-gray-100 shadow-sm'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;