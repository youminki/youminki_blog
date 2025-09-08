import React from 'react';
import type { BlogPost } from '../../types';
import MarkdownRenderer from './MarkdownRenderer';
import './Blog.css';

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="blog-modal-overlay" onClick={onClose}>
      <div className="blog-modal-content" onClick={e => e.stopPropagation()}>
        {/* 모달 헤더 */}
        <div className="blog-modal-header">
          <div className="blog-modal-header-content">
            <div>
              <h2 className="blog-modal-title">{post.title}</h2>
              <div className="blog-modal-date">
                <span>{post.date}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="blog-modal-close"
              aria-label="모달 닫기"
              title="닫기"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 모달 내용 */}
        <div className="blog-modal-body custom-scrollbar">
          <MarkdownRenderer content={post.content} />

          {/* 태그 섹션 */}
          <div className="blog-modal-tags">
            <h5 className="blog-modal-tags-title">📍 관련 태그</h5>
            <div className="blog-modal-tags-list">
              {post.tags.map((tag: string, index: number) => (
                <span key={index} className="blog-modal-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
