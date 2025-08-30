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

    // Melpik 사용자 웹 & 하이브리드 앱인 경우 화면설계 이미지 섹션 렌더링 (관리자 제외)
    const renderMelpikUIScreenshots = () => {
      const projectTitle = project.title.toLowerCase();
      if (projectTitle.includes('melpik') && !projectTitle.includes('관리자')) {
        return (
          <div style={{ marginBottom: '20px' }}>
            <h4
              style={styles.sectionTitle}
              data-modal-section-title-id={
                styles.sectionTitle['--modal-section-title-id']
              }
            >
              🎨 화면설계 UI
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '15px',
                marginBottom: '15px',
              }}
            >
              {/* MelpikUI_1.gif - 메인 홈 화면 */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/melpik/홈페이지_모바일UI.gif"
                  alt="MelpikUI 화면 1 - 메인 홈 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  🏠 메인 홈 화면
                </p>
              </div>

              {/* MelpikUI_2.gif - 이용권 결제*/}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/melpik/이용권결제_모바일UI.gif"
                  alt="MelpikUI 화면 2 - 이용권 결제"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  🎭 이용권 결제
                </p>
              </div>

              {/* MelpikUI_3.gif - 제품 상세/결제 */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/melpik/제품결제_모바일UI.gif"
                  alt="MelpikUI 화면 3 - 제품 상세/결제"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  🛍️ 제품 상세/결제
                </p>
              </div>

              {/* MelpikUI_4.gif - 각 페이지  */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/melpik/페이지네이션_모바일UI.gif"
                  alt="MelpikUI 화면 4 - 각 페이지 구성"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  🔍 각 페이지 구성
                </p>
              </div>
            </div>
            <div
              style={{
                backgroundColor: '#1e293b',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #a78bfa',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#cbd5e1',
                  lineHeight: 1.4,
                }}
              >
                💡 <strong>MelpikUI</strong>는 패션 쇼핑몰 앱으로, 사용자
                친화적인 인터페이스와 직관적인 네비게이션을 제공합니다.
              </p>
            </div>

            {/* Web UI 이미지들 */}
            <h4
              style={styles.sectionTitle}
              data-modal-section-title-id={
                styles.sectionTitle['--modal-section-title-id']
              }
            >
              🌐 웹 UI 화면
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '15px',
                marginBottom: '15px',
              }}
            >
              {/* 홈_웹UI.gif */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/melpik/Web/홈_웹UI.gif"
                  alt="Melpik 웹 UI - 홈 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  🏠 홈 화면
                </p>
              </div>

              {/* 홈상세_웹UI.gif */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/melpik/Web/홈상세_웹UI.gif"
                  alt="Melpik 웹 UI - 홈 상세 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  🏠 홈 상세 화면
                </p>
              </div>

              {/* 브랜드_웹UI.gif */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/melpik/Web/브랜드_웹UI.gif"
                  alt="Melpik 웹 UI - 브랜드 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  🏷️ 브랜드 화면
                </p>
              </div>

              {/* 다이어리_웹UI.gif */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/melpik/Web/다이어리_웹UI.gif"
                  alt="Melpik 웹 UI - 다이어리 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  📅 다이어리 화면
                </p>
              </div>

              {/* 이용내역_이용권_웹UI.gif */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/melpik/Web/이용내역_이용권_웹UI.gif"
                  alt="Melpik 웹 UI - 이용내역 및 이용권 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  📋 이용내역 및 이용권
                </p>
              </div>

              {/* 결제수단_내옷장_웹UI.gif */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/melpik/Web/결제수단_내옷장_웹UI.gif"
                  alt="Melpik 웹 UI - 결제수단 및 내옷장 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  💳 결제수단 및 내옷장
                </p>
              </div>

              {/* 고객센터_웹UI.gif */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/melpik/Web/고객센터_웹UI.gif"
                  alt="Melpik 웹 UI - 고객센터 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  🎧 고객센터 화면
                </p>
              </div>

              {/* 내정보_웹UI.gif */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/melpik/Web/내정보_웹UI.gif"
                  alt="Melpik 웹 UI - 내정보 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  👤 내정보 화면
                </p>
              </div>
            </div>
          </div>
        );
      }
      return null;
    };

    // Melpik 관리자 페이지인 경우 관리자 화면설계 이미지 섹션 렌더링
    const renderAdminMelpikScreenshots = () => {
      const projectTitle = project.title.toLowerCase();
      if (projectTitle.includes('melpik') && projectTitle.includes('관리자')) {
        return (
          <div style={{ marginBottom: '20px' }}>
            <h4
              style={styles.sectionTitle}
              data-modal-section-title-id={
                styles.sectionTitle['--modal-section-title-id']
              }
            >
              🛠️ 관리자 화면설계
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '15px',
                marginBottom: '15px',
              }}
            >
              {/* 전체 메뉴리스트 */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/admin-melpik/Adobe Express - 전체 메뉴리스트.gif"
                  alt="전체 메뉴리스트"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  📋 전체 메뉴리스트
                </p>
              </div>

              {/* 회원 관리리스트 */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/admin-melpik/Adobe Express - 회원 관리리스트.gif"
                  alt="회원 관리리스트"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  👥 회원 관리리스트
                </p>
              </div>

              {/* 제품 관리리스트 */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/admin-melpik/Adobe Express - 제품 관리리스트.gif"
                  alt="제품 관리리스트"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  🛍️ 제품 관리리스트
                </p>
              </div>

              {/* 설정 관리리스트 */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/admin-melpik/Adobe Express - 설정 관리리스트.gif"
                  alt="설정 관리리스트"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  ⚙️ 설정 관리리스트
                </p>
              </div>

              {/* 브랜드_이용권 관리리스트 */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/admin-melpik/Adobe Express - 브랜드_이용권 관리리스트.gif"
                  alt="브랜드_이용권 관리리스트"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  🎫 브랜드_이용권 관리
                </p>
              </div>

              {/* 대여_구매내역 관리리스트 */}
              <div
                style={{
                  border: '2px solid #a78bfa',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/src/assets/admin-melpik/Adobe Express - 대여_구매내역 관리리스트.gif"
                  alt="대여_구매내역 관리리스트"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid #374151',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                  }}
                >
                  📊 대여_구매내역 관리
                </p>
              </div>
            </div>
            <div
              style={{
                backgroundColor: '#1e293b',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #a78bfa',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#cbd5e1',
                  lineHeight: 1.4,
                }}
              >
                💡 <strong>Melpik 관리자</strong>는 쇼핑몰 운영을 위한 종합적인
                관리 시스템으로, 회원 관리, 제품 관리, 설정 관리, 이용권 관리,
                거래 내역 관리 등의 기능을 제공합니다.
              </p>
            </div>
          </div>
        );
      }
      return null;
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
          <div style={{ marginBottom: '15px' }}>
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
          <div style={{ marginBottom: '15px' }}>
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
          <div style={{ marginBottom: '15px' }}>
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
          <div style={{ marginBottom: '15px', textAlign: 'center' }}>
            <div
              style={{
                display: 'flex',
                gap: '8px',
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
                    padding: '8px 16px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '14px',
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
                    padding: '8px 16px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '14px',
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

          {/* Melpik 관리자 페이지인 경우 관리자 화면설계 이미지 섹션 렌더링 */}
          {renderAdminMelpikScreenshots()}

          {/* Melpik 사용자 웹 & 하이브리드 앱인 경우 화면설계 이미지 섹션 렌더링 (관리자 제외) */}
          {renderMelpikUIScreenshots()}

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
