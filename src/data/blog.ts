export interface BlogPost {
  id: number;
  title: string;
  url: string;
  category: string;
  date: string;
  tags: string[];
  postType?: 'react19' | 'typescript59' | 'custom';
  summary: string;
}

// ID 중복 검사 및 자동 할당 함수
const usedIds = new Set<number>();

const getUniqueId = (requestedId?: number): number => {
  if (requestedId && !usedIds.has(requestedId)) {
    usedIds.add(requestedId);
    return requestedId;
  }

  // 요청된 ID가 중복되거나 없으면 자동으로 할당
  let newId = requestedId || 1;
  while (usedIds.has(newId)) {
    newId++;
  }
  usedIds.add(newId);
  return newId;
};

// 블로그 포스트 생성 헬퍼 함수
const createBlogPost = (config: {
  id?: number;
  title: string;
  url: string;
  summary: string;
  category: string;
  postType: 'react19' | 'typescript59' | 'custom';
  tags: string[];
  customDate?: string;
}): BlogPost => {
  let date: string;

  if (config.customDate) {
    date = config.customDate;
  } else {
    switch (config.postType) {
      case 'react19':
        date = '2024.12.05';
        break;
      case 'typescript59':
        date = '2024.11.05';
        break;
      default:
        date = new Date()
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\./g, '.')
          .replace(/\s/g, '');
    }
  }

  return {
    id: getUniqueId(config.id),
    title: config.title,
    url: config.url,
    summary: config.summary,
    category: config.category,
    date,
    tags: config.tags,
    postType: config.postType,
  };
};

// ID 중복 검증 함수 export
export const validateBlogIds = (): boolean => {
  const ids = BLOG_POSTS.map(post => post.id);
  const uniqueIds = new Set(ids);
  return ids.length === uniqueIds.size;
};

// 카테고리 목록 가져오기
export const getAllCategories = (): string[] => {
  const categories = new Set(BLOG_POSTS.map(post => post.category));
  return Array.from(categories).sort();
};

export const BLOG_POSTS: BlogPost[] = [
  createBlogPost({
    id: 1,
    title: 'React 19의 새로운 기능들',
    customDate: '2025.07.01',
    url: 'https://react.dev/blog/2024/12/05/react-19',
    summary:
      'React 19의 혁신적인 Actions 시스템과 새로운 기능들을 소개합니다. 비동기 작업을 선언적으로 처리할 수 있는 방법과 개발자 경험의 향상에 대해 알아보세요.',
    category: 'React',
    tags: ['React', 'React19', 'Actions', 'useActionState', 'Frontend'],
    postType: 'react19',
  }),

  createBlogPost({
    id: 3,
    title: 'React Effect의 생명주기 완벽 가이드',
    customDate: '2025.07.03',
    url: 'https://react.dev/learn/lifecycle-of-reactive-effects',
    summary:
      'React의 useEffect Hook의 생명주기를 자세히 알아보고, 언제 실행되고 정리되는지 완벽하게 이해해보세요. Effect의 올바른 사용법과 주의사항을 다룹니다.',
    category: 'React',
    postType: 'custom',
    tags: [
      'React',
      'useEffect',
      'Lifecycle',
      'Hooks',
      'Frontend',
      'JavaScript',
    ],
  }),
  createBlogPost({
    id: 4,
    title: '커스텀 Hook 설계 패턴과 모범 사례',
    customDate: '2025.07.04',
    url: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
    summary:
      'React 커스텀 Hook을 효과적으로 설계하고 사용하는 방법을 알아봅니다. 재사용 가능한 로직을 Hook으로 분리하는 패턴과 모범 사례를 다룹니다.',
    category: 'React',
    postType: 'custom',
    tags: [
      'React',
      'Custom Hooks',
      'Logic Reuse',
      'Design Patterns',
      'Frontend',
      'JavaScript',
    ],
  }),
  createBlogPost({
    id: 5,
    title: 'TanStack Query로 서버 상태 관리 마스터하기',
    customDate: '2025.07.05',
    url: 'https://tanstack.com/query/latest',
    summary:
      'TanStack Query(React Query)를 사용하여 서버 상태를 효율적으로 관리하는 방법을 알아봅니다. 캐싱, 동기화, 에러 처리 등 고급 기능들을 다룹니다.',
    category: 'React',
    postType: 'custom',
    tags: [
      'TanStack Query',
      'React Query',
      '서버 상태 관리',
      'Caching',
      'Frontend',
      'Data Fetching',
    ],
  }),
  createBlogPost({
    id: 6,
    title: 'Next.js 15의 새로운 기능과 성능 최적화',
    customDate: '2025.07.06',
    url: 'https://nextjs.org/blog/next-15',
    summary:
      'Next.js 15에서 도입된 새로운 기능들과 성능 최적화 기법을 살펴봅니다. App Router의 개선사항과 새로운 빌드 최적화에 대해 알아보세요.',
    category: 'Next.js',
    postType: 'custom',
    tags: [
      'Next.js',
      'Next.js15',
      'Performance',
      'App Router',
      'Frontend',
      'React',
    ],
  }),

  createBlogPost({
    id: 8,
    title: '웹 성능 최적화를 위한 Core Web Vitals 완벽 가이드',
    customDate: '2025.07.08',
    url: 'https://web.dev/vitals/',
    summary:
      'Google의 Core Web Vitals를 이해하고 웹 성능을 최적화하는 방법을 알아봅니다. LCP, FID, CLS 지표를 개선하는 실전 기법을 다룹니다.',
    category: 'Performance',
    postType: 'custom',
    tags: [
      'Performance',
      'Core Web Vitals',
      'LCP',
      'FID',
      'CLS',
      'Web Optimization',
    ],
  }),
  createBlogPost({
    id: 9,
    title: 'JavaScript 비동기 프로그래밍 완벽 가이드',
    customDate: '2025.07.09',
    url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous',
    summary:
      'JavaScript의 비동기 프로그래밍을 완벽하게 이해해보세요. Promise, async/await, 이벤트 루프 등 핵심 개념들을 자세히 다룹니다.',
    category: 'JavaScript',
    postType: 'custom',
    tags: [
      'JavaScript',
      'Asynchronous',
      'Promise',
      'async/await',
      'Event Loop',
      'Programming',
    ],
  }),
];
