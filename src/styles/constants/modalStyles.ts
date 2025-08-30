// modalStyles.ts - 모달 스타일 상수 정의

export const MODAL_STYLES = {
  // z-index 상수
  Z_INDEX: {
    MODAL_OVERLAY: 99999,
    MODAL_CONTENT: 100000,
    MODAL_HEADER: 100001,
  },

  // 색상 상수
  COLORS: {
    PRIMARY: '#4f46e5',
    PRIMARY_HOVER: '#3730a3',
    BACKGROUND: '#1f2937',
    BACKGROUND_SECONDARY: '#374151',
    TEXT_PRIMARY: '#ffffff',
    TEXT_SECONDARY: '#d1d5db',
    BORDER: '#4f46e5',
    OVERLAY: 'rgba(0, 0, 0, 0.9)',
  },

  // 크기 상수
  SIZES: {
    BORDER_RADIUS: '12px',
    PADDING: '30px',
    PADDING_MOBILE: '20px',
    MAX_WIDTH: '600px',
    MAX_HEIGHT: '80vh',
    GAP: '8px',
  },

  // 폰트 상수
  TYPOGRAPHY: {
    TITLE: '28px',
    TITLE_MOBILE: '24px',
    SUBTITLE: '24px',
    SUBTITLE_MOBILE: '20px',
    SECTION: '18px',
    BODY: '16px',
    SMALL: '14px',
  },

  // 애니메이션 상수
  ANIMATIONS: {
    TRANSITION: '0.2s',
    BOX_SHADOW: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
  },
} as const;

// 스타일 객체 생성 함수
export const createModalStyles = () => ({
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: MODAL_STYLES.COLORS.OVERLAY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: MODAL_STYLES.Z_INDEX.MODAL_OVERLAY,
    padding: MODAL_STYLES.SIZES.PADDING,
  },

  container: {
    backgroundColor: MODAL_STYLES.COLORS.BACKGROUND,
    color: MODAL_STYLES.COLORS.TEXT_PRIMARY,
    padding: MODAL_STYLES.SIZES.PADDING,
    borderRadius: MODAL_STYLES.SIZES.BORDER_RADIUS,
    maxWidth: MODAL_STYLES.SIZES.MAX_WIDTH,
    width: '90%',
    maxHeight: MODAL_STYLES.SIZES.MAX_HEIGHT,
    overflow: 'auto' as const,
    border: `2px solid ${MODAL_STYLES.COLORS.BORDER}`,
    boxShadow: MODAL_STYLES.ANIMATIONS.BOX_SHADOW,
  },

  title: {
    fontSize: MODAL_STYLES.TYPOGRAPHY.TITLE,
    fontWeight: 'bold' as const,
    color: MODAL_STYLES.COLORS.PRIMARY,
    margin: 0,
    textAlign: 'center' as const,
  },

  button: {
    backgroundColor: MODAL_STYLES.COLORS.PRIMARY,
    color: MODAL_STYLES.COLORS.TEXT_PRIMARY,
    padding: '12px 24px',
    borderRadius: MODAL_STYLES.SIZES.BORDER_RADIUS,
    border: 'none',
    fontSize: MODAL_STYLES.TYPOGRAPHY.BODY,
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    transition: `background-color ${MODAL_STYLES.ANIMATIONS.TRANSITION}`,
  },
});

// 반응형 스타일 생성 함수
export const createResponsiveStyles = (isMobile: boolean) => ({
  container: {
    width: isMobile ? '95%' : '90%',
    padding: isMobile
      ? MODAL_STYLES.SIZES.PADDING_MOBILE
      : MODAL_STYLES.SIZES.PADDING,
  },

  title: {
    fontSize: isMobile
      ? MODAL_STYLES.TYPOGRAPHY.TITLE_MOBILE
      : MODAL_STYLES.TYPOGRAPHY.TITLE,
  },

  subtitle: {
    fontSize: isMobile
      ? MODAL_STYLES.TYPOGRAPHY.SUBTITLE_MOBILE
      : MODAL_STYLES.TYPOGRAPHY.SUBTITLE,
  },
});
