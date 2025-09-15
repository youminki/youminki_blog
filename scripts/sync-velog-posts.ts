#!/usr/bin/env tsx

/**
 * Velog 블로그 포스트를 자동으로 동기화하는 스크립트
 * GitHub Actions에서 실행되도록 설계됨
 */

import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { fetchVelogPosts, type VelogPost } from '../src/utils/rssParser.js';
import {
  createBlogPost,
  registerExistingIds,
  clearUsedIds,
  generatePostTemplate,
} from '../src/utils/blogHelpers.js';
import { SYNC_CONFIG } from '../src/config/sync.config.js';
import { logger } from '../src/utils/logger.js';
import { handleError } from '../src/utils/errorHandler.js';

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

/**
 * 블로그 데이터 파일에서 기존 포스트들을 파싱합니다.
 */
const parseExistingBlogData = (content: string): BlogPost[] => {
  try {
    // 기존 포스트들의 ID를 추출하여 usedIds에 추가
    const idMatches = content.match(/id:\s*(\d+)/g);
    if (idMatches) {
      const ids = idMatches.map(match =>
        parseInt(match.replace('id:', '').trim())
      );
      registerExistingIds(ids);
      logger.debug(`기존 포스트 ID들을 등록했습니다: ${ids.join(', ')}`);
    }

    // 실제로는 더 정교한 파싱이 필요하지만, 여기서는 간단히 처리
    // TODO: AST 파싱으로 개선 필요
    return [];
  } catch (error) {
    logger.warn('기존 블로그 데이터 파싱 중 오류 발생:', error);
    return [];
  }
};

/**
 * 기존 블로그 데이터를 로드합니다.
 */
const loadExistingPosts = (): BlogPost[] => {
  try {
    const blogDataPath = join(__dirname, '..', SYNC_CONFIG.BLOG_DATA_PATH);
    logger.debug(`블로그 데이터 파일 로드: ${blogDataPath}`);

    const content = readFileSync(blogDataPath, 'utf-8');
    const existingPosts = parseExistingBlogData(content);

    logger.info(`기존 포스트 ${existingPosts.length}개를 로드했습니다.`);
    return existingPosts;
  } catch (error) {
    handleError(error, '기존 블로그 데이터 로드');
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
  try {
    const existingUrls = new Set(existingPosts.map(post => post.url));
    logger.debug(`기존 포스트 URL 수: ${existingUrls.size}`);

    // 새로운 포스트만 필터링
    const newPosts = velogPosts
      .filter(velogPost => {
        const isNew = !existingUrls.has(velogPost.url);
        if (!isNew) {
          logger.debug(`중복 포스트 건너뜀: ${velogPost.title}`);
        }
        return isNew;
      })
      .map(velogPost => {
        logger.debug(`새 포스트 변환: ${velogPost.title}`);
        return createBlogPost({
          title: velogPost.title,
          url: velogPost.url,
          summary: velogPost.summary,
          category: velogPost.category,
          postType: 'custom',
          tags: velogPost.tags,
          customDate: velogPost.date,
        });
      });

    logger.info(`새로운 포스트 ${newPosts.length}개를 발견했습니다.`);

    // 기존 포스트와 새 포스트를 합치고 ID 기준으로 정렬
    const allPosts = [...existingPosts, ...newPosts].sort(
      (a, b) => b.id - a.id
    );

    return allPosts;
  } catch (error) {
    handleError(error, '포스트 병합');
    return existingPosts;
  }
};

/**
 * 블로그 데이터 파일을 업데이트합니다.
 */
const updateBlogData = (posts: BlogPost[]) => {
  try {
    const blogDataPath = join(__dirname, '..', SYNC_CONFIG.BLOG_DATA_PATH);
    logger.debug(`블로그 데이터 파일 업데이트: ${blogDataPath}`);

    // 헤더 템플릿
    const header = `import { BlogPost, getUniqueId } from '../../src/types';

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

export const BLOG_POSTS: BlogPost[] = [`;

    // 포스트 데이터 생성
    const postsData = posts.map(post => generatePostTemplate(post)).join('\n');

    const footer = `];
`;

    const newContent = header + '\n' + postsData + '\n' + footer;

    writeFileSync(blogDataPath, newContent, 'utf-8');
    logger.success(
      `블로그 데이터가 업데이트되었습니다. 총 ${posts.length}개의 포스트가 있습니다.`
    );
  } catch (error) {
    handleError(error, '블로그 데이터 파일 업데이트');
    throw error;
  }
};

/**
 * 메인 동기화 함수
 */
const syncVelogPosts = async () => {
  try {
    logger.info('🚀 Velog 포스트 동기화를 시작합니다...');

    // ID Set 초기화
    clearUsedIds();

    // 기존 포스트 로드
    const existingPosts = loadExistingPosts();
    logger.info(`📚 기존 포스트: ${existingPosts.length}개`);

    // Velog에서 최신 포스트 가져오기
    const velogPosts = await fetchVelogPosts('youminki');
    logger.info(`📥 Velog에서 가져온 포스트: ${velogPosts.length}개`);

    if (velogPosts.length === 0) {
      logger.warn('새로운 포스트가 없습니다.');
      return;
    }

    // 포스트 병합
    const mergedPosts = mergePosts(existingPosts, velogPosts);
    const newPostCount = mergedPosts.length - existingPosts.length;

    logger.info(`🆕 새로운 포스트: ${newPostCount}개`);

    if (newPostCount > 0) {
      // 블로그 데이터 업데이트
      updateBlogData(mergedPosts);
      logger.success('✅ 동기화가 완료되었습니다!');
    } else {
      logger.info('새로운 포스트가 없어서 업데이트하지 않습니다.');
    }
  } catch (error) {
    handleError(error, '메인 동기화');
    process.exit(1);
  }
};

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  syncVelogPosts();
}

export { syncVelogPosts };
