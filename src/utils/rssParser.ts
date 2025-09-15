// RSS 파싱 유틸리티
import { DOMParser } from 'xmldom';

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
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssXml, 'text/xml');

  const items = xmlDoc.getElementsByTagName('item');
  const rssItems: RSSItem[] = [];

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

  return rssItems;
};

/**
 * RSS 아이템을 Velog 포스트 형식으로 변환합니다.
 * @param rssItem RSS 아이템
 * @returns Velog 포스트 객체
 */
export const convertToVelogPost = (rssItem: RSSItem): VelogPost => {
  // 날짜 형식 변환 (RSS: "Wed, 10 Jul 2025 10:00:00 GMT" -> "2025.07.10")
  const date = new Date(rssItem.pubDate);
  const formattedDate = date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '.')
    .replace(/\s/g, '');

  // 요약 텍스트 정리 (HTML 태그 제거)
  const cleanDescription = rssItem.description
    .replace(/<[^>]*>/g, '') // HTML 태그 제거
    .replace(/&nbsp;/g, ' ') // &nbsp; 제거
    .replace(/&amp;/g, '&') // &amp;를 &로
    .replace(/&lt;/g, '<') // &lt;를 <로
    .replace(/&gt;/g, '>') // &gt;를 >로
    .replace(/&quot;/g, '"') // &quot;를 "로
    .replace(/&#39;/g, "'") // &#39;를 '로
    .replace(/\n/g, ' ') // 줄바꿈을 공백으로
    .replace(/\r/g, ' ') // 캐리지 리턴을 공백으로
    .replace(/\s+/g, ' ') // 여러 공백을 하나로
    .trim()
    .substring(0, 200); // 200자로 제한

  // 카테고리 결정 로직
  const getCategoryFromTitle = (title: string): string => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes('react') || lowerTitle.includes('리액트')) {
      return 'React';
    } else if (lowerTitle.includes('next') || lowerTitle.includes('넥스트')) {
      return 'Next.js';
    } else if (
      lowerTitle.includes('typescript') ||
      lowerTitle.includes('타입스크립트')
    ) {
      return 'TypeScript';
    } else if (
      lowerTitle.includes('javascript') ||
      lowerTitle.includes('자바스크립트')
    ) {
      return 'JavaScript';
    } else if (
      lowerTitle.includes('performance') ||
      lowerTitle.includes('성능') ||
      lowerTitle.includes('최적화')
    ) {
      return 'Performance';
    } else if (
      lowerTitle.includes('이슈') ||
      lowerTitle.includes('문제') ||
      lowerTitle.includes('해결')
    ) {
      return '경험했던 이슈';
    } else if (
      lowerTitle.includes('frontend') ||
      lowerTitle.includes('프론트엔드')
    ) {
      return 'Frontend';
    } else {
      return 'Programming';
    }
  };

  const category = getCategoryFromTitle(rssItem.title);

  // 태그 생성 (카테고리 + RSS 카테고리들)
  const tags = [category, ...rssItem.categories].filter(
    (tag, index, arr) => arr.indexOf(tag) === index // 중복 제거
  );

  return {
    title: rssItem.title,
    url: rssItem.link,
    summary: cleanDescription,
    date: formattedDate,
    category,
    tags,
  };
};

/**
 * Velog RSS에서 최신 포스트들을 가져옵니다.
 * @param username Velog 사용자명
 * @returns Velog 포스트 배열
 */
export const fetchVelogPosts = async (
  username: string = 'youminki'
): Promise<VelogPost[]> => {
  try {
    const rssUrl = `https://v2.velog.io/rss/@${username}`;

    // CORS 문제를 해결하기 위해 프록시 사용
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

    const response = await fetch(proxyUrl);
    const data = await response.json();

    if (!data.contents) {
      throw new Error('RSS 데이터를 가져올 수 없습니다.');
    }

    const rssItems = parseRSS(data.contents);
    const velogPosts = rssItems.map(convertToVelogPost);

    return velogPosts;
  } catch (error) {
    console.error('Velog RSS 파싱 에러:', error);
    return [];
  }
};
