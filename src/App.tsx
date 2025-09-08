import { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Blog from './components/Blog';
import { useUrlParams } from './hooks/useUrlParams';
import { BLOG_POSTS } from './data/blog';
import { PROJECTS_DATA } from './data';

function App() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'blog'>('portfolio');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const { urlParams } = useUrlParams();

  // URL 파라미터에 따른 초기 상태 설정
  useEffect(() => {
    // 탭 설정
    if (
      urlParams.tab &&
      (urlParams.tab === 'portfolio' || urlParams.tab === 'blog')
    ) {
      setActiveTab(urlParams.tab);
    }

    // 카테고리 설정
    if (urlParams.category) {
      setSelectedCategory(urlParams.category);
    }

    // 블로그 모달 열기
    if (urlParams.blogId) {
      const blogPost = BLOG_POSTS.find(post => post.id === urlParams.blogId);
      if (blogPost) {
        setActiveTab('blog');
        // 모달은 Blog 컴포넌트에서 처리
      }
    }

    // 프로젝트 모달 열기
    if (urlParams.projectId) {
      const project = PROJECTS_DATA.find(
        proj => proj.id === urlParams.projectId
      );
      if (project) {
        setActiveTab('portfolio');
        // 모달은 Projects 컴포넌트에서 처리
      }
    }
  }, [urlParams]);

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
        {activeTab === 'portfolio' ? (
          <HomePage />
        ) : (
          <Blog
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}
      </main>

      <Footer />
      <SpeedInsights />
    </div>
  );
}

export default App;
