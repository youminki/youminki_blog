import type { Project } from '../types';
import projectImg1 from '../assets/projectImg1.jpg';
import projectImg2 from '../assets/projectImg2.jpg';
import projectImg3 from '../assets/projectImg3.jpg';
import projectImg4 from '../assets/projectImg4.jpg';

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: 'Melpik 사용자 웹 & 하이브리드 앱',
    description:
      '서비스 확장성과 접근성을 고려해 웹앱 + 하이브리드 앱(iOS/Android) 형태로 제작되었으며, Melpik은 사용자 맞춤형 패션 추천과 개인 옷장 기능을 중심으로 한 웹 서비스입니다. 관리자 페이지를 별도로 구축하여 상품/유저/주문/통계 관리가 가능한 통합 운영 시스템도 구현하였습니다.',
    technologies: [
      'React 19',
      'TypeScript',
      'React Native',
      'Expo',
      'WebView',
      'Styled Components',
      'React Query',
      'Vite',
      'Android Studio',
      'Xcode',
    ],
    image: projectImg1,
    githubUrl: 'https://github.com/youminki/Me1pik',
    liveUrl: 'https://me1pik.com/landing',
    features: [
      '사용자 맞춤형 패션 추천 시스템',
      '개인 옷장 및 찜하기 기능',
      '웹앱 + 하이브리드 앱 동시 지원',
      '관리자 통합 운영 시스템',
      'React Query 기반 상태 관리',
      'Vite 도입으로 로딩 속도 개선',
      '모바일 UX 최적화',
      '앱스토어 배포 완료',
      '카카오 지도 연동',
      'SEO 대응 및 공유 기능',
    ],
  },
  {
    id: 2,
    title: 'Melpik 관리자 페이지',
    description:
      'Melpik 관리자 페이지는 사용자 웹과 하이브리드 앱에서 발생하는 주문, 상품, 유저 데이터를 통합 관리할 수 있는 내부 운영 시스템입니다. 서비스 운영자들이 상품 등록/수정, 주문 처리, 통계 확인, 유저 정보 관리 등을 직관적으로 수행할 수 있도록 설계되었습니다.',
    technologies: [
      'React 19',
      'TypeScript',
      'Styled Components',
      'React Query',
      'Chart.js',
      'ApexCharts',
      'Axios',
      'Context API',
    ],
    image: projectImg2,
    githubUrl: 'https://github.com/youminki/Me1pik',
    liveUrl: 'https://admin-me1pik.com',
    features: [
      '상품 관리 (Product CRUD)',
      '주문/결제 관리 시스템',
      '유저 관리 및 권한 관리',
      '통계/대시보드 시각화',
      '코드 스플리팅 + Lazy Loading',
      'React Query 기반 상태 관리',
      '에러 처리 & 사용자 피드백 시스템',
      '모바일 대응 반응형 구조',
    ],
  },
  {
    id: 3,
    title: 'ADHD 사용자를 위한 감정 기록 및 집중 보조 웹 서비스',
    description:
      '감정 조절과 집중에 어려움을 겪는 사용자들이 자신의 상태를 시각적으로 기록하고, 뽀모도로 방식의 타이머 및 플래너 기능을 통해 일상 루틴을 관리할 수 있도록 돕는 웹 플랫폼을 제작했습니다.',
    technologies: [
      'React',
      'Recoil',
      'Styled Components',
      'React Router',
      'Recharts',
      'Axios',
      'Git',
      'Figma',
    ],
    image: projectImg3,
    githubUrl: 'https://github.com/mju-likelion/12th-hackathon-team2-web',
    liveUrl: 'https://lucent-chaja-aa9610.netlify.app/',
    features: [
      '감정 기록 및 시각화',
      '뽀모도로 타이머',
      '일정 플래너',
      '분석 리포트',
      '컴포넌트 재사용성 극대화',
      '성능 최적화',
      '반응형 디자인',
      '팀 협업 워크플로우',
    ],
  },
  {
    id: 4,
    title: '클로버 전시회 초대장 - In a row',
    description:
      "'In a row'는 클로버 전시회를 소개하고, 각 팀의 디자인 철학과 이야기를 전달하기 위한 웹 초대장입니다. React 기반으로 개발된 이 웹사이트는 전시 기획 의도 설명, 팀 프로젝트 소개, 팟캐스트/도슨트 QR 연동, 그리고 모바일 UX 최적화에 중점을 두고 구현되었습니다.",
    technologies: ['React', 'JavaScript', 'CSS Modules', 'Figma', 'GitHub'],
    image: projectImg4,
    githubUrl: 'https://github.com/youminki/youminki_blog',
    liveUrl: 'https://youminki-blog.vercel.app',
    features: [
      '전시 소개 및 디자인 컨셉 전달',
      '팀별 도슨트/팟캐스트 뷰어',
      '팟캐스트 상세 안내 및 QR 연동',
      '모바일 UX 최적화',
      '스크롤 인터랙션 및 스토리텔링',
      '반응형 디자인',
    ],
  },
];
