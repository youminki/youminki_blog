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

    // ESC 키로 모달 닫기 및 포커스 관리
    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscapeKey);

        // 모달이 열릴 때 첫 번째 포커스 가능한 요소에 포커스
        const firstFocusableElement = modalContainerRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;

        if (firstFocusableElement) {
          firstFocusableElement.focus();
        }
      }

      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }, [isOpen, onClose]);

    // ESC 키로 모달 닫기 및 포커스 관리
    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscapeKey);

        // 모달이 열릴 때 첫 번째 포커스 가능한 요소에 포커스
        const firstFocusableElement = modalContainerRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;

        if (firstFocusableElement) {
          firstFocusableElement.focus();
        }
      }

      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }, [isOpen, onClose]);

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
                  src="/melpik/홈페이지_모바일UI.gif"
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
                  src="/melpik/이용권결제_모바일UI.gif"
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
                  src="/melpik/제품결제_모바일UI.gif"
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
                  src="/melpik/페이지네이션_모바일UI.gif"
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
                  src="/melpik/Web/홈_웹UI.gif"
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
                  src="/melpik/Web/홈상세_웹UI.gif"
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
                  src="/melpik/Web/브랜드_웹UI.gif"
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
                  src="/melpik/Web/다이어리_웹UI.gif"
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
                  src="/melpik/Web/이용내역_이용권_웹UI.gif"
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
                  src="/melpik/Web/결제수단_내옷장_웹UI.gif"
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
                  src="/melpik/Web/고객센터_웹UI.gif"
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
                  src="/melpik/Web/내정보_웹UI.gif"
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

    // ADHD 프로젝트인 경우 mutsideout 이미지들 렌더링
    const renderADHDUIScreenshots = () => {
      const projectTitle = project.title.toLowerCase();
      if (
        projectTitle.includes('adhd') ||
        projectTitle.includes('감정') ||
        projectTitle.includes('집중')
      ) {
        return (
          <div style={{ marginBottom: '20px' }}>
            <h4
              style={styles.sectionTitle}
              data-modal-section-title-id={
                styles.sectionTitle['--modal-section-title-id']
              }
            >
              🎨 ADHD 서비스 UI 화면
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '15px',
                marginBottom: '15px',
              }}
            >
              {/* 회원가입 화면 */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={project.images?.[0] || ''}
                  alt="ADHD 서비스 - 회원가입 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  📝 회원가입
                </p>
              </div>

              {/* 플래너(투두) 화면 */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={project.images?.[1] || ''}
                  alt="ADHD 서비스 - 플래너(투두) 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  📋 플래너(투두)
                </p>
              </div>

              {/* 실시간집중세션 화면 */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={project.images?.[2] || ''}
                  alt="ADHD 서비스 - 실시간집중세션 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  🎯 실시간집중세션
                </p>
              </div>

              {/* 설문조사 화면 */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={project.images?.[3] || ''}
                  alt="ADHD 서비스 - 설문조사 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  📊 설문조사
                </p>
              </div>

              {/* 뽀모도로 화면 */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={project.images?.[4] || ''}
                  alt="ADHD 서비스 - 뽀모도로 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  ⏰ 뽀모도로
                </p>
              </div>

              {/* 메인페이지 화면 */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={project.images?.[5] || ''}
                  alt="ADHD 서비스 - 메인페이지 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  🏠 메인페이지
                </p>
              </div>

              {/* 로그인 화면 */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={project.images?.[6] || ''}
                  alt="ADHD 서비스 - 로그인 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  🔐 로그인
                </p>
              </div>

              {/* 감정일기 화면 */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={project.images?.[7] || ''}
                  alt="ADHD 서비스 - 감정일기 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  💝 감정일기
                </p>
              </div>
            </div>
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid var(--accent-color)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  lineHeight: 1.4,
                }}
              >
                💡 <strong>Mutsideout</strong>는 ADHD 사용자를 위한 감정 기록 및
                집중 보조 웹 서비스로, 감정 조절과 집중에 어려움을 겪는
                사용자들이 자신의 상태를 시각적으로 기록하고, 뽀모도로 방식의
                타이머 및 플래너 기능을 통해 일상 루틴을 관리할 수 있도록
                돕습니다.
              </p>
            </div>
          </div>
        );
      }
      return null;
    };

    // 클로버 프로젝트인 경우 Clover 이미지들 렌더링
    const renderCloverUIScreenshots = () => {
      const projectTitle = project.title.toLowerCase();
      if (projectTitle.includes('클로버') || projectTitle.includes('clover')) {
        return (
          <div style={{ marginBottom: '20px' }}>
            <h4
              style={styles.sectionTitle}
              data-modal-section-title-id={
                styles.sectionTitle['--modal-section-title-id']
              }
            >
              🎨 클로버 전시회 웹사이트 UI 화면
            </h4>
            {/* 웹 화면들 - 2열 정렬 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '15px',
                marginBottom: '15px',
              }}
            >
              {/* ABOUT 웹 화면 */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={project.images?.[1] || ''}
                  alt="클로버 전시회 - ABOUT 웹 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  🌐 ABOUT 웹 화면
                </p>
              </div>

              {/* Projects 웹 화면 */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={project.images?.[2] || ''}
                  alt="클로버 전시회 - Projects 웹 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  🎭 Projects 웹 화면
                </p>
              </div>
            </div>

            {/* 모바일 화면들 - 2열 정렬 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '15px',
                marginBottom: '15px',
              }}
            >
              {/* ABOUT 모바일 화면 1 */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={project.images?.[3] || ''}
                  alt="클로버 전시회 - ABOUT 모바일 화면 1"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  📱 ABOUT 모바일 1
                </p>
              </div>

              {/* ABOUT 모바일 화면 2 */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={project.images?.[4] || ''}
                  alt="클로버 전시회 - ABOUT 모바일 화면 2"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  📱 ABOUT 모바일 2
                </p>
              </div>
            </div>

            {/* 전체 모바일 화면 - 2열 크기에 맞춰 정중앙 배치 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '15px',
              }}
            >
              {/* 전체 모바일 화면 (정중앙) */}
              <div
                style={{
                  border: '2px solid var(--accent-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  textAlign: 'center',
                  width: isMobile ? '100%' : 'calc(50% - 7.5px)', // 2열 크기에 맞춤
                  maxWidth: '400px', // 최대 너비 제한
                }}
              >
                <img
                  src={project.images?.[0] || ''}
                  alt="클로버 전시회 - 전체 모바일 화면"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                  }}
                />
                <p
                  style={{
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  📱 전체 모바일 화면
                </p>
              </div>
            </div>
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid var(--accent-color)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  lineHeight: 1.4,
                }}
              >
                💡 <strong>클로버 전시회</strong>는 디자인 전공 학생들의 작품을
                소개하는 웹사이트로, 전시 기획 의도와 각 팀의 디자인 철학을
                효과적으로 전달합니다. 모바일과 웹 환경을 모두 고려한 반응형
                디자인으로 구현되었습니다.
              </p>
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
                  src="/admin-melpik/관리자_전체 메뉴리스트.gif"
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
                  src="/admin-melpik/관리자_회원 관리리스트.gif"
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
                  src="/admin-melpik/관리자_제품 관리리스트.gif"
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
                  src="/admin-melpik/관리자_설정 관리리스트.gif"
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
                  src="/admin-melpik/관리자_브랜드_이용권 관리리스트.gif"
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
                  src="/admin-melpik/관리자_대여_구매내역 관리리스트.gif"
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
          padding: isMobile ? '0.5rem' : '1rem',
        }}
        onClick={handleBackdropClick}
      >
        <div
          ref={modalContainerRef}
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: isMobile ? '0.5rem' : '1rem',
            maxWidth: '800px',
            width: '100%',
            maxHeight: isMobile ? '98vh' : '95vh',
            overflow: 'auto',
            position: 'relative',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          }}
          className="custom-scrollbar"
          onClick={e => e.stopPropagation()}
        >
          {/* 모달 헤더 */}
          <div
            style={{
              padding: isMobile
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
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
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
                  e.currentTarget.style.backgroundColor = 'var(--accent-color)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'var(--accent-color)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
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
              padding: isMobile ? '0.5rem' : '0.75rem',
              maxHeight: isMobile ? '80vh' : '75vh',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--accent-color) var(--bg-secondary)',
            }}
            className="custom-scrollbar"
          >
            {/* 프로젝트 이미지 */}
            <div style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  height: 'auto',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border-color)',
                }}
              />
            </div>

            {/* 프로젝트 설명 */}
            <div style={{ marginBottom: '0.75rem' }}>
              <p
                style={{
                  color: 'var(--text-primary)',
                  lineHeight: '1.4',
                  fontSize: '1rem',
                  marginBottom: '0.5rem',
                }}
              >
                {project.description}
              </p>
            </div>

            {/* 사용 기술 */}
            <div style={{ marginBottom: '0.75rem' }}>
              <h4
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem',
                }}
              >
                사용 기술 ({project.technologies.length}개)
              </h4>
              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                }}
              >
                {project.technologies.map((tech, index) => {
                  // 각 기술별로 다른 색상 적용
                  const getTechColors = () => {
                    const colorPalette = [
                      { bg: '#3b82f6', text: 'white', border: '#3b82f6' }, // 파란색
                      { bg: '#06b6d4', text: 'white', border: '#06b6d6' }, // 청록색
                      { bg: '#8b5cf6', text: 'white', border: '#8b5cf6' }, // 보라색
                      { bg: '#10b981', text: 'white', border: '#10b981' }, // 초록색
                      { bg: '#f59e0b', text: 'white', border: '#f59e0b' }, // 주황색
                      { bg: '#ef4444', text: 'white', border: '#ef4444' }, // 빨간색
                      { bg: '#ec4899', text: 'white', border: '#ec4899' }, // 분홍색
                      { bg: '#84cc16', text: 'white', border: '#84cc16' }, // 연두색
                    ];

                    return (
                      colorPalette[index % colorPalette.length] ||
                      colorPalette[0]
                    );
                  };

                  const colors = getTechColors();

                  return (
                    <span
                      key={index}
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.text,
                        padding: '0.5rem 1rem',
                        borderRadius: '1.5rem',
                        fontSize: '0.875rem',
                        border: `1px solid ${colors.border}`,
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow =
                          '0 4px 8px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* 주요 기능 */}
            <div style={{ marginBottom: '0.75rem' }}>
              <h4
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem',
                }}
              >
                주요 기능 ({project.features.length}개)
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {project.features.map((feature, index) => (
                  <li
                    key={index}
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
                        marginTop: '0.5rem',
                        fontSize: '1.5rem',
                        lineHeight: 1,
                      }}
                    >
                      •
                    </span>
                    <span
                      style={{
                        flex: 1,
                        lineHeight: '1.7',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 프로젝트 링크 */}
            <div style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
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
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      border: '1px solid var(--border-color)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor =
                        'var(--accent-color)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = 'var(--accent-color)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor =
                        'var(--bg-secondary)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
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
                      backgroundColor: 'var(--accent-color)',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow =
                        '0 4px 12px var(--shadow-medium)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
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

            {/* ADHD 프로젝트인 경우 mutsideout 이미지들 렌더링 */}
            {renderADHDUIScreenshots()}

            {/* 클로버 프로젝트인 경우 Clover 이미지들 렌더링 */}
            {renderCloverUIScreenshots()}
          </div>
        </div>
      </div>
    );
  }
);

ProjectModal.displayName = 'ProjectModal';

export default ProjectModal;
