// RSS 파싱 유틸리티
import { DOMParser } from 'xmldom';
import {
  SYNC_CONFIG,
  CATEGORY_MAPPING,
  DEFAULT_CATEGORY,
} from '../config/sync.config';
import { logger } from './logger';
import { ParseError, NetworkError, withRetry } from './errorHandler';

export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  categories: string[];
}

export interface VelogPost {
  title: string;
  url: string;
  summary: string;
  date: string;
  category: string;
  tags: string[];
}

/**
 * RSS XML을 파싱하여 아이템들을 추출합니다.
 * @param rssXml RSS XML 문자열
 * @returns 파싱된 RSS 아이템 배열
 */
export const parseRSS = (rssXml: string): RSSItem[] => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssXml, 'text/xml');

    // XML 파싱 에러 체크
    const parseError = xmlDoc.getElementsByTagName('parsererror');
    if (parseError.length > 0) {
      throw new ParseError('RSS XML 파싱 실패', rssXml.substring(0, 200));
    }

    const items = xmlDoc.getElementsByTagName('item');
    const rssItems: RSSItem[] = [];

    logger.debug(`RSS에서 ${items.length}개의 아이템을 발견했습니다.`);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const getTextContent = (tagName: string): string => {
        const elements = item.getElementsByTagName(tagName);
        return elements.length > 0 ? elements[0].textContent || '' : '';
      };

      const title = getTextContent('title');
      const link = getTextContent('link');
      const description = getTextContent('description');
      const pubDate = getTextContent('pubDate');

      // 필수 필드 검증
      if (!title || !link) {
        logger.warn(
          `제목 또는 링크가 없는 아이템을 건너뜁니다: ${title || '제목 없음'}`
        );
        continue;
      }

      // 카테고리 추출 (태그로 사용)
      const categories: string[] = [];
      const categoryElements = item.getElementsByTagName('category');
      for (let j = 0; j < categoryElements.length; j++) {
        const category = categoryElements[j].textContent?.trim();
        if (category) {
          categories.push(category);
        }
      }

      rssItems.push({
        title,
        link,
        description,
        pubDate,
        categories,
      });
    }

    logger.info(`성공적으로 ${rssItems.length}개의 RSS 아이템을 파싱했습니다.`);
    return rssItems;
  } catch (error) {
    throw new ParseError(
      `RSS 파싱 중 오류 발생: ${error}`,
      rssXml.substring(0, 200)
    );
  }
};

/**
 * HTML 엔티티를 디코딩하는 함수
 */
const decodeHtmlEntities = (text: string): string => {
  const entityMap: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
  };

  return text.replace(/&[a-zA-Z0-9#]+;/g, entity => {
    return entityMap[entity] || entity;
  });
};

/**
 * 텍스트를 정리하는 함수
 */
const cleanText = (
  text: string,
  maxLength: number = SYNC_CONFIG.SUMMARY_MAX_LENGTH
): string => {
  return text
    .replace(/<[^>]*>/g, '') // HTML 태그 제거
    .replace(/\n/g, ' ') // 줄바꿈을 공백으로
    .replace(/\r/g, ' ') // 캐리지 리턴을 공백으로
    .replace(/\s+/g, ' ') // 여러 공백을 하나로
    .trim()
    .substring(0, maxLength);
};

/**
 * 제목에서 카테고리를 결정하는 함수
 */
const getCategoryFromTitle = (title: string): string => {
  const lowerTitle = title.toLowerCase();

  for (const [keyword, category] of Object.entries(CATEGORY_MAPPING)) {
    if (lowerTitle.includes(keyword)) {
      return category;
    }
  }

  return DEFAULT_CATEGORY;
};

/**
 * 날짜를 포맷팅하는 함수
 */
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      logger.warn(`유효하지 않은 날짜 형식: ${dateString}`);
      return new Date()
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\./g, '.')
        .replace(/\s/g, '');
    }

    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '.')
      .replace(/\s/g, '');
  } catch (error) {
    logger.warn(`날짜 포맷팅 실패: ${dateString}`, error);
    return new Date()
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '.')
      .replace(/\s/g, '');
  }
};

/**
 * RSS 아이템을 Velog 포스트 형식으로 변환합니다.
 * @param rssItem RSS 아이템
 * @returns Velog 포스트 객체
 */
export const convertToVelogPost = (rssItem: RSSItem): VelogPost => {
  try {
    // 날짜 형식 변환
    const formattedDate = formatDate(rssItem.pubDate);

    // 요약 텍스트 정리
    const cleanDescription = cleanText(decodeHtmlEntities(rssItem.description));

    // 카테고리 결정
    const category = getCategoryFromTitle(rssItem.title);

    // 태그 생성 (카테고리 + RSS 카테고리들)
    const tags = [category, ...rssItem.categories].filter(
      (tag, index, arr) => arr.indexOf(tag) === index // 중복 제거
    );

    logger.debug(`포스트 변환: "${rssItem.title}" -> 카테고리: ${category}`);

    return {
      title: rssItem.title,
      url: rssItem.link,
      summary: cleanDescription,
      date: formattedDate,
      category,
      tags,
    };
  } catch {
    throw new ParseError(
      `포스트 변환 실패: ${rssItem.title}`,
      JSON.stringify(rssItem)
    );
  }
};

/**
 * Velog RSS에서 최신 포스트들을 가져옵니다.
 * @param username Velog 사용자명
 * @returns Velog 포스트 배열
 */
export const fetchVelogPosts = async (
  username: string = 'youminki'
): Promise<VelogPost[]> => {
  return withRetry(
    async () => {
      logger.info(
        `Velog RSS에서 포스트를 가져오는 중... (사용자: ${username})`
      );

      const rssUrl = `${SYNC_CONFIG.RSS_URL.replace('@youminki', `@${username}`)}`;
      const proxyUrl = `${SYNC_CONFIG.PROXY_URL}${encodeURIComponent(rssUrl)}`;

      logger.debug(`RSS URL: ${rssUrl}`);
      logger.debug(`프록시 URL: ${proxyUrl}`);

      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new NetworkError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status
        );
      }

      const data = await response.json();

      if (!data.contents) {
        throw new ParseError(
          'RSS 데이터가 비어있습니다.',
          JSON.stringify(data)
        );
      }

      logger.debug(`RSS 데이터 크기: ${data.contents.length} 문자`);

      const rssItems = parseRSS(data.contents);

      if (rssItems.length === 0) {
        logger.warn('파싱된 RSS 아이템이 없습니다.');
        return [];
      }

      // 최대 포스트 수 제한
      const limitedItems = rssItems.slice(0, SYNC_CONFIG.MAX_POSTS_PER_SYNC);

      if (limitedItems.length < rssItems.length) {
        logger.warn(
          `포스트 수를 ${SYNC_CONFIG.MAX_POSTS_PER_SYNC}개로 제한했습니다. (전체: ${rssItems.length}개)`
        );
      }

      const velogPosts = limitedItems.map(convertToVelogPost);

      logger.success(
        `${velogPosts.length}개의 Velog 포스트를 성공적으로 가져왔습니다.`
      );
      return velogPosts;
    },
    SYNC_CONFIG.MAX_RETRY_ATTEMPTS,
    SYNC_CONFIG.RETRY_DELAY_MS
  );
};
