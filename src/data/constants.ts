// 애플리케이션 설정 상수
export const APP_CONFIG = {
  title: 'YouMinKi Blog',
  description: '프론트엔드 개발자 유민기의 포트폴리오',
  version: '1.0.0',
  author: '유민기',
  keywords: ['React', 'TypeScript', 'Frontend', 'Developer', 'Portfolio'],
} as const;

// 테마 관련 상수
export const THEME_CONFIG = {
  defaultTheme: 'dark',
  storageKey: 'theme-preference',
  animationDuration: 200,
} as const;

// 색상 시스템
export const COLORS = {
  primary: '#3b82f6',
  secondary: '#6366f1',
  accent: '#f59e0b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

// 레이아웃 상수
export const LAYOUT = {
  maxWidth: '1200px',
  headerHeight: '64px',
  sidebarWidth: '280px',
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// 애니메이션 상수
export const ANIMATIONS = {
  duration: {
    fast: 150,
    normal: 200,
    slow: 300,
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// 소셜 미디어 플랫폼
export const SOCIAL_PLATFORMS = {
  github: {
    name: 'GitHub',
    baseUrl: 'https://github.com',
    color: '#333',
  },
  linkedin: {
    name: 'LinkedIn',
    baseUrl: 'https://linkedin.com/in',
    color: '#0077b5',
  },
  email: {
    name: 'Email',
    baseUrl: 'mailto:',
    color: '#ea4335',
  },
} as const;

// 기술 스킬 관련 상수
export const SKILL_LEVELS = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
  EXPERT: 4,
} as const;

// 프로젝트 상태
export const PROJECT_STATUS = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  MAINTENANCE: 'maintenance',
  ARCHIVED: 'archived',
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
  LOADING_FAILED: '데이터를 불러오는데 실패했습니다.',
  INVALID_INPUT: '잘못된 입력값입니다.',
} as const;

// 성공 메시지
export const SUCCESS_MESSAGES = {
  CONTACT_SENT: '메시지가 성공적으로 전송되었습니다.',
  DATA_LOADED: '데이터를 성공적으로 불러왔습니다.',
  OPERATION_SUCCESS: '작업이 성공적으로 완료되었습니다.',
} as const;
