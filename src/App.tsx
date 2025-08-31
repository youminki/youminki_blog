import { useState } from 'react';
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
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 탭 콘텐츠 - flex-grow로 남은 공간 차지 */}
      <main style={{ flex: '1 0 auto' }}>
        {activeTab === 'portfolio' ? <HomePage /> : <Blog />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
