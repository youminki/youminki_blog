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
  react: 'React',
  리액트: 'React',
  next: 'Next.js',
  넥스트: 'Next.js',
  typescript: 'TypeScript',
  타입스크립트: 'TypeScript',
  javascript: 'JavaScript',
  자바스크립트: 'JavaScript',
  performance: 'Performance',
  성능: 'Performance',
  최적화: 'Performance',
  이슈: '경험했던 이슈',
  문제: '경험했던 이슈',
  해결: '경험했던 이슈',
  frontend: 'Frontend',
  프론트엔드: 'Frontend',
} as const;

export const DEFAULT_CATEGORY = 'Programming';
