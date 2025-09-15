/**
 * 블로그 포스트 관련 공통 유틸리티 함수들
 */

export interface BlogPostConfig {
  id?: number;
  title: string;
  url: string;
  summary: string;
  category: string;
  postType: 'react19' | 'typescript59' | 'custom';
  tags: string[];
  customDate?: string;
}

// ID 중복 검사 및 자동 할당 함수
const usedIds = new Set<number>();

export const getUniqueId = (requestedId?: number): number => {
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

// 기존 ID들을 등록하는 함수
export const registerExistingIds = (ids: number[]): void => {
  ids.forEach(id => usedIds.add(id));
};

// ID Set을 초기화하는 함수
export const clearUsedIds = (): void => {
  usedIds.clear();
};

/**
 * 블로그 포스트 생성 헬퍼 함수
 */
export const createBlogPost = (config: BlogPostConfig) => {
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

/**
 * 문자열을 안전하게 이스케이프하는 함수
 */
export const escapeString = (str: string): string => {
  return str
    .replace(/\\/g, '\\\\') // 백슬래시 먼저 이스케이프
    .replace(/'/g, "\\'") // 작은따옴표 이스케이프
    .replace(/\n/g, '\\n') // 줄바꿈 이스케이프
    .replace(/\r/g, '\\r') // 캐리지 리턴 이스케이프
    .replace(/\t/g, '\\t'); // 탭 이스케이프
};

/**
 * 블로그 포스트 템플릿 생성 함수
 */
export const generatePostTemplate = (post: {
  id: number;
  title: string;
  url: string;
  summary: string;
  category: string;
  date: string;
  tags: string[];
  postType?: 'react19' | 'typescript59' | 'custom';
}): string => {
  const tagsString = post.tags.map((tag: string) => `'${tag}'`).join(', ');
  const postType = post.postType || 'custom';

  return `  createBlogPost({
    id: ${post.id},
    title: '${escapeString(post.title)}',
    customDate: '${post.date}',
    url: '${post.url}',
    summary: '${escapeString(post.summary)}',
    category: '${post.category}',
    postType: '${postType}',
    tags: [${tagsString}],
  }),`;
};
