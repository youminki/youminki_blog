import type { BlogPost } from '../../src/types';
import { getUniqueId } from '../../src/utils/blogHelpers';

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
          .replace(/[.]/g, '.')
          .replace(/[ \t\n\r\f\v]/g, '');
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

export const BLOG_POSTS: BlogPost[] = [
  createBlogPost({
    id: 17,
    title: '폴링(Polling)의 개념과 활용, 그리고 대안',
    customDate: '2025.08.25.',
    url: 'https://velog.io/@youminki/%ED%8F%B4%EB%A7%81Polling%EC%9D%98-%EA%B0%9C%EB%85%90%EA%B3%BC-%ED%99%9C%EC%9A%A9-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EB%8C%80%EC%95%88',
    summary:
      '1. 폴링이란 무엇인가 폴링(Polling)은 클라이언트(브라우저, 앱 등)가 주기적으로 서버나 특정 상태를 확인하는 방식이다. 즉, 일정 간격마다 “상태가 바뀌었는가?”를 묻는 기법이다. 짧은 폴링(Short Polling): setInterval 같은 타이머를 이용해 일정 주기로 요청을 반복한다. 긴 폴링(Long Polling): 요청을 서버가 오래 ',
    category: 'Programming',
    postType: 'custom',
    tags: ['Programming', 'Development'],
  }),
  createBlogPost({
    id: 16,
    title:
      '2만개 데이터로부터 12초 → 4초로 LCP 최적화하기: React 성능 최적화의 모든 것',
    customDate: '2025.09.15.',
    url: 'https://velog.io/@youminki/2%EB%A7%8C%EA%B0%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A1%9C%EB%B6%80%ED%84%B0-12%EC%B4%88-4%EC%B4%88%EB%A1%9C-LCP-%EC%B5%9C%EC%A0%81%ED%99%94%ED%95%98%EA%B8%B0-React-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83',
    summary:
      '2만개 크롤링 데이터로부터 12초 → 4초로 LCP 최적화하기: 실제 프로젝트에서 겪은 성능 문제들과 해결 과정 12초의 느린 렌더링 속도 프로젝트 초기, 우리는 2만개의 크롤링 데이터를 한 번에 렌더링하는 방식으로 개발을 시작했습니다. 사용자가 홈페이지에 접속하면 모든 상품 데이터를 동시에 로드하고 렌더링하는 방식이었죠. Largest Contentful',
    category: 'React',
    postType: 'custom',
    tags: [
      'React',
      'LCP',
      'Frontend',
      'JavaScript',
      'Performance',
      'Core Web Vitals',
    ],
  }),
  createBlogPost({
    id: 15,
    title:
      'React에서 JWT 토큰 관리의 함정과 해결: 멜픽 개발 1년간의 실전 경험담',
    customDate: '2025.09.15.',
    url: 'https://velog.io/@youminki/React%EC%97%90%EC%84%9C-JWT-%ED%86%A0%ED%81%B0-%EA%B4%80%EB%A6%AC%EC%9D%98-%ED%95%A8%EC%A0%95%EA%B3%BC-%ED%95%B4%EA%B2%B0-%EB%A9%9C%ED%94%BD-%EA%B0%9C%EB%B0%9C-1%EB%85%84%EA%B0%84%EC%9D%98-%EC%8B%A4%EC%A0%84-%EA%B2%BD%ED%97%98%EB%8B%B4',
    summary:
      '�� 문제의 시작: 멜픽 개발 초기 토큰 관리의 혼란 처음에는 단순하게 생각했습니다. "토큰을 localStorage에 저장하고, 만료되면 갱신하면 되지 않을까?"라고요. 하지만 현실은 달랐습니다. iOS 사용자 불만: "앱이 자꾸 로그아웃돼요!" 개발팀 혼란: "왜 갑자기 401 에러가 폭발하는 거죠?" 사용자 이탈: 토큰 문제로 인한 사용자 이탈률 증가',
    category: 'React',
    postType: 'custom',
    tags: ['React', 'Frontend', 'JavaScript'],
  }),
  createBlogPost({
    id: 14,
    title: 'TypeScript에서 발생한 타입 에러들과 해결 방법 모음',
    customDate: '2025.09.15.',
    url: 'https://velog.io/@youminki/TypeScript%EC%97%90%EC%84%9C-%EB%B0%9C%EC%83%9D%ED%95%9C-%ED%83%80%EC%9E%85-%EC%97%90%EB%9F%AC%EB%93%A4%EA%B3%BC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%EB%AA%A8%EC%9D%8C',
    summary:
      '멜픽 개발 1년간 겪은 TypeScript 타입 에러들 처음에는 JavaScript로 개발하다가 TypeScript로 마이그레이션하면서 겪은 타입 에러들과 그 해결 과정을 정리해보겠습니다. 가장 자주 마주쳤던 에러들: Generic 타입 추론 실패 Union 타입 처리의 복잡성 any 타입 남발로 인한 타입 안전성 상실 전역 타입 선언의 중복 문제 실제 겪',
    category: 'TypeScript',
    postType: 'custom',
    tags: ['TypeScript', 'JavaScript', 'Java', 'Programming'],
  }),
  createBlogPost({
    id: 12,
    title: 'React에서 무한 스크롤 구현 시 발생한 메모리 누수 문제 해결기',
    customDate: '2025.09.15.',
    url: 'https://velog.io/@youminki/React%EC%97%90%EC%84%9C-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84-%EC%8B%9C-%EB%B0%9C%EC%83%9D%ED%95%9C-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EB%88%84%EC%88%98-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0%EA%B8%B0',
    summary:
      '무한 스크롤 메모리 누수 문제들 멜픽 프로젝트에서 2만개의 상품 데이터를 효율적으로 보여주기 위해 무한 스크롤을 구현했을 때였습니다. 처음에는 단순하게 생각했습니다. "IntersectionObserver로 스크롤을 감지하고, 더 많은 아이템을 렌더링하면 되지 않을까?"라고요. 하지만 현실은 달랐습니다. 메모리 사용량: 2시간 사용 후 1.2GB까지 증가 ',
    category: 'React',
    postType: 'custom',
    tags: ['React', 'Frontend', 'JavaScript'],
  }),
  createBlogPost({
    id: 10,
    title: 'React에서 스토리북 없이 컴포넌트 문서화를 구현한 경험',
    customDate: '2025.09.15.',
    url: 'https://velog.io/@youminki/React%EC%97%90%EC%84%9C-%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B6%81-%EC%97%86%EC%9D%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%AC%B8%EC%84%9C%ED%99%94%EB%A5%BC-%EA%B5%AC%ED%98%84%ED%95%9C-%EA%B2%BD%ED%97%98',
    summary:
      '멜픽 개발 초기: 스토리북 도입을 고민했던 이유 프로젝트 규모가 커지면서 공통 컴포넌트들이 늘어나고 있었고, 각자 다른 방식으로 컴포넌트를 사용하고 있었습니다. 당시 상황: 공통 컴포넌트: 30개 이상의 재사용 가능한 컴포넌트 팀 규모: 3명의 개발자 문제점: 컴포넌트 사용법을 매번 코드를 봐야 함 의사결정: 스토리북 도입 vs 자체 문서화 시스템 스토리북',
    category: 'React',
    postType: 'custom',
    tags: ['React', 'Frontend', 'JavaScript'],
  }),
  createBlogPost({
    id: 9,
    title:
      'Velog에서 내 블로그로 자동 동기화하기: RSS + GitHub Actions로 완전 자동화된 블로그 시스템 구축',
    customDate: '2025.09.15.',
    url: 'https://velog.io/@youminki/Velog%EC%97%90%EC%84%9C-%EB%82%B4-%EB%B8%94%EB%A1%9C%EA%B7%B8%EB%A1%9C-%EC%9E%90%EB%8F%99-%EB%8F%99%EA%B8%B0%ED%99%94%ED%95%98%EA%B8%B0-RSS-GitHub-Actions%EB%A1%9C-%EC%99%84%EC%A0%84-%EC%9E%90%EB%8F%99%ED%99%94%EB%90%9C-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%B6%95',
    summary:
      '개발 블로그를 운영하면서 가장 번거로운 일 중 하나는 여러 플랫폼에 같은 글을 올리는 것입니다. Velog에 글을 쓰고 개인 포트폴리오 사이트에도 똑같이 반영하려면 수동으로 복사하고 붙여넣는 작업을 반복해야 했습니다. 이를 해결하기 위해 Velog에 작성한 글을 개인 포트폴리오 사이트에 자동으로 동기화하는 시스템을 구축한 경험을 공유합니다. RSS 피드와 ',
    category: 'Programming',
    postType: 'custom',
    tags: ['Programming', 'Development'],
  }),
  createBlogPost({
    id: 8,
    title: 'React vs Angular',
    customDate: '2025.09.27.',
    url: 'https://velog.io/@youminki/React-vs-Angular',
    summary:
      '1. 어떤 프레임워크를 선택해야 할까? 프론트엔드 기술 스택 결정은 단순히 인기나 최근 트렌드만으로 하면 안 되고, 프로젝트 특성, 팀 역량, 유지보수 전략, 확장성 계획 등을 종합적으로 고려해야 한다. React와 Angular는 접근 방식이 많이 다르기 때문에, “하나가 무조건 좋다”라는 것은 없다고 생각한다. 2. React vs Angular 항목 ',
    category: 'React',
    postType: 'custom',
    tags: ['Angular', 'React', 'Frontend', 'JavaScript', 'TypeScript'],
  }),
  createBlogPost({
    id: 7,
    title: 'DOM과 동적 페이지 렌더링의 원리',
    customDate: '2025.09.28.',
    url: 'https://velog.io/@youminki/DOM%EA%B3%BC-%EB%8F%99%EC%A0%81-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A0%8C%EB%8D%94%EB%A7%81%EC%9D%98-%EC%9B%90%EB%A6%AC',
    summary:
      'DOM (문서 객체 모델)과 DOM API - DOM (Document Object Model) : 문서 객체 모델. 즉 DOM은 웹 페이지 (HTML이나 XML 문서)의 콘텐츠 및 구조, 그리고 스타일 요소를 구조화 시켜 표현하여 프로그래밍 언어가 해당 문서에 접근하여 일고 조작할 수 있도록 API를 제공하는 일종의 인터페이스이다. = 즉 자바스크립트 같',
    category: 'Programming',
    postType: 'custom',
    tags: [
      'API',
      'Programming',
      'Development',
      'Backend',
      'Integration',
      'Machine Learning',
      'AI',
      'Data Science',
    ],
  }),
  createBlogPost({
    id: 6,
    title: 'REST API',
    customDate: '2025.09.28.',
    url: 'https://velog.io/@youminki/REST-API',
    summary:
      'REST API REST의 구성 요소는 다음과 같다. 자원 서버가 관리하고 저장하는 모든 데이터를 “자원” 이라 한다. 3주차 과제에서 서버는 User와 Memo를 관리하고 저장했다. 따라서 3주차 과제 서버의 자원은 User와 Memo이다. 행위 HTTP 프로토콜의 Method를 사용한다. HTTP 프로토콜은 GET, POST, PUT, DELETE 와 ',
    category: 'Programming',
    postType: 'custom',
    tags: [
      'REST API',
      'API',
      'Programming',
      'Development',
      'Backend',
      'Memoization',
      'Performance',
      'React',
    ],
  }),
];

// 모든 카테고리를 가져오는 함수
export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  BLOG_POSTS.forEach(post => {
    categories.add(post.category);
  });
  return Array.from(categories).sort();
};
