import React from 'react';
import { getButtonClasses } from '../../utils/styles';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = React.memo(
  ({
    children,
    variant = 'primary',
    onClick,
    className = '',
    disabled = false,
    type = 'button',
  }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${getButtonClasses(variant)} ${className}`}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
