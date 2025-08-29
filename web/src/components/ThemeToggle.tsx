import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 9999,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-secondary)',
        border: '2px solid var(--border-color)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow =
          '0 20px 40px -10px rgba(0, 0, 0, 0.2)';
        e.currentTarget.style.backgroundColor = 'var(--accent-color)';
        e.currentTarget.style.borderColor = 'var(--accent-color)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow =
          '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
      }}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MdDarkMode
          style={{
            width: '24px',
            height: '24px',
            color: 'var(--text-primary)',
            transition: 'all 0.3s ease',
          }}
        />
      ) : (
        <MdLightMode
          style={{
            width: '24px',
            height: '24px',
            color: 'var(--text-primary)',
            transition: 'all 0.3s ease',
          }}
        />
      )}
    </button>
  );
};

export default ThemeToggle;
