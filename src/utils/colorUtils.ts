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
];

// 카테고리별 색상 매핑
const CATEGORY_COLOR_MAP: { [key: string]: number } = {
  전체: 0,
  React: 1,
  'Next.js': 2,
  TypeScript: 3,
  JavaScript: 4,
  Performance: 5,
  Frontend: 6,
  Programming: 7,
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
