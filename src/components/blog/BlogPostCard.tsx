import React, { useMemo } from 'react';
import type { BlogPost } from '../../types';
import { getCategoryColors } from '../../utils/colorUtils';
import { getTagPriority } from '../../utils/smartTagGenerator';
import './Blog.css';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  // 카테고리별 색상 스타일 생성
  const categoryColors = useMemo(() => {
    return getCategoryColors(post.category, true);
  }, [post.category]);

  // 태그 우선순위별로 정렬
  const sortedTagsWithPriority = useMemo(() => {
    return post.tags
      .map(tag => ({
        tag,
        priority: getTagPriority(tag, post.title, post.summary),
      }))
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 5); // 상위 5개 태그만 표시
  }, [post.tags, post.title, post.summary]);

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

        {/* 태그 */}
        {sortedTagsWithPriority.length > 0 && (
          <div className="blog-post-tags">
            {sortedTagsWithPriority.map(({ tag, priority }, index) => (
              <span
                key={index}
                className="blog-post-tag-item"
                data-priority={priority}
                style={{
                  background: categoryColors.bg,
                  color: categoryColors.color,
                  borderColor: categoryColors.border,
                }}
                title={`${tag} (${priority} priority)`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPostCard;
