import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition ${props.className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
