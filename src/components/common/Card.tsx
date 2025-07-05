import React from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, background: '#fff', ...style }}>
      {children}
    </div>
  );
};

export default Card;
