import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Blog from './components/Blog';
import { useMousePosition } from './hooks/useMousePosition';
import iconPattern from './assets/iconpattern.png';

function App() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'blog'>('portfolio');
  const mousePosition = useMousePosition();

  const handleTabChange = (tab: 'portfolio' | 'blog') => {
    setActiveTab(tab);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* 배경 패턴 - 블로그 탭에서만 표시 */}
      {activeTab === 'blog' && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${iconPattern})`,
            backgroundSize: '500px 500px', // 5배 확대
            backgroundRepeat: 'repeat',
            opacity: 0.5,
            zIndex: 0,
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.1s ease-out',
            pointerEvents: 'none',
            backgroundColor: 'var(--bg-primary)',
            filter: 'brightness(0.2) contrast(1.2)',
          }}
        />
      )}
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 탭 콘텐츠 - flex-grow로 남은 공간 차지 */}
      <main style={{ flex: '1 0 auto', position: 'relative', zIndex: 2 }}>
        {activeTab === 'portfolio' ? <HomePage /> : <Blog />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
