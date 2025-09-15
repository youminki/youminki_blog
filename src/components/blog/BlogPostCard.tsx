import React, { useMemo } from 'react';
import type { BlogPost } from '../../types';
import { getCategoryColors } from '../../utils/colorUtils';
import './Blog.css';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  // 카테고리별 색상 스타일 생성
  const categoryColors = useMemo(() => {
    return getCategoryColors(post.category, true);
  }, [post.category]);

  const getCategoryClass = (category: string) => {
    switch (category) {
      case '전체':
        return 'category-all';
      case 'React':
        return 'category-react';
      case 'TypeScript':
        return 'category-typescript';
      default:
        return 'category-default';
    }
  };

  const handleClick = () => {
    window.open(post.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      className={`rainbow-border blog-post-card`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${post.title} 블로그 포스트 읽기`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* 썸네일 이미지 */}
      <div
        className="blog-post-thumbnail"
        style={{
          background: categoryColors.bg,
          color: categoryColors.color,
          borderColor: categoryColors.border,
        }}
      >
        {post.category}
      </div>

      {/* 포스트 내용 */}
      <div className="blog-post-content">
        {/* 태그 */}
        <div className="blog-post-tag">
          <span
            style={{
              background: categoryColors.bg,
              color: categoryColors.color,
              borderColor: categoryColors.border,
            }}
          >
            {post.category}
          </span>
        </div>

        {/* 제목 */}
        <h3 className="blog-post-title">{post.title}</h3>

        {/* 요약 */}
        <p className="blog-post-summary">{post.summary}</p>

        {/* 메타 정보 */}
        <div className="blog-post-meta">
          <span>{post.date}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
