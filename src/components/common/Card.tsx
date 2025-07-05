import React from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow" style={style}>
      {children}
    </div>
  );
};

export default Card;
