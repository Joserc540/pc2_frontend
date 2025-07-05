import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} style={{ padding: '8px 16px', borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer', ...props.style }}>
      {children}
    </button>
  );
};

export default Button;
