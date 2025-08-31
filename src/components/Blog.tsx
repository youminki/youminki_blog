import { useBlogModal, type BlogPost } from '../hooks/useBlogModal';
import { useState } from 'react';

const Blog = () => {
  const { isOpen, openModal, closeModal } = useBlogModal();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'React 18의 새로운 기능들',
      content: `React 18에서 추가된 Concurrent Features, Automatic Batching, Suspense on the Server 등 새로운 기능들을 살펴보고 실제 프로젝트에 어떻게 적용할 수 있는지 알아봅니다.

## 주요 기능

### 1. Concurrent Features
- React의 렌더링을 중단하고 재개할 수 있는 기능
- 사용자 입력에 즉시 반응하는 UI 구현 가능
- 백그라운드에서 렌더링 작업 수행

### 2. Automatic Batching
- 여러 상태 업데이트를 자동으로 배치 처리
- 불필요한 리렌더링 방지
- 성능 향상

### 3. Suspense on the Server
- 서버 사이드 렌더링에서도 Suspense 사용 가능
- 스트리밍 SSR 지원
- 점진적 HTML 전송

## 실제 적용 예시

\`\`\`jsx
import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

이러한 기능들을 활용하면 더 나은 사용자 경험을 제공할 수 있습니다.`,
      category: 'React',
      date: '2024.01.15',
      readTime: '5분 읽기',
      thumbnailColor: '#f1f5f9',
      categoryColor: '#3b82f6',
      tags: ['React', 'Frontend', 'JavaScript', 'React18'],
    },
    {
      id: 2,
      title: 'TypeScript로 더 안전한 코드 작성하기',
      content: `TypeScript의 타입 시스템을 활용하여 런타임 에러를 줄이고 코드 품질을 향상시키는 방법들을 실무 경험을 바탕으로 정리했습니다.

## TypeScript의 장점

### 1. 타입 안전성
- 컴파일 타임에 타입 오류 감지
- 런타임 에러 사전 방지
- 코드 품질 향상

### 2. 개발자 경험
- 자동완성과 IntelliSense
- 리팩토링 시 안전성
- 명확한 API 문서화

### 3. 팀 협업
- 코드 가독성 향상
- 명확한 인터페이스 정의
- 유지보수성 증대

## 실무 활용 팁

\`\`\`typescript
// 유니온 타입 활용
type Status = 'loading' | 'success' | 'error';

// 제네릭 활용
interface ApiResponse<T> {
  data: T;
  status: Status;
  message: string;
}

// 타입 가드 활용
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
\`\`\`

TypeScript를 적극 활용하면 더 안전하고 유지보수하기 좋은 코드를 작성할 수 있습니다.`,
      category: 'TypeScript',
      date: '2024.01.10',
      readTime: '7분 읽기',
      thumbnailColor: '#ecfdf5',
      categoryColor: '#10b981',
      tags: ['TypeScript', 'Development', 'BestPractices', 'TypeSafety'],
    },
    {
      id: 3,
      title: 'Next.js 13 App Router 완벽 가이드',
      content: `Next.js 13의 새로운 App Router를 사용하여 현대적인 웹 애플리케이션을 구축하는 방법과 기존 Pages Router와의 차이점을 자세히 알아봅니다.

## App Router의 특징

### 1. 파일 기반 라우팅
- 폴더 구조로 라우트 정의
- 중첩 레이아웃 지원
- 동적 라우트와 정적 라우트

### 2. 서버 컴포넌트
- 기본적으로 서버에서 렌더링
- 클라이언트 번들 크기 감소
- SEO 최적화

### 3. 스트리밍
- 점진적 HTML 전송
- 사용자 경험 향상
- 로딩 상태 관리

## 실제 구현 예시

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Next.js 13</h1>
    </main>
  );
}
\`\`\`

App Router를 활용하면 더 현대적이고 효율적인 웹 애플리케이션을 구축할 수 있습니다.`,
      category: 'Next.js',
      date: '2024.01.05',
      readTime: '10분 읽기',
      thumbnailColor: '#faf5ff',
      categoryColor: '#8b5cf6',
      tags: ['Next.js', 'React', 'WebDevelopment', 'AppRouter'],
    },
    {
      id: 4,
      title: '실무에서 자주 사용하는 CSS Grid 레이아웃 패턴',
      content: `CSS Grid를 활용한 실무 레이아웃 패턴들을 정리했습니다. 반응형 디자인과 복잡한 레이아웃을 효율적으로 구현하는 방법을 알아봅니다.

## Grid 레이아웃의 장점

### 1. 2차원 레이아웃
- 행과 열을 동시에 제어
- 복잡한 레이아웃 구현 가능
- 유연한 공간 배분

### 2. 반응형 디자인
- 미디어 쿼리와 연동
- 다양한 화면 크기 대응
- 자동 레이아웃 조정

### 3. 성능 최적화
- 불필요한 마크업 감소
- CSS 계산 최적화
- 렌더링 성능 향상

## 실무 활용 예시

\`\`\`css
/* 카드 그리드 레이아웃 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

/* 반응형 그리드 */
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
}
\`\`\`

CSS Grid를 마스터하면 복잡한 레이아웃도 쉽게 구현할 수 있습니다.`,
      category: 'CSS',
      date: '2024.01.01',
      readTime: '8분 읽기',
      thumbnailColor: '#fef3c7',
      categoryColor: '#f59e0b',
      tags: ['CSS', 'Grid', 'Layout', 'ResponsiveDesign'],
    },
    {
      id: 5,
      title: 'JavaScript 성능 최적화 실전 가이드',
      content: `JavaScript 애플리케이션의 성능을 향상시키는 실전적인 방법들을 정리했습니다. 메모리 누수 방지, 렌더링 최적화, 번들 크기 감소 등 다양한 기법을 알아봅니다.

## 성능 최적화 핵심

### 1. 메모리 관리
- 클로저 메모리 누수 방지
- 이벤트 리스너 정리
- 가비지 컬렉션 최적화

### 2. 렌더링 최적화
- 불필요한 리렌더링 방지
- 가상화 기법 활용
- 디바운싱과 쓰로틀링

### 3. 번들 최적화
- Tree Shaking
- 코드 스플리팅
- 동적 임포트

## 실무 적용 예시

\`\`\`javascript
// 디바운싱 구현
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 가상화 스크롤
const VirtualList = ({ items, itemHeight, containerHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const visibleItems = items.slice(
    Math.floor(scrollTop / itemHeight),
    Math.floor((scrollTop + containerHeight) / itemHeight)
  );
  
  return (
    <div style={{ height: containerHeight, overflow: 'auto' }}>
      {visibleItems.map(item => (
        <div key={item.id} style={{ height: itemHeight }}>
          {item.content}
        </div>
      ))}
    </div>
  );
};
\`\`\`

성능 최적화는 사용자 경험을 크게 향상시킬 수 있습니다.`,
      category: 'JavaScript',
      date: '2023.12.28',
      readTime: '12분 읽기',
      thumbnailColor: '#fef2f2',
      categoryColor: '#ef4444',
      tags: ['JavaScript', 'Performance', 'Optimization', 'Memory'],
    },
    {
      id: 6,
      title: '프론트엔드 개발자 면접 준비 가이드',
      content: `프론트엔드 개발자 면접에서 자주 나오는 질문들과 답변 방법을 정리했습니다. 기술적 질문부터 프로젝트 설명까지 체계적으로 준비하는 방법을 알아봅니다.

## 면접 준비 포인트

### 1. 기술적 질문
- JavaScript 핵심 개념
- React 생명주기와 훅
- 웹 성능 최적화
- 브라우저 렌더링 과정

### 2. 프로젝트 설명
- 문제 해결 과정
- 기술 선택 이유
- 팀 협업 경험
- 성과와 개선점

### 3. 코딩 테스트
- 알고리즘 문제 풀이
- 코드 품질과 가독성
- 에러 처리 방법
- 테스트 코드 작성

## 면접 질문 예시

**Q: React의 Virtual DOM이 무엇이고 왜 사용하나요?**

A: Virtual DOM은 실제 DOM의 가상 표현으로, 메모리에 가벼운 복사본을 만들어 상태 변경을 추적합니다. 실제 DOM 조작은 비용이 크므로, Virtual DOM에서 변경사항을 계산한 후 최소한의 DOM 업데이트만 수행하여 성능을 향상시킵니다.

**Q: 웹 성능을 측정하는 방법은?**

A: Lighthouse, WebPageTest, Chrome DevTools의 Performance 탭 등을 사용합니다. Core Web Vitals, First Contentful Paint, Largest Contentful Paint 등의 지표를 중점적으로 확인합니다.

체계적인 준비로 좋은 결과를 얻을 수 있습니다.`,
      category: '개발팁',
      date: '2023.12.25',
      readTime: '15분 읽기',
      thumbnailColor: '#e0e7ff',
      categoryColor: '#6366f1',
      tags: ['Interview', 'Career', 'Frontend', 'Preparation'],
    },
    {
      id: 7,
      title: 'Git으로 협업하는 개발팀을 위한 가이드',
      content: `Git을 활용한 효율적인 협업 방법과 워크플로우를 정리했습니다. 브랜치 전략, 커밋 메시지 작성법, 코드 리뷰 프로세스 등 실무에서 바로 적용할 수 있는 내용들입니다.

## Git 협업 핵심

### 1. 브랜치 전략
- Git Flow vs GitHub Flow
- Feature 브랜치 활용
- Hotfix 브랜치 관리
- 브랜치 네이밍 컨벤션

### 2. 커밋 메시지
- Conventional Commits
- 의미있는 커밋 메시지
- 커밋 단위 관리
- 히스토리 정리

### 3. 코드 리뷰
- Pull Request 작성법
- 리뷰어 역할과 책임
- 자동화 도구 활용
- 리뷰 문화 조성

## 실무 워크플로우

\`\`\`bash
# 기능 개발 시작
git checkout -b feature/user-authentication
git add .
git commit -m "feat: 사용자 인증 기능 구현

- JWT 토큰 기반 인증
- 로그인/로그아웃 API 연동
- 보안 미들웨어 추가"

# 개발 완료 후 PR 생성
git push origin feature/user-authentication
# GitHub에서 Pull Request 생성
\`\`\`

**PR 템플릿 예시:**
- 변경사항 요약
- 테스트 방법
- 관련 이슈
- 스크린샷 (UI 변경시)

효율적인 Git 워크플로우로 팀 생산성을 높일 수 있습니다.`,
      category: '개발팁',
      date: '2023.12.20',
      readTime: '10분 읽기',
      thumbnailColor: '#f3e8ff',
      categoryColor: '#a855f7',
      tags: ['Git', 'Collaboration', 'Workflow', 'TeamWork'],
    },
    {
      id: 8,
      title: '웹 접근성(Accessibility) 실무 적용법',
      content: `웹 접근성을 실무에 적용하는 구체적인 방법들을 정리했습니다. WCAG 가이드라인 준수, 스크린 리더 지원, 키보드 네비게이션 등 실제 개발에서 고려해야 할 요소들을 알아봅니다.

## 접근성 핵심 요소

### 1. 시맨틱 마크업
- HTML5 시맨틱 태그 활용
- 적절한 헤딩 구조
- ARIA 속성 활용
- 의미있는 링크 텍스트

### 2. 키보드 네비게이션
- Tab 순서 관리
- 포커스 표시
- 키보드 단축키
- 스킵 링크

### 3. 스크린 리더 지원
- 대체 텍스트 제공
- 라벨과 입력 필드 연결
- 상태 변경 알림
- 오류 메시지 전달

## 실무 적용 예시

\`\`\`jsx
// 접근성 개선된 컴포넌트
function AccessibleButton({ children, onClick, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        border: 'none',
        backgroundColor: 'var(--accent-color)',
        color: 'white',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {children}
    </button>
  );
}

// 스크린 리더용 상태 알림
const [status, setStatus] = useState('');
useEffect(() => {
  if (status) {
    // 스크린 리더에게 상태 변경 알림
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = status;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}, [status]);
\`\`\`

접근성을 고려한 개발은 모든 사용자를 위한 포용적인 웹을 만듭니다.`,
      category: '개발팁',
      date: '2023.12.15',
      readTime: '13분 읽기',
      thumbnailColor: '#ecfdf5',
      categoryColor: '#059669',
      tags: ['Accessibility', 'WCAG', 'InclusiveDesign', 'UX'],
    },
  ];

  const categories = [
    '전체',
    'React',
    'TypeScript',
    'Next.js',
    'JavaScript',
    'CSS',
    '개발팁',
  ];

  const filteredPosts =
    selectedCategory === '전체'
      ? blogPosts
      : blogPosts.filter(post => post.category === selectedCategory);

  const handlePostClick = (post: BlogPost) => {
    console.log('블로그 포스트 클릭됨:', post.title);
    setSelectedPost(post);
    openModal(post);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <main style={{ padding: '2rem 0' }}>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          {/* 카테고리 필터 */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '1.5rem',
                  border: '1px solid var(--border-color)',
                  backgroundColor:
                    selectedCategory === category
                      ? 'var(--accent-color)'
                      : 'var(--bg-secondary)',
                  color:
                    selectedCategory === category
                      ? 'white'
                      : 'var(--text-primary)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor =
                      'var(--accent-color)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'var(--accent-color)';
                  }
                }}
                onMouseLeave={e => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor =
                      'var(--bg-secondary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 포스트 개수 표시 */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '2rem',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
            }}
          >
            {filteredPosts.length}개의 포스트
          </div>

          {/* 블로그 포스트 그리드 */}
          <div
            style={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'repeat(2, 1fr)',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {filteredPosts.map(post => (
              <article
                key={post.id}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 25px var(--shadow-medium)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => handlePostClick(post)}
              >
                {/* 썸네일 이미지 */}
                <div
                  style={{
                    height: '200px',
                    backgroundColor: post.thumbnailColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: post.categoryColor,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                  }}
                >
                  {post.category}
                </div>

                {/* 포스트 내용 */}
                <div style={{ padding: '1.5rem' }}>
                  {/* 태그 */}
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        backgroundColor: post.categoryColor,
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '0.75rem',
                      lineHeight: '1.4',
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* 요약 */}
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.content.split('\n')[0]}
                  </p>

                  {/* 메타 정보 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 더보기 버튼 */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 4px 12px var(--shadow-medium)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              더 많은 포스트 보기
            </button>
          </div>
        </div>
      </main>

      {/* 블로그 포스트 모달 */}
      {isOpen && selectedPost && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '1rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              border: '1px solid var(--border-color)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div
              style={{
                padding: '2rem 2rem 1rem 2rem',
                borderBottom: '1px solid var(--border-color)',
                position: 'sticky',
                top: 0,
                backgroundColor: 'var(--bg-primary)',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div>
                  <span
                    style={{
                      backgroundColor: selectedPost.categoryColor,
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      display: 'inline-block',
                      marginBottom: '1rem',
                    }}
                  >
                    {selectedPost.category}
                  </span>
                  <h2
                    style={{
                      fontSize: '1.875rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem',
                      lineHeight: '1.3',
                    }}
                  >
                    {selectedPost.title}
                  </h2>
                  <div
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor =
                      'var(--bg-secondary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* 모달 내용 */}
            <div style={{ padding: '2rem' }}>
              <div
                style={{
                  color: 'var(--text-primary)',
                  lineHeight: '1.8',
                  fontSize: '1rem',
                }}
              >
                {(() => {
                  const lines = selectedPost.content.split('\n');
                  const elements = [];
                  let codeBlock = false;
                  let codeLines = [];
                  let codeLanguage = '';

                  for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    const key = `line-${i}`;

                    // 코드 블록 시작/끝 처리
                    if (line.startsWith('```')) {
                      if (!codeBlock) {
                        // 코드 블록 시작
                        codeBlock = true;
                        codeLines = [];
                        codeLanguage = line.replace('```', '').trim() || 'Code';
                        continue;
                      } else {
                        // 코드 블록 끝
                        codeBlock = false;
                        elements.push(
                          <div
                            key={key}
                            style={{
                              margin: '1.5rem 0',
                              backgroundColor: 'var(--bg-secondary)',
                              borderRadius: '0.75rem',
                              border: '1px solid var(--border-color)',
                              overflow: 'hidden',
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: 'var(--bg-primary)',
                                padding: '0.75rem 1rem',
                                borderBottom: '1px solid var(--border-color)',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                              }}
                            >
                              <div
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  backgroundColor: '#ef4444',
                                }}
                              />
                              <div
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  backgroundColor: '#f59e0b',
                                }}
                              />
                              <div
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  backgroundColor: '#10b981',
                                }}
                              />
                              <span style={{ marginLeft: '0.5rem' }}>
                                {codeLanguage}
                              </span>
                            </div>
                            <pre
                              style={{
                                margin: 0,
                                padding: '1.5rem',
                                overflow: 'auto',
                                fontSize: '0.875rem',
                                lineHeight: '1.6',
                                fontFamily:
                                  'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                                backgroundColor: 'var(--bg-secondary)',
                              }}
                            >
                              <code style={{ color: 'var(--text-primary)' }}>
                                {codeLines.join('\n')}
                              </code>
                            </pre>
                          </div>
                        );
                        continue;
                      }
                    }

                    // 코드 블록 내부 처리
                    if (codeBlock) {
                      codeLines.push(line);
                      continue;
                    }

                    // 일반 텍스트 처리
                    if (line.startsWith('## ')) {
                      elements.push(
                        <h3
                          key={key}
                          style={{
                            fontSize: '1.75rem',
                            fontWeight: '700',
                            marginTop: '2.5rem',
                            marginBottom: '1.5rem',
                            color: 'var(--text-primary)',
                            borderBottom: '2px solid var(--accent-color)',
                            paddingBottom: '0.5rem',
                          }}
                        >
                          {line.replace('## ', '')}
                        </h3>
                      );
                    } else if (line.startsWith('### ')) {
                      elements.push(
                        <h4
                          key={key}
                          style={{
                            fontSize: '1.375rem',
                            fontWeight: '600',
                            marginTop: '2rem',
                            marginBottom: '1rem',
                            color: 'var(--accent-color)',
                            paddingLeft: '0.5rem',
                            borderLeft: '4px solid var(--accent-color)',
                          }}
                        >
                          {line.replace('### ', '')}
                        </h4>
                      );
                    } else if (line.trim() === '') {
                      elements.push(
                        <div key={key} style={{ height: '1.5rem' }} />
                      );
                    } else if (line.startsWith('- ')) {
                      elements.push(
                        <div
                          key={key}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            marginBottom: '0.75rem',
                            paddingLeft: '1rem',
                          }}
                        >
                          <span
                            style={{
                              color: 'var(--accent-color)',
                              marginRight: '0.75rem',
                              marginTop: '0.5rem',
                              fontSize: '1.5rem',
                              lineHeight: 1,
                            }}
                          >
                            •
                          </span>
                          <span style={{ flex: 1, lineHeight: '1.7' }}>
                            {line.replace('- ', '')}
                          </span>
                        </div>
                      );
                    } else if (line.startsWith('**') && line.endsWith('**')) {
                      elements.push(
                        <p
                          key={key}
                          style={{
                            marginBottom: '1rem',
                            fontWeight: '600',
                            color: 'var(--accent-color)',
                            fontSize: '1.125rem',
                          }}
                        >
                          {line.replace(/\*\*/g, '')}
                        </p>
                      );
                    } else if (
                      line.startsWith('**Q:') ||
                      line.startsWith('**A:')
                    ) {
                      elements.push(
                        <div
                          key={key}
                          style={{
                            marginBottom: '1.5rem',
                            padding: '1.5rem',
                            backgroundColor: line.startsWith('**Q:')
                              ? 'var(--bg-secondary)'
                              : 'var(--bg-primary)',
                            borderRadius: '0.75rem',
                            border: '1px solid var(--border-color)',
                          }}
                        >
                          <div
                            style={{
                              fontWeight: '600',
                              color: line.startsWith('**Q:')
                                ? 'var(--accent-color)'
                                : 'var(--text-primary)',
                              marginBottom: '0.75rem',
                              fontSize: '1rem',
                            }}
                          >
                            {line.startsWith('**Q:') ? '❓ 질문' : '💡 답변'}
                          </div>
                          <div style={{ lineHeight: '1.7' }}>
                            {line.replace(/\*\*Q:\s*|\*\*A:\s*/g, '')}
                          </div>
                        </div>
                      );
                    } else {
                      elements.push(
                        <p
                          key={key}
                          style={{
                            marginBottom: '1.25rem',
                            lineHeight: '1.8',
                            fontSize: '1rem',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {line}
                        </p>
                      );
                    }
                  }

                  return elements;
                })()}
              </div>

              {/* 태그 섹션 */}
              <div
                style={{
                  marginTop: '3rem',
                  paddingTop: '2rem',
                  borderTop: '2px solid var(--border-color)',
                }}
              >
                <h5
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  📍 관련 태그
                </h5>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {selectedPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)',
                        padding: '0.5rem 1rem',
                        borderRadius: '1.5rem',
                        fontSize: '0.875rem',
                        border: '1px solid var(--border-color)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor =
                          'var(--accent-color)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor =
                          'var(--accent-color)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor =
                          'var(--bg-secondary)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.borderColor =
                          'var(--border-color)';
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
