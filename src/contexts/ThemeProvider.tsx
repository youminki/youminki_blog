import React, { useState, useEffect } from 'react';
import { ThemeContext, type Theme } from './ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // 로컬 스토리지에서 테마 가져오기
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    // 기본값을 다크모드로 설정
    return 'dark';
  });

  useEffect(() => {
    // 테마 변경 시 로컬 스토리지에 저장
    localStorage.setItem('theme', theme);
    // HTML 클래스에 테마 적용
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
