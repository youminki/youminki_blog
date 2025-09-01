import { useBlogModal, type BlogPost } from '../hooks/useBlogModal';
import { useState, useEffect } from 'react';
import { BLOG_POSTS, getAllCategories } from '../data';

const Blog = () => {
  const { isOpen, openModal, closeModal } = useBlogModal();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 마크다운 텍스트를 HTML로 변환하는 유틸리티 함수
  const convertMarkdownToHTML = (text: string): string => {
    return (
      text
        // **텍스트** 패턴을 <strong> 태그로 변환
        .replace(
          /\*\*(.*?)\*\*/g,
          '<strong style="font-weight: 600; color: var(--accent-color);">$1</strong>'
        )
        // __텍스트__ 패턴도 <strong> 태그로 변환 (대안 마크다운 문법)
        .replace(
          /__(.*?)__/g,
          '<strong style="font-weight: 600; color: var(--accent-color);">$1</strong>'
        )
        // *텍스트* 패턴을 <em> 태그로 변환
        .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>')
        // _텍스트_ 패턴도 <em> 태그로 변환
        .replace(/_(.*?)_/g, '<em style="font-style: italic;">$1</em>')
        // `텍스트` 패턴을 <code> 태그로 변환
        .replace(
          /`(.*?)`/g,
          '<code style="background-color: var(--bg-secondary); padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.875rem;">$1</code>'
        )
    );
  };

  // 모달 열림/닫힘 시 배경 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 배경 스크롤 비활성화
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // 스크롤바로 인한 레이아웃 시프트 방지
    } else {
      // 모달이 닫힐 때 배경 스크롤 활성화
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // 카테고리별 썸네일 색상 함수
  const getCategoryThumbnailColor = (category: string) => {
    switch (category) {
      case '전체':
        return '#dbeafe'; // 연한 파란색
      case 'React':
        return '#cffafe'; // 연한 청록색
      case 'TypeScript':
        return '#e9d5ff'; // 연한 보라색
      default:
        return '#f1f5f9'; // 기본 회색
    }
  };

  // 카테고리별 텍스트 색상 함수
  const getCategoryTextColor = (category: string) => {
    switch (category) {
      case '전체':
        return '#1e40af'; // 진한 파란색
      case 'React':
        return '#0891b2'; // 진한 청록색
      case 'TypeScript':
        return '#7c3aed'; // 진한 보라색
      default:
        return '#64748b'; // 기본 회색
    }
  };

  const categories = ['전체', ...getAllCategories()];

  const filteredPosts =
    selectedCategory === '전체'
      ? BLOG_POSTS
      : BLOG_POSTS.filter(post => post.category === selectedCategory);

  const handlePostClick = (post: BlogPost) => {
    console.log('블로그 포스트 클릭됨:', post.title);
    setSelectedPost(post);
    openModal(post);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <main style={{ padding: '1rem 0' }}>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 1rem',
          }}
        >
          {/* 카테고리 필터 */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {categories.map(category => {
              // 각 카테고리별로 다른 색상 적용 (새로운 카테고리도 자동으로 색상 할당)
              const getCategoryColors = (cat: string, isSelected: boolean) => {
                // 미리 정의된 색상 팔레트
                const colorPalette = [
                  { bg: '#3b82f6', color: 'white', border: '#3b82f6' }, // 파란색
                  { bg: '#06b6d4', color: 'white', border: '#06b6d4' }, // 청록색
                  { bg: '#8b5cf6', color: 'white', border: '#8b5cf6' }, // 보라색
                  { bg: '#10b981', color: 'white', border: '#10b981' }, // 초록색
                  { bg: '#f59e0b', color: 'white', border: '#f59e0b' }, // 주황색
                  { bg: '#ef4444', color: 'white', border: '#ef4444' }, // 빨간색
                  { bg: '#ec4899', color: 'white', border: '#ec4899' }, // 분홍색
                  { bg: '#84cc16', color: 'white', border: '#84cc16' }, // 연두색
                ];

                const lightColorPalette = [
                  { bg: '#dbeafe', color: '#1e40af', border: '#93c5fd' }, // 연한 파란색
                  { bg: '#cffafe', color: '#0891b2', border: '#67e8f9' }, // 연한 청록색
                  { bg: '#e9d5ff', color: '#7c3aed', border: '#c4b5fd' }, // 연한 보라색
                  { bg: '#d1fae5', color: '#047857', border: '#6ee7b7' }, // 연한 초록색
                  { bg: '#fed7aa', color: '#ea580c', border: '#fdba74' }, // 연한 주황색
                  { bg: '#fecaca', color: '#dc2626', border: '#fca5a5' }, // 연한 빨간색
                  { bg: '#fce7f3', color: '#be185d', border: '#f9a8d4' }, // 연한 분홍색
                  { bg: '#ecfccb', color: '#65a30d', border: '#bef264' }, // 연한 연두색
                ];

                // 카테고리 인덱스 찾기
                const categoryIndex = categories.indexOf(cat);

                if (isSelected) {
                  // 선택된 상태: 진한 색상
                  if (cat === '전체') {
                    return { bg: '#3b82f6', color: 'white', border: '#3b82f6' };
                  }
                  return (
                    colorPalette[categoryIndex % colorPalette.length] ||
                    colorPalette[0]
                  );
                } else {
                  // 선택되지 않은 상태: 연한 색상
                  if (cat === '전체') {
                    return {
                      bg: '#dbeafe',
                      color: '#1e40af',
                      border: '#93c5fd',
                    };
                  }
                  return (
                    lightColorPalette[
                      categoryIndex % lightColorPalette.length
                    ] || lightColorPalette[0]
                  );
                }
              };

              const isSelected = selectedCategory === category;
              const colors = getCategoryColors(category, isSelected);

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '1.5rem',
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.bg,
                    color: colors.color,
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow:
                      selectedCategory === category
                        ? '0 4px 12px rgba(0, 0, 0, 0.15)'
                        : 'none',
                    minHeight: '44px', // 터치 친화적인 최소 높이
                  }}
                  onMouseEnter={e => {
                    if (selectedCategory !== category) {
                      const hoverColors = getCategoryColors(category, false);
                      e.currentTarget.style.backgroundColor = hoverColors.bg;
                      e.currentTarget.style.color = hoverColors.color;
                      e.currentTarget.style.borderColor = hoverColors.border;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow =
                        '0 4px 8px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (selectedCategory !== category) {
                      const normalColors = getCategoryColors(category, false);
                      e.currentTarget.style.backgroundColor = normalColors.bg;
                      e.currentTarget.style.color = normalColors.color;
                      e.currentTarget.style.borderColor = normalColors.border;
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* 포스트 개수 표시 */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
            }}
          >
            {filteredPosts.length}개의 포스트
          </div>

          {/* 블로그 포스트 그리드 */}
          <div
            style={{
              display: 'grid',
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {filteredPosts.map(post => (
              <article
                key={post.id}
                className="rainbow-border"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 25px var(--shadow-medium)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => handlePostClick(post)}
              >
                {/* 썸네일 이미지 */}
                <div
                  style={{
                    height: '180px',
                    backgroundColor: getCategoryThumbnailColor(post.category),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: getCategoryTextColor(post.category),
                    fontSize: '1.25rem',
                    fontWeight: '700',
                  }}
                >
                  {post.category}
                </div>

                {/* 포스트 내용 */}
                <div style={{ padding: '1.25rem' }}>
                  {/* 태그 */}
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        backgroundColor: getCategoryThumbnailColor(
                          post.category
                        ),
                        color: getCategoryTextColor(post.category),
                        padding: '0.375rem 0.875rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        border: `1px solid ${getCategoryTextColor(post.category)}`,
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '0.75rem',
                      lineHeight: '1.4',
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* 요약 */}
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.content.split('\n')[0]}
                  </p>

                  {/* 메타 정보 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* 블로그 포스트 모달 */}
      {isOpen && selectedPost && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: window.innerWidth <= 768 ? '0.5rem' : '1rem',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: window.innerWidth <= 768 ? '0.5rem' : '1rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: window.innerWidth <= 768 ? '98vh' : '95vh',
              overflow: 'auto',
              position: 'relative',
              border: '1px solid var(--border-color)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div
              style={{
                padding:
                  window.innerWidth <= 768
                    ? '0.75rem 1rem 0.5rem 1rem'
                    : '1rem 2rem 0.75rem 2rem',
                borderBottom: '1px solid var(--border-color)',
                position: 'sticky',
                top: 0,
                backgroundColor: 'var(--bg-primary)',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '0.25rem',
                      lineHeight: '1.3',
                    }}
                  >
                    {selectedPost.title}
                  </h2>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span>{selectedPost.date}</span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '2px solid var(--border-color)',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    width: '2.5rem',
                    height: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    lineHeight: 1,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor =
                      'var(--accent-color)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'var(--accent-color)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor =
                      'var(--bg-secondary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  aria-label="모달 닫기"
                  title="닫기"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* 모달 내용 */}
            <div
              style={{
                padding: window.innerWidth <= 768 ? '0.5rem' : '0.75rem',
                maxHeight: window.innerWidth <= 768 ? '80vh' : '75vh',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--accent-color) var(--bg-secondary)',
              }}
              className="custom-scrollbar"
            >
              <div
                style={{
                  color: 'var(--text-primary)',
                  lineHeight: '1.4',
                  fontSize: '1rem',
                }}
              >
                {(() => {
                  const lines = selectedPost.content.split('\n');
                  const elements = [];
                  let codeBlock = false;
                  let codeLines = [];
                  let codeLanguage = '';

                  for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    const key = `line-${i}`;

                    // 코드 블록 시작/끝 처리
                    if (line.startsWith('```')) {
                      if (!codeBlock) {
                        // 코드 블록 시작
                        codeBlock = true;
                        codeLines = [];
                        codeLanguage = line.replace('```', '').trim() || 'Code';
                        continue;
                      } else {
                        // 코드 블록 끝
                        codeBlock = false;
                        elements.push(
                          <div
                            key={key}
                            style={{
                              margin: '1.5rem 0',
                              backgroundColor: 'var(--bg-secondary)',
                              borderRadius: '0.75rem',
                              border: '1px solid var(--border-color)',
                              overflow: 'hidden',
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: 'var(--bg-primary)',
                                padding: '0.75rem 1rem',
                                borderBottom: '1px solid var(--border-color)',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                              }}
                            >
                              <div
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  backgroundColor: '#ef4444',
                                }}
                              />
                              <div
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  backgroundColor: '#f59e0b',
                                }}
                              />
                              <div
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  backgroundColor: '#10b981',
                                }}
                              />
                              <span style={{ marginLeft: '0.5rem' }}>
                                {codeLanguage}
                              </span>
                            </div>
                            <pre
                              style={{
                                margin: 0,
                                padding: '1.5rem',
                                overflow: 'auto',
                                fontSize: '0.875rem',
                                lineHeight: '1.6',
                                fontFamily:
                                  'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                                backgroundColor: 'var(--bg-secondary)',
                              }}
                            >
                              <code style={{ color: 'var(--text-primary)' }}>
                                {codeLines.join('\n')}
                              </code>
                            </pre>
                          </div>
                        );
                        continue;
                      }
                    }

                    // 코드 블록 내부 처리
                    if (codeBlock) {
                      codeLines.push(line);
                      continue;
                    }

                    // 일반 텍스트 처리
                    if (line.startsWith('## ')) {
                      elements.push(
                        <h3
                          key={key}
                          style={{
                            fontSize: '1.75rem',
                            fontWeight: '700',
                            marginTop: '1.5rem',
                            marginBottom: '1rem',
                            color: 'var(--text-primary)',
                            borderBottom: '2px solid var(--accent-color)',
                            paddingBottom: '0.5rem',
                          }}
                        >
                          {line.replace('## ', '')}
                        </h3>
                      );
                    } else if (line.startsWith('### ')) {
                      elements.push(
                        <h4
                          key={key}
                          style={{
                            fontSize: '1.375rem',
                            fontWeight: '600',
                            marginTop: '1.25rem',
                            marginBottom: '0.75rem',
                            color: 'var(--accent-color)',
                            paddingLeft: '0.5rem',
                            borderLeft: '4px solid var(--accent-color)',
                          }}
                        >
                          {line.replace('### ', '')}
                        </h4>
                      );
                    } else if (line.trim() === '') {
                      elements.push(
                        <div key={key} style={{ height: '1rem' }} />
                      );
                    } else if (line.startsWith('- ')) {
                      // 리스트 아이템 처리 (마크다운 변환 포함)
                      const contentWithoutBullet = line.replace('- ', '');
                      const processedLine =
                        convertMarkdownToHTML(contentWithoutBullet);
                      elements.push(
                        <div
                          key={key}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            marginBottom: '0.75rem',
                            paddingLeft: '1rem',
                          }}
                        >
                          <span
                            style={{
                              color: 'var(--accent-color)',
                              marginRight: '0.75rem',
                              fontSize: '1.2rem',
                              lineHeight: '1.7',
                              display: 'flex',
                              alignItems: 'center',
                              minWidth: '1rem',
                            }}
                          >
                            •
                          </span>
                          <span
                            style={{ flex: 1, lineHeight: '1.7' }}
                            dangerouslySetInnerHTML={{
                              __html: processedLine,
                            }}
                          />
                        </div>
                      );
                    } else if (line.startsWith('**') && line.endsWith('**')) {
                      // 전체 라인이 **로 감싸진 경우 (제목 스타일)
                      elements.push(
                        <p
                          key={key}
                          style={{
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            color: 'var(--accent-color)',
                            fontSize: '1.125rem',
                          }}
                        >
                          {line.replace(/\*\*/g, '')}
                        </p>
                      );
                    } else if (
                      line.startsWith('**Q:') ||
                      line.startsWith('**A:')
                    ) {
                      elements.push(
                        <div
                          key={key}
                          style={{
                            marginBottom: '1rem',
                            padding: '1rem',
                            backgroundColor: line.startsWith('**Q:')
                              ? 'var(--bg-secondary)'
                              : 'var(--bg-primary)',
                            borderRadius: '0.75rem',
                            border: '1px solid var(--border-color)',
                          }}
                        >
                          <div
                            style={{
                              fontWeight: '600',
                              color: line.startsWith('**Q:')
                                ? 'var(--accent-color)'
                                : 'var(--text-primary)',
                              marginBottom: '0.5rem',
                              fontSize: '1rem',
                            }}
                          >
                            {line.startsWith('**Q:') ? '❓ 질문' : '💡 답변'}
                          </div>
                          <div style={{ lineHeight: '1.6' }}>
                            {line.replace(/\*\*Q:\s*|\*\*A:\s*/g, '')}
                          </div>
                        </div>
                      );
                    } else if (
                      line.includes('[') &&
                      line.includes('](') &&
                      line.includes(')')
                    ) {
                      // 마크다운 링크 처리
                      const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
                      if (linkMatch) {
                        const [, linkText, linkUrl] = linkMatch;
                        elements.push(
                          <p
                            key={key}
                            style={{
                              marginBottom: '0.75rem',
                              lineHeight: '1.6',
                              fontSize: '1rem',
                              color: 'var(--text-primary)',
                            }}
                          >
                            <a
                              href={linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: 'var(--accent-color)',
                                textDecoration: 'underline',
                                fontWeight: '500',
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.textDecoration = 'none';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.textDecoration =
                                  'underline';
                              }}
                            >
                              {linkText}
                            </a>
                          </p>
                        );
                      } else {
                        elements.push(
                          <p
                            key={key}
                            style={{
                              marginBottom: '1.25rem',
                              lineHeight: '1.8',
                              fontSize: '1rem',
                              color: 'var(--text-primary)',
                            }}
                          >
                            {line}
                          </p>
                        );
                      }
                    } else {
                      // 일반 텍스트 처리 (마크다운 변환 포함)
                      const processedLine = convertMarkdownToHTML(line);
                      elements.push(
                        <p
                          key={key}
                          style={{
                            marginBottom: '0.75rem',
                            lineHeight: '1.6',
                            fontSize: '1rem',
                            color: 'var(--text-primary)',
                          }}
                          dangerouslySetInnerHTML={{ __html: processedLine }}
                        />
                      );
                    }
                  }

                  return elements;
                })()}
              </div>

              {/* 태그 섹션 */}
              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '2px solid var(--border-color)',
                }}
              >
                <h5
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  📍 관련 태그
                </h5>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {selectedPost.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)',
                        padding: '0.5rem 1rem',
                        borderRadius: '1.5rem',
                        fontSize: '0.875rem',
                        border: '1px solid var(--border-color)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor =
                          'var(--accent-color)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor =
                          'var(--accent-color)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor =
                          'var(--bg-secondary)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.borderColor =
                          'var(--border-color)';
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
