// 색상 유틸리티 함수들

export interface ColorStyle {
  bg: string;
  color: string;
  border: string;
}

// 색상 팔레트 정의
export const COLOR_PALETTE: ColorStyle[] = [
  {
    bg: 'var(--filter-color-1)',
    color: 'white',
    border: 'var(--filter-color-1)',
  },
  {
    bg: 'var(--filter-color-2)',
    color: 'white',
    border: 'var(--filter-color-2)',
  },
  {
    bg: 'var(--filter-color-3)',
    color: 'white',
    border: 'var(--filter-color-3)',
  },
  {
    bg: 'var(--filter-color-4)',
    color: 'white',
    border: 'var(--filter-color-4)',
  },
  {
    bg: 'var(--filter-color-5)',
    color: 'white',
    border: 'var(--filter-color-5)',
  },
  {
    bg: 'var(--filter-color-6)',
    color: 'white',
    border: 'var(--filter-color-6)',
  },
  {
    bg: 'var(--filter-color-7)',
    color: 'white',
    border: 'var(--filter-color-7)',
  },
  {
    bg: 'var(--filter-color-8)',
    color: 'white',
    border: 'var(--filter-color-8)',
  },
  {
    bg: 'var(--filter-color-9)',
    color: 'white',
    border: 'var(--filter-color-9)',
  },
];

export const LIGHT_COLOR_PALETTE: ColorStyle[] = [
  {
    bg: 'var(--filter-light-1)',
    color: 'var(--filter-color-1)',
    border: 'var(--filter-color-1)',
  },
  {
    bg: 'var(--filter-light-2)',
    color: 'var(--filter-color-2)',
    border: 'var(--filter-color-2)',
  },
  {
    bg: 'var(--filter-light-3)',
    color: 'var(--filter-color-3)',
    border: 'var(--filter-color-3)',
  },
  {
    bg: 'var(--filter-light-4)',
    color: 'var(--filter-color-4)',
    border: 'var(--filter-color-4)',
  },
  {
    bg: 'var(--filter-light-5)',
    color: 'var(--filter-color-5)',
    border: 'var(--filter-color-5)',
  },
  {
    bg: 'var(--filter-light-6)',
    color: 'var(--filter-color-6)',
    border: 'var(--filter-color-6)',
  },
  {
    bg: 'var(--filter-light-7)',
    color: 'var(--filter-color-7)',
    border: 'var(--filter-color-7)',
  },
  {
    bg: 'var(--filter-light-8)',
    color: 'var(--filter-color-8)',
    border: 'var(--filter-color-8)',
  },
  {
    bg: 'var(--filter-light-9)',
    color: 'var(--filter-color-9)',
    border: 'var(--filter-color-9)',
  },
];

// 카테고리별 색상 매핑 - 실제 사용 카테고리 기반 최적화
const CATEGORY_COLOR_MAP: { [key: string]: number } = {
  // 기본 카테고리
  전체: 0,

  // 현재 사용 중인 주요 카테고리 (겹치지 않는 고유 색상)
  Programming: 1,
  React: 2,
  'Issue & Solution': 3,

  // 향후 확장될 카테고리들 (고유 색상 할당)
  TypeScript: 4,
  JavaScript: 5,
  'Next.js': 6,
  Performance: 7,
  Frontend: 8,
  Backend: 9,

  // 추가 확장 카테고리들 (논리적 그룹핑으로 색상 재활용)
  'Vue.js': 2, // React와 같은 프레임워크 계열
  Python: 5, // JavaScript와 같은 언어 계열
  DevOps: 7, // Performance와 같은 최적화 계열
  Tools: 7, // Performance와 같은 최적화 계열
  'Computer Science': 1, // Programming과 같은 기초 계열
};

/**
 * 카테고리 이름에 따라 색상 인덱스를 반환합니다.
 * @param category 카테고리 이름
 * @returns 색상 팔레트 인덱스
 */
export const getCategoryColorIndex = (category: string): number => {
  return (
    CATEGORY_COLOR_MAP[category] ??
    category.charCodeAt(0) % COLOR_PALETTE.length
  );
};

/**
 * 카테고리에 맞는 색상 스타일을 반환합니다.
 * @param category 카테고리 이름
 * @param isSelected 선택된 상태인지 여부
 * @returns 색상 스타일 객체
 */
export const getCategoryColors = (
  category: string,
  isSelected: boolean = true
): ColorStyle => {
  const colorIndex = getCategoryColorIndex(category);

  if (isSelected) {
    return COLOR_PALETTE[colorIndex % COLOR_PALETTE.length] || COLOR_PALETTE[0];
  } else {
    return (
      LIGHT_COLOR_PALETTE[colorIndex % LIGHT_COLOR_PALETTE.length] ||
      LIGHT_COLOR_PALETTE[0]
    );
  }
};

/**
 * 태그에 맞는 색상 스타일을 반환합니다.
 * @param tag 태그 이름
 * @returns 색상 스타일 객체
 */
export const getTagColors = (tag: string): ColorStyle => {
  return getCategoryColors(tag, true);
};
