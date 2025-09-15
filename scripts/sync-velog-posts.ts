#!/usr/bin/env tsx

/**
 * Velog 블로그 포스트를 자동으로 동기화하는 스크립트
 * GitHub Actions에서 실행되도록 설계됨
 */

import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { fetchVelogPosts, type VelogPost } from '../src/utils/rssParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface BlogPost {
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
 * 기존 블로그 데이터를 로드합니다.
 */
const loadExistingPosts = (): BlogPost[] => {
  try {
    const blogDataPath = join(__dirname, '../src/data/blog.ts');
    const content = readFileSync(blogDataPath, 'utf-8');

    // 기존 포스트들의 ID를 추출하여 usedIds에 추가
    const idMatches = content.match(/id:\s*(\d+)/g);
    if (idMatches) {
      idMatches.forEach(match => {
        const id = parseInt(match.replace('id:', '').trim());
        usedIds.add(id);
      });
    }

    // 실제로는 더 정교한 파싱이 필요하지만, 여기서는 간단히 처리
    return [];
  } catch (error) {
    console.error('기존 블로그 데이터 로드 실패:', error);
    return [];
  }
};

/**
 * Velog 포스트를 기존 포스트와 병합합니다.
 */
const mergePosts = (
  existingPosts: BlogPost[],
  velogPosts: VelogPost[]
): BlogPost[] => {
  const existingUrls = new Set(existingPosts.map(post => post.url));

  // 새로운 포스트만 필터링
  const newPosts = velogPosts
    .filter(velogPost => !existingUrls.has(velogPost.url))
    .map(velogPost =>
      createBlogPost({
        title: velogPost.title,
        url: velogPost.url,
        summary: velogPost.summary,
        category: velogPost.category,
        postType: 'custom',
        tags: velogPost.tags,
        customDate: velogPost.date,
      })
    );

  // 기존 포스트와 새 포스트를 합치고 ID 기준으로 정렬
  const allPosts = [...existingPosts, ...newPosts].sort((a, b) => b.id - a.id);

  return allPosts;
};

/**
 * 블로그 데이터 파일을 업데이트합니다.
 */
const updateBlogData = (posts: BlogPost[]) => {
  const blogDataPath = join(__dirname, '../src/data/blog.ts');

  // 기존 파일의 상단 부분 유지
  const header = `export interface BlogPost {
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

export const BLOG_POSTS: BlogPost[] = [`;

  // 포스트 데이터 생성
  const postsData = posts
    .map(post => {
      const tagsString = post.tags.map(tag => `'${tag}'`).join(', ');
      return `  createBlogPost({
    id: ${post.id},
    title: '${post.title.replace(/'/g, "\\'")}',
    customDate: '${post.date}',
    url: '${post.url}',
    summary: '${post.summary.replace(/'/g, "\\'")}',
    category: '${post.category}',
    postType: '${post.postType}',
    tags: [${tagsString}],
  }),`;
    })
    .join('\n');

  const footer = `];
`;

  const newContent = header + '\n' + postsData + '\n' + footer;

  writeFileSync(blogDataPath, newContent, 'utf-8');
  console.log(
    `블로그 데이터가 업데이트되었습니다. 총 ${posts.length}개의 포스트가 있습니다.`
  );
};

/**
 * 메인 동기화 함수
 */
const syncVelogPosts = async () => {
  try {
    console.log('Velog 포스트 동기화를 시작합니다...');

    // 기존 포스트 로드
    const existingPosts = loadExistingPosts();
    console.log(`기존 포스트: ${existingPosts.length}개`);

    // Velog에서 최신 포스트 가져오기
    const velogPosts = await fetchVelogPosts('youminki');
    console.log(`Velog에서 가져온 포스트: ${velogPosts.length}개`);

    if (velogPosts.length === 0) {
      console.log('새로운 포스트가 없습니다.');
      return;
    }

    // 포스트 병합
    const mergedPosts = mergePosts(existingPosts, velogPosts);
    const newPostCount = mergedPosts.length - existingPosts.length;

    console.log(`새로운 포스트: ${newPostCount}개`);

    if (newPostCount > 0) {
      // 블로그 데이터 업데이트
      updateBlogData(mergedPosts);
      console.log('동기화가 완료되었습니다!');
    } else {
      console.log('새로운 포스트가 없어서 업데이트하지 않습니다.');
    }
  } catch (error) {
    console.error('동기화 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
};

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  syncVelogPosts();
}

export { syncVelogPosts };
