import { useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Blog from './components/Blog';

function App() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'blog'>('portfolio');

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
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 탭 콘텐츠 - flex-grow로 남은 공간 차지 */}
      <main style={{ flex: '1 0 auto', position: 'relative', zIndex: 2 }}>
        {activeTab === 'portfolio' ? <HomePage /> : <Blog />}
      </main>

      <Footer />
      <SpeedInsights />
    </div>
  );
}

export default App;
