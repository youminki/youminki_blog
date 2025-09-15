import '../styles/Header.css';
import { useEffect, useState } from 'react';

interface HeaderProps {
  activeTab: 'portfolio' | 'blog';
  onTabChange: (tab: 'portfolio' | 'blog') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="header-inner">
          {/* 로고 */}
          <div className="logo">
            <h1
              onClick={() => {
                onTabChange('portfolio');
              }}
            >
              youminki
            </h1>
          </div>

          {/* 중앙 탭 네비게이션 */}
          <div className="tab-navigation">
            <button
              onClick={() => {
                onTabChange('portfolio');
              }}
              className={`tab-button ${activeTab === 'portfolio' ? 'active' : ''}`}
            >
              포트폴리오
            </button>

            <button
              onClick={() => {
                onTabChange('blog');
              }}
              className={`tab-button ${activeTab === 'blog' ? 'active' : ''}`}
            >
              블로그
            </button>
          </div>
        </div>

        {/* 바텀바 */}
        <div className="bottom-bar">
          <div
            className={`bottom-bar-indicator ${activeTab === 'portfolio' ? 'portfolio' : 'blog'}`}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
