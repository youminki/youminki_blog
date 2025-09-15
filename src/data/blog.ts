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
  createBlogPost({
    id: 10,
    title:
      '2만개 데이터로부터 12초를 4초로! LCP 최적화하기 - React 성능 최적화의 모든 것',
    customDate: '2025.07.10',
    url: 'https://velog.io/@youminki/2%EB%A7%8C%EA%B0%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A1%9C%EB%B6%80%ED%84%B0-12%EC%B4%88-4%EC%B4%88%EB%A1%9C-LCP-%EC%B5%9C%EC%A0%81%ED%99%94%ED%95%98%EA%B8%B0-React-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83',
    summary:
      'me1pik 프로젝트에서 2만개의 대용량 데이터를 처리하면서 LCP(Largest Contentful Paint)를 12초에서 4초로 개선한 실제 경험을 공유합니다. React 성능 최적화의 핵심 기법들과 실전 노하우를 담았습니다.',
    category: '경험했던 이슈',
    postType: 'custom',
    tags: [
      'Performance',
      'LCP',
      'React',
      'Optimization',
      'Core Web Vitals',
      'Frontend',
      'me1pik',
      '실전 경험',
    ],
  }),
  createBlogPost({
    id: 11,
    title: 'React에서 무한 스크롤 구현 시 발생한 메모리 누수 문제 해결기',
    customDate: '2025.07.11',
    url: 'https://velog.io/@youminki/react-infinite-scroll-memory-leak',
    summary:
      'React에서 무한 스크롤을 구현하면서 발생한 메모리 누수 문제를 해결한 과정을 공유합니다. 이벤트 리스너 정리, 컴포넌트 언마운트 처리, 그리고 성능 최적화까지 실전 경험을 담았습니다.',
    category: '경험했던 이슈',
    postType: 'custom',
    tags: [
      'React',
      'Memory Leak',
      'Infinite Scroll',
      'Performance',
      'Frontend',
      '실전 경험',
      '문제 해결',
    ],
  }),

  createBlogPost({
    id: 13,
    title: 'TypeScript에서 발생한 타입 에러들과 해결 방법 모음',
    customDate: '2025.07.13',
    url: 'https://velog.io/@youminki/typescript-common-errors-solutions',
    summary:
      'TypeScript 개발 과정에서 자주 마주치는 타입 에러들과 그 해결 방법들을 정리했습니다. Generic, Union Types, Interface 등 다양한 타입 관련 이슈들을 실전 예제와 함께 설명합니다.',
    category: '경험했던 이슈',
    postType: 'custom',
    tags: [
      'TypeScript',
      'Type Error',
      'Generic',
      'Union Types',
      'Frontend',
      '실전 경험',
      '문제 해결',
    ],
  }),
];
