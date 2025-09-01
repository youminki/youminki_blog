export interface Experience {
  title: string;
  description: string;
}

export const EXPERIENCES: Experience[] = [
  {
    title: 'Full-stack web development experience:',
    description:
      'React + TypeScript + Vite 기술 스택을 기반으로 한 풀스택 웹 개발 경험, Melpik 의류 대여 서비스의 전체 생태계 구현 경험 (프론트엔드 아키텍처 설계부터 배포까지).',
  },
  {
    title: 'Code quality and development efficiency:',
    description:
      '코드 품질 및 개발 효율성 중점, TypeScript strict 모드, ESLint + Prettier + Husky를 통한 자동화된 코드 품질 관리, Jest + React Testing Library를 통한 테스트 커버리지 확보, Storybook을 활용한 컴포넌트 문서화.',
  },
  {
    title: 'User experience optimization:',
    description:
      '사용자 경험 최적화에 대한 깊은 이해, 반응형 디자인, 모바일 최적화, 접근성(a11y), 성능 모니터링 포함 UX/UI 설계 및 구현 담당, Styled Components 기반 디자인 시스템 구축.',
  },
  {
    title: 'Complex business logic implementation:',
    description:
      '복잡한 비즈니스 로직 구현 전문성, 사용자 인증, 상품 관리, 렌탈 서비스, 결제, 스케줄링 시스템 등 핵심 기능 구현, 관리자 대시보드 데이터 관리 및 모니터링 시스템 구축.',
  },
  {
    title: 'Continuous learning and technology adoption:',
    description:
      '지속적인 학습 및 기술 적용 중요, React 18/19 최신 기능, Vite 빌드 도구, 모던 TypeScript 패턴, React Query, React Hook Form 적극 도입, Git 기반 버전 관리 및 CI/CD 파이프라인을 통한 안정적인 배포 프로세스 구축.',
  },
];

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
  achievements?: string[];
}

export interface WorkExperience {
  company: string;
  position: string;
  period: string;
  type: 'fulltime' | 'freelance' | 'internship';
  description?: string;
  achievements?: string[];
}

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    company: '리프트콤마',
    position: '프론트엔드 개발자',
    period: '2024.08 ~ 재직중',
    type: 'freelance',
    description: '프리랜서로 프론트엔드 개발 업무 담당',
    achievements: [
      'React 기반 웹 애플리케이션 개발',
      'TypeScript를 활용한 타입 안전성 확보',
      '반응형 웹 디자인 구현',
    ],
  },
];

export const EDUCATION_DATA: Education[] = [
  {
    institution: '명지대학교',
    degree: '컴퓨터공학과',
    period: '2019.03 ~ 2025.08 (4년제, 졸업)',
    description: '컴퓨터공학 전공으로 프로그래밍 및 웹 개발 스킬을 학습',
    achievements: [
      '웹 개발 동아리 활동',
      '해커톤 다수 참가',
      '프론트엔드 개발 프로젝트 경험',
    ],
  },
];

export interface CareerGoal {
  shortTerm: string[];
  longTerm: string[];
}

export const CAREER_GOALS: CareerGoal = {
  shortTerm: [
    '실무 경험을 통한 개발 역량 강화',
    '팀 협업 능력 향상',
    '사용자 중심의 서비스 개발 경험',
  ],
  longTerm: [
    '풀스택 개발자로 성장',
    '기술 리드 역할 수행',
    '사용자에게 가치 있는 서비스 구축',
  ],
};
