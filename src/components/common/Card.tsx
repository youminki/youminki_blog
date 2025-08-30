import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = React.memo(
  ({ children, className = '', onClick, hover = false }) => {
    const baseClasses = 'bg-gray-800 rounded-xl border border-gray-700';
    const hoverClasses = hover
      ? 'hover:border-transparent transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl'
      : '';

    return (
      <div
        className={`${baseClasses} ${hoverClasses} ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
