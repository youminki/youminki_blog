import { useBlogModal } from '../hooks/useBlogModal';
import { useModalScrollControl } from '../hooks/useModalScrollControl';
import { useUrlParams } from '../hooks/useUrlParams';
import type { BlogPost } from '../types';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { BLOG_POSTS, getAllCategories } from '../data';
import CategoryFilter from './blog/CategoryFilter';
import BlogPostCard from './blog/BlogPostCard';
import BlogModal from './blog/BlogModal';
import './blog/Blog.css';

interface BlogProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const Blog: React.FC<BlogProps> = ({
  selectedCategory: propSelectedCategory = '전체',
  onCategoryChange,
}) => {
  const { isOpen, selectedPost, openModal, closeModal } = useBlogModal();
  const [selectedCategory, setSelectedCategory] =
    useState(propSelectedCategory);
  const { urlParams } = useUrlParams();

  // 모달 스크롤 제어
  useModalScrollControl(isOpen);

  // URL에서 모달 열기 및 카테고리 동기화
  useEffect(() => {
    // URL에서 블로그 모달 열기
    if (urlParams.blogId) {
      const blogPost = BLOG_POSTS.find(post => post.id === urlParams.blogId);
      if (blogPost) {
        openModal(blogPost);
      }
    }

    // props에서 카테고리 변경 시 로컬 상태 동기화
    if (propSelectedCategory !== selectedCategory) {
      setSelectedCategory(propSelectedCategory);
    }
  }, [urlParams.blogId, propSelectedCategory, selectedCategory, openModal]);

  // 카테고리 목록 메모이제이션
  const categories = useMemo(() => ['전체', ...getAllCategories()], []);

  // 필터된 포스트 메모이제이션
  const filteredPosts = useMemo(() => {
    return selectedCategory === '전체'
      ? BLOG_POSTS
      : BLOG_POSTS.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  // 이벤트 핸들러 메모이제이션
  const handlePostClick = useCallback(
    (post: BlogPost) => {
      openModal(post);
    },
    [openModal]
  );

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
              <BlogPostCard
                key={post.id}
                post={post}
                onPostClick={handlePostClick}
              />
            ))}
          </div>
        </div>
      </main>

      {/* 블로그 포스트 모달 */}
      <BlogModal post={selectedPost} isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default Blog;
