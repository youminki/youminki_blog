import React, { useEffect, useState, useRef } from 'react';
import type { Project } from '../../types';
import {
  createScopedStyles,
  createResponsiveModalStyles,
  checkStyleConflicts,
  createScrollbarStyles,
  applyScrollbarStyles,
  toggleScrollbarAnimation,
} from '../../utils/styleUtils';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = React.memo(
  ({ project, isOpen, onClose }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [styles, setStyles] = useState(createScopedStyles('modal'));
    const modalContainerRef = useRef<HTMLDivElement>(null);

    // 반응형 처리 및 스타일 생성
    useEffect(() => {
      const checkMobile = () => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        setStyles(createResponsiveModalStyles(mobile));
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 스크롤바 스타일 적용
    useEffect(() => {
      if (modalContainerRef.current) {
        const scrollbarStyles = createScrollbarStyles(isMobile);
        applyScrollbarStyles(modalContainerRef.current, scrollbarStyles);
      }
    }, [isMobile]);

    // 스크롤바 애니메이션 제어
    useEffect(() => {
      const container = modalContainerRef.current;
      if (container) {
        const handleScroll = () => {
          toggleScrollbarAnimation(container, true);
          // 애니메이션 후 자동으로 비활성화
          setTimeout(() => {
            toggleScrollbarAnimation(container, false);
          }, 300);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }
    }, []);

    // 스타일 충돌 검사
    useEffect(() => {
      const conflicts = checkStyleConflicts(styles);
      if (conflicts.length > 0) {
        console.warn('스타일 충돌 감지:', conflicts);
      }
    }, [styles]);

    console.log('=== ProjectModal 렌더링 ===');
    console.log('isOpen:', isOpen);
    console.log('project:', project);
    console.log('isMobile:', isMobile);

    if (!isOpen || !project) {
      console.log('ProjectModal - 조건 불충족으로 렌더링 안함');
      return null;
    }

    console.log('ProjectModal - 모달 렌더링 시작!');

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleButtonHover = (
      e: React.MouseEvent<HTMLButtonElement>,
      isHover: boolean
    ) => {
      e.currentTarget.style.backgroundColor = isHover ? '#8b5cf6' : '#a78bfa';
    };

    return (
      <div
        style={styles.overlay}
        onClick={handleBackdropClick}
        data-testid="modal-overlay"
        data-modal-id={styles.overlay['--modal-id']}
      >
        <div
          ref={modalContainerRef}
          style={styles.container}
          onClick={e => e.stopPropagation()}
          data-testid="modal-container"
          data-modal-container-id={styles.container['--modal-container-id']}
        >
          {/* 모달 헤더 */}
          <div
            style={styles.header}
            data-modal-header-id={styles.header['--modal-header-id']}
          >
            <h2
              style={styles.title}
              data-modal-title-id={styles.title['--modal-title-id']}
            >
              {project.title}
            </h2>
          </div>

          {/* 프로젝트 이미지 */}
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                borderRadius: '8px',
                border: '1px solid #374151',
              }}
            />
          </div>

          {/* 프로젝트 설명 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={styles.projectDescription}
              data-modal-project-desc-id={
                styles.projectDescription['--modal-project-desc-id']
              }
            >
              {project.description}
            </p>
          </div>

          {/* 사용 기술 */}
          <div style={{ marginBottom: '20px' }}>
            <h4
              style={styles.sectionTitle}
              data-modal-section-title-id={
                styles.sectionTitle['--modal-section-title-id']
              }
            >
              사용 기술 ({project.technologies.length}개)
            </h4>
            <div
              style={styles.techContainer}
              data-modal-tech-container-id={
                styles.techContainer['--modal-tech-container-id']
              }
            >
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  style={styles.techTag}
                  data-modal-tech-tag-id={styles.techTag['--modal-tech-tag-id']}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 주요 기능 */}
          <div style={{ marginBottom: '20px' }}>
            <h4
              style={styles.sectionTitle}
              data-modal-section-title-id={
                styles.sectionTitle['--modal-section-title-id']
              }
            >
              주요 기능 ({project.features.length}개)
            </h4>
            <ul
              style={styles.featuresList}
              data-modal-features-list-id={
                styles.featuresList['--modal-features-list-id']
              }
            >
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  style={styles.featureItem}
                  data-modal-feature-item-id={
                    styles.featureItem['--modal-feature-item-id']
                  }
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* 프로젝트 링크 */}
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#333',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#555';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#333';
                  }}
                >
                  GitHub 보기
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#a78bfa',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#8b5cf6';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#a78bfa';
                  }}
                >
                  라이브 데모
                </a>
              )}
            </div>
          </div>

          {/* 닫기 버튼 */}
          <div
            style={styles.buttonContainer}
            data-modal-button-container-id={
              styles.buttonContainer['--modal-button-container-id']
            }
          >
            <button
              style={styles.closeButton}
              onClick={onClose}
              onMouseEnter={e => handleButtonHover(e, true)}
              onMouseLeave={e => handleButtonHover(e, false)}
              data-modal-close-button-id={
                styles.closeButton['--modal-close-button-id']
              }
              data-testid="modal-close-button"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ProjectModal.displayName = 'ProjectModal';

export default ProjectModal;
