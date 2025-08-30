// styleUtils.ts - CSS 충돌 방지 유틸리티

// 스타일 객체 타입 정의
export interface ModalStyles {
  overlay: React.CSSProperties & { '--modal-id': string };
  container: React.CSSProperties & { '--modal-container-id': string };
  header: React.CSSProperties & { '--modal-header-id': string };
  title: React.CSSProperties & { '--modal-title-id': string };
  projectTitle: React.CSSProperties & { '--modal-project-title-id': string };
  projectDescription: React.CSSProperties & {
    '--modal-project-desc-id': string;
  };
  sectionTitle: React.CSSProperties & { '--modal-section-title-id': string };
  techContainer: React.CSSProperties & { '--modal-tech-container-id': string };
  techTag: React.CSSProperties & { '--modal-tech-tag-id': string };
  featuresList: React.CSSProperties & { '--modal-features-list-id': string };
  featureItem: React.CSSProperties & { '--modal-feature-item-id': string };
  buttonContainer: React.CSSProperties & {
    '--modal-button-container-id': string;
  };
  closeButton: React.CSSProperties & { '--modal-close-button-id': string };
}

// 스크롤바 관련 타입 정의
export interface ScrollbarStyles {
  width: string;
  trackColor: string;
  thumbColor: string;
  thumbHoverColor: string;
  borderRadius: string;
  animation: string;
}

