import { useState, useMemo, useCallback } from 'react';
import { BLOG_POSTS, getAllCategories } from '../data';
import CategoryFilter from './blog/CategoryFilter';
import BlogPostCard from './blog/BlogPostCard';
import './blog/Blog.css';

interface BlogProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const Blog: React.FC<BlogProps> = ({
  selectedCategory: propSelectedCategory = '전체',
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState(propSelectedCategory);

  // 카테고리 목록 메모이제이션
  const categories = useMemo(() => ['전체', ...getAllCategories()], []);

  // 필터된 포스트 메모이제이션
  const filteredPosts = useMemo(() => {
    return selectedCategory === '전체'
      ? BLOG_POSTS
      : BLOG_POSTS.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  // 이벤트 핸들러 메모이제이션
  const handleCategoryClick = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      onCategoryChange?.(category);
    },
    [onCategoryChange]
  );

  return (
    <>
      <main className="blog-container">
        <div className="blog-content">
          {/* 카테고리 필터 */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />

          {/* 포스트 개수 표시 */}
          <div className="blog-post-count">
            {filteredPosts.length}개의 포스트
          </div>

          {/* 블로그 포스트 그리드 */}
          <div
            className="blog-grid"
            role="tabpanel"
            id={`blog-posts-${selectedCategory}`}
            aria-label={`${selectedCategory} 카테고리 블로그 포스트`}
          >
            {filteredPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;
