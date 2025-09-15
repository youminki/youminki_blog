import React, { useCallback } from 'react';
import { getCategoryColors } from '../../utils/colorUtils';
import './Blog.css';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryClick,
}) => {
  // 카테고리별 색상 함수를 useCallback으로 최적화
  const getColors = useCallback((cat: string, isSelected: boolean) => {
    return getCategoryColors(cat, isSelected);
  }, []);

  // 호버 이벤트 핸들러 최적화
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, category: string) => {
      if (selectedCategory !== category) {
        const hoverColors = getColors(category, false);
        e.currentTarget.style.background = hoverColors.bg;
        e.currentTarget.style.color = hoverColors.color;
        e.currentTarget.style.borderColor = hoverColors.border;
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
        e.currentTarget.style.boxShadow =
          '0 12px 30px rgba(0, 0, 0, 0.2), 0 6px 15px rgba(0, 0, 0, 0.1)';
      }
    },
    [selectedCategory, getColors]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, category: string) => {
      if (selectedCategory !== category) {
        const normalColors = getColors(category, false);
        e.currentTarget.style.background = normalColors.bg;
        e.currentTarget.style.color = normalColors.color;
        e.currentTarget.style.borderColor = normalColors.border;
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }
    },
    [selectedCategory, getColors]
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
        const colors = getColors(category, isSelected);

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