// 스타일 충돌 방지를 위한 고유 클래스명 생성
export const generateUniqueClassName = (
  prefix: string,
  componentName: string
): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}-${componentName}-${timestamp}-${random}`;
};

// 스크롤바 스타일 생성 함수 (다크모드 전용)
export const createScrollbarStyles = (
  isMobile: boolean = false
): ScrollbarStyles => {
  if (isMobile) {
    return {
      width: '4px',
      trackColor: '#0f172a',
      thumbColor: 'rgba(167, 139, 250, 0.5)',
      thumbHoverColor: 'rgba(167, 139, 250, 0.7)',
      borderRadius: '2px',
      animation: 'scrollbar-fade-in 0.3s ease',
    };
  }

  return {
    width: '8px',
    trackColor: '#0f172a',
    thumbColor: '#a78bfa',
    thumbHoverColor: '#8b5cf6',
    borderRadius: '4px',
    animation: 'scrollbar-fade-in 0.3s ease',
  };
};

// CSS-in-JS 스타일 객체 생성 (충돌 방지)
export const createScopedStyles = (componentName: string): ModalStyles => {
  const uniqueId = generateUniqueClassName('scoped', componentName);

  return {
    // 모달 오버레이
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      padding: '30px',
      // 고유 식별자 추가
      '--modal-id': uniqueId,
    },

    // 모달 컨테이너
    container: {
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      padding: '30px',
      borderRadius: '12px',
      maxWidth: '600px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto',
      border: '2px solid #a78bfa',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      // 고유 식별자 추가
      '--modal-container-id': uniqueId,
      // 스크롤바 관련 스타일
      scrollbarWidth: 'thin',
      scrollbarColor: '#a78bfa #0f172a',
    },

    // 모달 헤더
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      // 고유 식별자 추가
      '--modal-header-id': uniqueId,
    },

    // 모달 제목
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#a78bfa',
      margin: 0,
      // 고유 식별자 추가
      '--modal-title-id': uniqueId,
    },

    // 프로젝트 제목
    projectTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '15px',
      marginTop: 0,
      // 고유 식별자 추가
      '--modal-project-title-id': uniqueId,
    },

    // 프로젝트 설명
    projectDescription: {
      fontSize: '16px',
      lineHeight: 1.6,
      color: '#cbd5e1',
      margin: 0,
      // 고유 식별자 추가
      '--modal-project-desc-id': uniqueId,
    },

    // 섹션 제목
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#a78bfa',
      marginTop: 0,
      // 고유 식별자 추가
      '--modal-section-title-id': uniqueId,
    },

    // 기술 태그 컨테이너
    techContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      // 고유 식별자 추가
      '--modal-tech-container-id': uniqueId,
    },

    // 기술 태그
    techTag: {
      backgroundColor: '#1e293b',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      border: '1px solid #a78bfa',
      color: '#f8fafc',
      // 고유 식별자 추가
      '--modal-tech-tag-id': uniqueId,
    },

    // 기능 리스트
    featuresList: {
      paddingLeft: '20px',
      margin: 0,
      // 고유 식별자 추가
      '--modal-features-list-id': uniqueId,
    },

    // 기능 아이템
    featureItem: {
      marginBottom: '8px',
      color: '#cbd5e1',
      // 고유 식별자 추가
      '--modal-feature-item-id': uniqueId,
    },

    // 버튼 컨테이너
    buttonContainer: {
      textAlign: 'center',
      // 고유 식별자 추가
      '--modal-button-container-id': uniqueId,
    },

    // 닫기 버튼
    closeButton: {
      backgroundColor: '#a78bfa',
      color: '#f8fafc',
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      // 고유 식별자 추가
      '--modal-close-button-id': uniqueId,
    },
  };
};

// 스타일 병합 함수 (충돌 방지)
export const mergeStyles = (...styleObjects: Record<string, unknown>[]) => {
  return styleObjects.reduce(
    (merged, current) => {
      Object.keys(current).forEach(key => {
        if (
          merged[key] &&
          typeof merged[key] === 'object' &&
          typeof current[key] === 'object'
        ) {
          merged[key] = mergeStyles(
            merged[key] as Record<string, unknown>,
            current[key] as Record<string, unknown>
          );
        } else {
          merged[key] = current[key];
        }
      });
      return merged;
    },
    {} as Record<string, unknown>
  );
};

// 반응형 스타일 생성 (다크모드 전용)
export const createResponsiveModalStyles = (isMobile: boolean): ModalStyles => {
  const baseStyles = createScopedStyles('modal');

  if (isMobile) {
    return {
      ...baseStyles,
      container: {
        ...baseStyles.container,
        width: '95%',
        padding: '20px',
        // 모바일용 스크롤바 스타일
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(167, 139, 250, 0.5) #0f172a',
      },
      title: {
        ...baseStyles.title,
        fontSize: '24px',
      },
      projectTitle: {
        ...baseStyles.projectTitle,
        fontSize: '20px',
      },
    };
  }

  return baseStyles;
};

// 스크롤바 스타일 적용 함수
export const applyScrollbarStyles = (
  element: HTMLElement,
  scrollbarStyles: ScrollbarStyles
) => {
  if (element) {
    // CSS 변수로 스크롤바 스타일 적용
    element.style.setProperty('--scrollbar-width', scrollbarStyles.width);
    element.style.setProperty(
      '--scrollbar-track-color',
      scrollbarStyles.trackColor
    );
    element.style.setProperty(
      '--scrollbar-thumb-color',
      scrollbarStyles.thumbColor
    );
    element.style.setProperty(
      '--scrollbar-thumb-hover-color',
      scrollbarStyles.thumbHoverColor
    );
    element.style.setProperty(
      '--scrollbar-border-radius',
      scrollbarStyles.borderRadius
    );
    element.style.setProperty(
      '--scrollbar-animation',
      scrollbarStyles.animation
    );
  }
};

// 스크롤바 애니메이션 제어 함수
export const toggleScrollbarAnimation = (
  element: HTMLElement,
  enable: boolean
) => {
  if (element) {
    if (enable) {
      element.style.animation = 'scrollbar-fade-in 0.3s ease';
    } else {
      element.style.animation = 'none';
    }
  }
};

// 스크롤바 가시성 제어 함수
export const setScrollbarVisibility = (
  element: HTMLElement,
  visible: boolean
) => {
  if (element) {
    if (visible) {
      element.style.scrollbarWidth = 'thin';
    } else {
      element.style.scrollbarWidth = 'none';
    }
  }
};

// 스크롤바 색상 테마 변경 함수 (다크모드 전용)
export const changeScrollbarTheme = (
  element: HTMLElement,
  primaryColor: string = '#a78bfa',
  secondaryColor: string = '#0f172a'
) => {
  if (element) {
    element.style.setProperty('--scrollbar-thumb-color', primaryColor);
    element.style.setProperty('--scrollbar-track-color', secondaryColor);
  }
};

// 스타일 충돌 검사 함수
export const checkStyleConflicts = (styles: ModalStyles): string[] => {
  const conflicts: string[] = [];

  // z-index 충돌 검사
  const zIndexValues = Object.values(styles)
    .filter(style => typeof style === 'object' && style.zIndex)
    .map(style => style.zIndex);

  const uniqueZIndexes = new Set(zIndexValues);
  if (zIndexValues.length !== uniqueZIndexes.size) {
    conflicts.push('z-index 충돌이 감지되었습니다.');
  }

  // 기타 충돌 검사 로직 추가 가능

  return conflicts;
};
