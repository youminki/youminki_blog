import React from 'react';
import type { BlogPost } from '../../types';
import './Blog.css';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
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
      <div className={`blog-post-thumbnail ${getCategoryClass(post.category)}`}>
        {post.category}
      </div>

      {/* 포스트 내용 */}
      <div className="blog-post-content">
        {/* 태그 */}
        <div className="blog-post-tag">
          <span className={getCategoryClass(post.category)}>
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
