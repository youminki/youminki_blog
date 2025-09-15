import React, { useCallback } from 'react';
import './Blog.css';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

// 색상 팔레트를 컴포넌트 외부로 이동하여 재생성 방지
const COLOR_PALETTE = [
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

const LIGHT_COLOR_PALETTE = [
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

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryClick,
}) => {
  // 카테고리별 색상 함수를 useCallback으로 최적화
  const getCategoryColors = useCallback(
    (cat: string, isSelected: boolean) => {
      // 카테고리 인덱스 찾기
      const categoryIndex = categories.indexOf(cat);

      if (isSelected) {
        // 선택된 상태: 진한 색상
        if (cat === '전체') {
          return {
            bg: 'var(--filter-color-1)',
            color: 'white',
            border: 'var(--filter-color-1)',
          };
        }
        return (
          COLOR_PALETTE[categoryIndex % COLOR_PALETTE.length] ||
          COLOR_PALETTE[0]
        );
      } else {
        // 선택되지 않은 상태: 연한 색상
        if (cat === '전체') {
          return {
            bg: 'var(--filter-light-1)',
            color: 'var(--filter-color-1)',
            border: 'var(--filter-color-1)',
          };
        }
        return (
          LIGHT_COLOR_PALETTE[categoryIndex % LIGHT_COLOR_PALETTE.length] ||
          LIGHT_COLOR_PALETTE[0]
        );
      }
    },
    [categories]
  );

  // 호버 이벤트 핸들러 최적화
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, category: string) => {
      if (selectedCategory !== category) {
        const hoverColors = getCategoryColors(category, false);
        e.currentTarget.style.background = hoverColors.bg;
        e.currentTarget.style.color = hoverColors.color;
        e.currentTarget.style.borderColor = hoverColors.border;
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
        e.currentTarget.style.boxShadow =
          '0 12px 30px rgba(0, 0, 0, 0.2), 0 6px 15px rgba(0, 0, 0, 0.1)';
      }
    },
    [selectedCategory, getCategoryColors]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, category: string) => {
      if (selectedCategory !== category) {
        const normalColors = getCategoryColors(category, false);
        e.currentTarget.style.background = normalColors.bg;
        e.currentTarget.style.color = normalColors.color;
        e.currentTarget.style.borderColor = normalColors.border;
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }
    },
    [selectedCategory, getCategoryColors]
  );

  return (
    <div
      role="tablist"
      aria-label="블로그 카테고리 필터"
      style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {categories.map(category => {
        const isSelected = selectedCategory === category;
        const colors = getCategoryColors(category, isSelected);

        return (
          <button
            key={category}
            role="tab"
            aria-selected={isSelected}
            aria-controls={`blog-posts-${category}`}
            onClick={() => {
              onCategoryClick(category);
            }}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '1.5rem',
              border: `2px solid ${colors.border}`,
              background: colors.bg,
              color: colors.color,
              fontSize: '0.9rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow:
                selectedCategory === category
                  ? '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)'
                  : '0 2px 8px rgba(0, 0, 0, 0.1)',
              minHeight: '44px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            onMouseEnter={e => handleMouseEnter(e, category)}
            onMouseLeave={e => handleMouseLeave(e, category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
