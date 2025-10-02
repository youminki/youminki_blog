/**
 * Velog 동기화 관련 설정
 */

export const SYNC_CONFIG = {
  // 파일 경로
  BLOG_DATA_PATH: 'src/data/blog.ts',

  // RSS 관련 설정
  RSS_URL: 'https://v2.velog.io/rss/@youminki',
  PROXY_URL: 'https://api.allorigins.win/get?url=',

  // 포스트 관련 설정
  SUMMARY_MAX_LENGTH: 200,
  MAX_POSTS_PER_SYNC: 50,

  // 로깅 설정
  LOG_LEVEL: 'info' as 'debug' | 'info' | 'warn' | 'error',

  // 에러 처리 설정
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
} as const;

export const CATEGORY_MAPPING = {
  // 🚀 프레임워크/라이브러리
  react: 'React',
  리액트: 'React',
  next: 'Next.js',
  넥스트: 'Next.js',
  nextjs: 'Next.js',
  vue: 'Vue.js',
  뷰: 'Vue.js',

  // 💻 프로그래밍 언어
  typescript: 'TypeScript',
  타입스크립트: 'TypeScript',
  javascript: 'JavaScript',
  자바스크립트: 'JavaScript',
  js: 'JavaScript',
  ts: 'TypeScript',
  python: 'Python',
  파이썬: 'Python',

  // ⚡ 성능 최적화
  performance: 'Performance',
  성능: 'Performance',
  최적화: 'Performance',
  optimization: 'Performance',
  속도: 'Performance',

  // 🔧 개발 도구/환경
  devops: 'DevOps',
  도구: 'Tools',
  tools: 'Tools',
  vscode: 'Tools',
  git: 'Tools',
  github: 'Tools',

  // 💡 경험/문제해결
  이슈: 'Issue & Solution',
  문제: 'Issue & Solution',
  해결: 'Issue & Solution',
  경험: 'Issue & Solution',
  troubleshooting: 'Issue & Solution',

  // 📚 컴퓨터 과학
  algorithm: 'Computer Science',
  알고리즘: 'Computer Science',
  자료구조: 'Computer Science',
  'data structure': 'Computer Science',

  // 🌐 웹 개발
  frontend: 'Frontend',
  프론트엔드: 'Frontend',
  backend: 'Backend',
  백엔드: 'Backend',
  api: 'Backend',
  rest: 'Backend',

  // 기타
  programming: 'Programming',
  프로그래밍: 'Programming',
  개발: 'Programming',
} as const;

export const DEFAULT_CATEGORY = 'Programming';
