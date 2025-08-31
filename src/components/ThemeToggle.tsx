import { useTheme } from '../hooks/useTheme';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MdDarkMode className="w-5 h-5" />
      ) : (
        <MdLightMode className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
