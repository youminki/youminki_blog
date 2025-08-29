import { useState } from 'react';
import { MdRocketLaunch, MdClose, MdLink } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import projectImg1 from '../assets/projectImg1.jpg';
import projectImg2 from '../assets/projectImg2.jpg';
import projectImg3 from '../assets/projectImg3.jpg';
import projectImg4 from '../assets/projectImg4.jpg';
import melpikUI1 from '../assets/MelpikUI_1.gif';
import melpikUI2 from '../assets/MelpikUI_2.gif';
import melpikUI3 from '../assets/MelpikUI_3.gif';
import melpikUI4 from '../assets/MelpikUI_4.gif';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  image: string; // image로 다시 변경
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = [
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
      githubUrl: 'https://github.com/youminki/melpik',
      liveUrl: 'https://me1pik.com/melpik',
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
      githubUrl: 'https://github.com/youminki/melpik-admin',
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
      githubUrl: 'https://github.com/youminki/adhd-emotion-diary',
      liveUrl: 'https://adhd-emotion-diary.vercel.app',
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

  const openModal = (project: Project) => {
    console.log('모달 열기 시도:', project.title);
    setSelectedProject(project);
    setIsModalOpen(true);
    console.log('모달 상태 업데이트 후:', {
      isModalOpen: true,
      selectedProject: project,
    });
  };

  const closeModal = () => {
    console.log('모달 닫기 시도');
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // 디버깅을 위한 상태 출력
  console.log('현재 모달 상태:', { isModalOpen, selectedProject });

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
        <MdRocketLaunch className="text-[var(--accent-color)] text-2xl" />
        Projects
      </h2>

      {/* Project Cards Grid - 반응형 그리드 */}
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="projects-grid">
          {projects.map(project => (
            <div
              key={project.id}
              onClick={() => {
                console.log('프로젝트 클릭됨:', project.title);
                openModal(project);
              }}
              className="project-card bg-gray-800 rounded-xl border border-gray-700 hover:border-transparent transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl overflow-hidden relative group rainbow-border"
              style={{
                borderRadius: '1rem',
                padding: '1rem',
              }}
            >
              {/* Project Image - 고정 높이 200px */}
              <div
                className="w-full h-50 relative overflow-hidden p-3"
                style={{ height: '300px' }}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400 text-sm">
                    이미지가 없습니다
                  </div>
                )}
              </div>

              {/* Project Info Below Image - 별도 높이 설정 */}
              <div
                className="bg-gray-800 border-t border-gray-700"
                style={{ minHeight: '140px', padding: '1rem' }}
              >
                {/* Project Title */}
                <h3 className="text-lg font-bold text-white mb-4 px-6 pt-6 line-clamp-1">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-gray-300 text-sm mb-5 px-6 line-clamp-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies Tags */}
                <div className="px-6 mb-6">
                  <div
                    className="grid grid-cols-3 gap-4"
                    style={{
                      gap: '0.5rem',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {project.technologies.slice(0, 5).map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-700 text-gray-300 text-xs rounded-full border border-gray-600 hover:border-[var(--accent-color)] transition-colors text-center"
                        title={tech}
                      >
                        {tech.length > 10
                          ? `${tech.substring(0, 10)}...`
                          : tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-4 py-2 bg-gray-700 text-gray-300 text-xs rounded-full border border-gray-600 hover:border-[var(--accent-color)] transition-colors text-center">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Click Indicator */}
                <div
                  className="text-center px-6"
                  style={{ marginTop: 'auto', paddingTop: '20px' }}
                >
                  <span
                    className="text-xs font-medium rounded-full transition-all duration-200 inline-block"
                    style={{
                      padding: '10px 20px',
                      fontSize: '12px',
                      color: '#ffffff',
                      backgroundColor: 'transparent',
                      border: '2px solid #a78bfa',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    }}
                    onMouseEnter={e => {
                      const target = e.target as HTMLElement;
                      target.style.borderColor = '#c4b5fd';
                      target.style.backgroundColor = '#a78bfa';
                    }}
                    onMouseLeave={e => {
                      const target = e.target as HTMLElement;
                      target.style.borderColor = '#a78bfa';
                      target.style.backgroundColor = 'transparent';
                    }}
                  >
                    클릭하여 자세히 보기
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal - 강제로 보이게 설정 */}
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
          }}
          onClick={handleBackdropClick}
        >
          <div
            className="bg-gray-800 rounded-2xl w-full max-w-[800px] h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '1rem',
              maxWidth: '700px',
              maxHeight: '85vh',
              minHeight: '70vh',
              padding: '1rem',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start p-8 border-b border-gray-700 bg-gray-900 rounded-t-2xl flex-shrink-0">
              <div className="flex-1 pr-4">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-300 text-sm">프로젝트 상세 정보</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors p-3 rounded-full hover:bg-gray-700 flex-shrink-0"
                aria-label="모달 닫기"
              >
                <MdClose size={28} />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Description */}
              <div className="bg-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                  프로젝트 설명
                </h3>
                <p className="text-gray-200 leading-relaxed text-lg">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="bg-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                  사용 기술
                </h3>
                <div className="flex flex-wrap gap-4">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-6 py-3 bg-gray-600 text-gray-200 rounded-lg border border-gray-500 hover:border-[var(--accent-color)] hover:bg-gray-500 transition-all duration-200 text-base font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Details - Melpik 사용자 웹 & 하이브리드 앱 전용 */}
              {selectedProject.id === 1 && (
                <>
                  {/* Project Summary - 핵심 정보를 한눈에 */}
                  <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-8 mb-6 border border-blue-500">
                    <div className="text-center mb-6">
                      <h3 className="text-4xl font-bold text-white mb-4">
                        🛍️ Melpik 패션 플랫폼
                      </h3>
                      <p className="text-xl text-blue-200">
                        웹 + 모바일 하이브리드 앱으로 구현한 맞춤형 패션 추천 서비스
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="bg-blue-800/50 rounded-lg p-4 border border-blue-400">
                        <div className="text-2xl font-bold text-white">🎯</div>
                        <div className="text-white font-semibold">프론트엔드 전담</div>
                        <div className="text-blue-200 text-sm">웹 + 앱 동시 개발</div>
                      </div>
                      <div className="bg-purple-800/50 rounded-lg p-4 border border-purple-400">
                        <div className="text-2xl font-bold text-white">⏰</div>
                        <div className="text-white font-semibold">1년 개발</div>
                        <div className="text-purple-200 text-sm">2024.07 ~ 2025.07</div>
                      </div>
                      <div className="bg-green-800/50 rounded-lg p-4 border border-green-400">
                        <div className="text-2xl font-bold text-white">🚀</div>
                        <div className="text-white font-semibold">앱스토어 출시</div>
                        <div className="text-green-200 text-sm">iOS & Android</div>
                      </div>
                    </div>
                  </div>

                  {/* Key Achievements - 주요 성과를 간단명료하게 */}
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 mb-6 border border-gray-600">
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                      ✨ 주요 성과
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-600 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">8초 → 2.5초</div>
                        <div className="text-white">로딩 속도 개선</div>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">웹 + 앱</div>
                        <div className="text-white">하이브리드 개발</div>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">React 19</div>
                        <div className="text-white">최신 기술 적용</div>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">모바일 우선</div>
                        <div className="text-white">반응형 설계</div>
                      </div>
                    </div>
                  </div>

                  {/* UI Showcase - 이미지를 간단하게 */}
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 mb-6 border border-gray-600">
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                      🎨 핵심 화면
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <img src={melpikUI1} alt="메인 화면" className="w-full rounded-lg mb-2" style={{ maxHeight: '250px', objectFit: 'contain' }} />
                        <div className="text-white font-semibold">🏠 메인</div>
                      </div>
                      <div className="text-center">
                        <img src={melpikUI2} alt="상품 상세" className="w-full rounded-lg mb-2" style={{ maxHeight: '250px', objectFit: 'contain' }} />
                        <div className="text-white font-semibold">👗 상품</div>
                      </div>
                      <div className="text-center">
                        <img src={melpikUI3} alt="마이페이지" className="w-full rounded-lg mb-2" style={{ maxHeight: '250px', objectFit: 'contain' }} />
                        <div className="text-white font-semibold">👤 마이</div>
                      </div>
                      <div className="text-center">
                        <img src={melpikUI4} alt="결제/배송" className="w-full rounded-lg mb-2" style={{ maxHeight: '250px', objectFit: 'contain' }} />
                        <div className="text-white font-semibold">💳 결제</div>
                      </div>
                    </div>
                  </div>

                  {/* Core Features - 핵심 기능을 간단하게 */}
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 mb-6 border border-gray-600">
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                      🚀 핵심 기능
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-gray-600 rounded-lg p-3">
                        <span className="text-2xl">🏠</span>
                        <div>
                          <div className="text-white font-semibold">맞춤형 추천</div>
                          <div className="text-gray-300 text-sm">AI 기반 개인화 상품 추천</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-600 rounded-lg p-3">
                        <span className="text-2xl">👗</span>
                        <div>
                          <div className="text-white font-semibold">상품 관리</div>
                          <div className="text-gray-300 text-sm">이미지 슬라이더 + 찜하기 기능</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-600 rounded-lg p-3">
                        <span className="text-2xl">👤</span>
                        <div>
                          <div className="text-white font-semibold">개인 옷장</div>
                          <div className="text-gray-300 text-sm">찜한 상품 + 구매 내역 관리</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-600 rounded-lg p-3">
                        <span className="text-2xl">💳</span>
                        <div>
                          <div className="text-white font-semibold">결제 시스템</div>
                          <div className="text-gray-300 text-sm">카카오 지도 + 장바구니 연동</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hybrid App Development */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      하이브리드 앱 제작 요소
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          앱 개발 및 배포
                        </h4>
                        <p className="text-gray-200 mb-4">
                          웹앱을 기반으로 React Native + Expo + WebView를
                          활용하여 하이브리드 앱을 제작했습니다. 앱의 메인
                          화면은 https://me1pik.com/melpik 웹앱을 렌더링하는
                          형태로 구성했습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          플랫폼별 테스트 및 배포
                        </h4>
                        <p className="text-gray-200 mb-4">
                          안드로이드(Android Studio) 및 iOS(Xcode) 각각 테스트
                          및 배포를 진행했습니다. EAS Build를 활용하여 앱스토어
                          제출용 앱 번들(.aab / .ipa)을 생성하고 배포를
                          완료했습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          기술적 고려 사항
                        </h4>
                        <p className="text-gray-200 mb-4">
                          deeplink 대응 처리로 웹 링크 → 앱 내부 페이지로
                          연결했습니다. 앱 내 StatusBar, Splash, Loading 처리
                          커스터마이징과 모바일에서의 입력 UX 개선(가상 키보드,
                          터치 간격 조정 등)을 구현했습니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Improvements */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      개선한 점
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          초기 로딩 속도 개선
                        </h4>
                        <p className="text-gray-200 mb-4">
                          Vite 도입 및 코드 스플리팅을 적용했습니다. React Lazy
                          + Suspense 적용으로 초기 로딩 시간을 8초 → 2.5초로
                          단축했습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          상태 관리 구조 개선
                        </h4>
                        <p className="text-gray-200 mb-4">
                          Redux에서 TanStack Query 기반으로 전환하여 데이터
                          일관성을 확보하고 API 호출을 최적화했습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          하이브리드 앱 최적화
                        </h4>
                        <p className="text-gray-200 mb-4">
                          WebView와의 상호작용 문제를 해결하기 위해 postMessage
                          구조를 설계했습니다. 모바일 입력 UX, 위치 권한,
                          하드웨어 뒤로가기 등의 문제를 처리했습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          SEO 대응 및 공유 기능 개선
                        </h4>
                        <p className="text-gray-200 mb-4">
                          og:image, meta tag 설정으로 SNS 공유 시 미리보기
                          이미지를 제공했습니다. 제품 상세 페이지 링크 공유 시
                          사용자별 맞춤 정보를 연결했습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          웹-앱 통합 구조 설계
                        </h4>
                        <p className="text-gray-200 mb-4">
                          웹-앱 통합 구조를 직접 설계 및 구현하여 플랫폼
                          확장성을 확보했습니다. 복잡한 사용자 흐름과 관리자
                          기능을 각각의 목적에 맞게 설계하여 직관적인 UI/UX
                          구성을 실현했습니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Details */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      기술 스택 상세
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Frontend
                        </h4>
                        <p className="text-gray-200">
                          React 19, TypeScript, Vite, Styled Components
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          상태 관리
                        </h4>
                        <p className="text-gray-200">
                          React Query, Context API
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          하이브리드 앱
                        </h4>
                        <p className="text-gray-200">
                          React Native (Expo), WebView
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          배포 및 빌드
                        </h4>
                        <p className="text-gray-200">
                          Netlify (웹), App Store, Play Store, EAS Build (앱),
                          Android Studio, Xcode
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Project Retrospective */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      프로젝트 회고
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-600 rounded-lg p-4">
                        <p className="text-gray-200">
                          • Melpik 프로젝트는 단순한 웹 개발을 넘어, 하이브리드
                          앱 환경까지 통합한 사용자 경험을 고려하며 개발한 실전
                          중심 프로젝트였습니다.
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-4">
                        <p className="text-gray-200">
                          • 웹/앱 동시 유지보수를 고려한 모듈화된 설계 구조, UX
                          중심의 페이지 흐름, 모바일 최적화 처리 경험을 통해
                          프론트엔드 개발자로서의 기술적 깊이와 넓이를 확장할 수
                          있었습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Project Details - ADHD 감정일기 웹 서비스 전용 */}
              {selectedProject.id === 3 && (
                <>
                  {/* Role & Period */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      프로젝트 정보
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          역할
                        </h4>
                        <p className="text-gray-200">
                          프론트엔드 개발 전체 담당 (설계, 구현, 개선)
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          기간
                        </h4>
                        <p className="text-gray-200">2024.07 ~ 2024.08</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Overview */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      프로젝트 개요
                    </h3>
                    <div className="bg-gray-600 rounded-lg p-6">
                      <p className="text-gray-200">
                        멋쟁이사자처럼 해커톤에서 진행한 프로젝트로, 감정 조절과
                        집중에 어려움을 겪는 사용자들이 자신의 상태를 시각적으로
                        기록하고, 뽀모도로 방식의 타이머 및 플래너 기능을 통해
                        일상 루틴을 관리할 수 있도록 돕는 웹 플랫폼을
                        제작했습니다.
                      </p>
                    </div>
                  </div>

                  {/* Main Features */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      담당 업무 및 구현 경험
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          서비스 설계 및 구조 설계
                        </h4>
                        <p className="text-gray-200 mb-4">
                          서비스 설계 초기 단계부터 직접 참여해 전체 프론트엔드
                          구조를 기획하고, 페이지 라우팅 및 레이아웃을
                          설계했습니다. React Router 기반의 SPA 구조로 화면
                          전환을 매끄럽게 처리하고, 전역 상태 관리는 Recoil로
                          설계하여 컴포넌트 간 데이터 흐름을 명확하게
                          유지했습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          주요 기능 페이지 개발
                        </h4>
                        <p className="text-gray-200 mb-4">
                          총 4개의 주요 기능 페이지(감정 기록, 뽀모도로 타이머,
                          일정 플래너, 분석 리포트)를 직접 설계하고
                          개발했습니다. 컴포넌트 재사용성 극대화를 위해 버튼,
                          카드, 입력창 등 공통 UI 요소를 Atomic Design 패턴에
                          맞게 구현했습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          팀 협업 및 워크플로우
                        </h4>
                        <p className="text-gray-200 mb-4">
                          Git을 통한 팀원과의 협업 워크플로우를 주도하고 코드
                          리뷰 문화를 도입했습니다. 팀 프로젝트에서 프론트엔드
                          개발을 전담하며 전체적인 개발 프로세스를 경험했습니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Improvements */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      개선한 점 및 기술적 도전
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          초기 감정 기록 페이지의 UX 문제 해결
                        </h4>
                        <p className="text-gray-200 mb-4">
                          <strong>문제점:</strong> 감정 선택 후 기록이 번거롭고,
                          사용자 이탈률이 높았습니다.
                        </p>
                        <p className="text-gray-200 mb-4">
                          <strong>개선:</strong> 감정 선택 → 즉시 캘린더에
                          반영되는 흐름으로 UX를 리디자인했습니다.
                        </p>
                        <p className="text-gray-200">
                          <strong>성과:</strong> 사용자 피드백 기반으로 감정
                          기록 인터랙션 진입-완료 시간 40% 단축
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          뽀모도로 타이머 퍼포먼스 최적화
                        </h4>
                        <p className="text-gray-200 mb-4">
                          <strong>문제점:</strong> 타이머 UI 렌더링 중 불필요한
                          리렌더링이 발생했습니다.
                        </p>
                        <p className="text-gray-200 mb-4">
                          <strong>개선:</strong> useRef, useCallback 기반으로
                          리렌더링을 최소화하고 상태를 분리했습니다.
                        </p>
                        <p className="text-gray-200">
                          <strong>성과:</strong> CPU 사용률 50% 감소, 모바일
                          기기에서도 부드러운 타이머 작동
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          데이터 분석 페이지에서 시각화 구조 리팩토링
                        </h4>
                        <p className="text-gray-200 mb-4">
                          <strong>문제점:</strong> 조건별 필터링에 따른 차트
                          재렌더링이 느렸습니다.
                        </p>
                        <p className="text-gray-200 mb-4">
                          <strong>개선:</strong> 데이터를 메모이제이션하여 조건
                          변경 시 즉시 차트 렌더링이 되도록 했습니다.
                        </p>
                        <p className="text-gray-200">
                          <strong>성과:</strong> 차트 필터 적용 시간 평균 1.2초
                          → 0.3초로 개선
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          공통 컴포넌트 통일 및 디자인 시스템 정립
                        </h4>
                        <p className="text-gray-200 mb-4">
                          <strong>문제점:</strong> 페이지마다 다른
                          스타일/컴포넌트로 UI 일관성이 떨어졌습니다.
                        </p>
                        <p className="text-gray-200 mb-4">
                          <strong>개선:</strong> 공통 컴포넌트 디렉토리 구조를
                          정리하고, 재사용 가능한 Button, Card, Modal을
                          설계했습니다.
                        </p>
                        <p className="text-gray-200">
                          <strong>성과:</strong> 코드 재사용률 증가, 유지보수
                          시간 절감, 디자이너와의 협업 효율 향상
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Details */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      기술 스택 상세
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          프레임워크/라이브러리
                        </h4>
                        <p className="text-gray-200">
                          React, Recoil, Styled Components, React Router
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          차트 라이브러리
                        </h4>
                        <p className="text-gray-200">Recharts</p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          비동기 처리
                        </h4>
                        <p className="text-gray-200">Axios</p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          협업 도구
                        </h4>
                        <p className="text-gray-200">Git, GitHub, Figma</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Retrospective */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      프로젝트 회고
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-600 rounded-lg p-4">
                        <p className="text-gray-200">
                          • 이 프로젝트는 단순한 기능 구현을 넘어, 사용자 경험
                          개선과 코드 품질 향상, 팀 협업에 이르기까지 프론트엔드
                          전반을 경험하고 성장할 수 있었던 기회였습니다.
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-4">
                        <p className="text-gray-200">
                          • 특히 실사용자 피드백을 반영한 빠른 기능 개선, UI
                          일관성 확보를 위한 시스템화, 성능 최적화를 위한
                          리팩토링을 통해 실무와 유사한 개발 역량을 키울 수
                          있었습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Project Details - Melpik 관리자 페이지 전용 */}
              {selectedProject.id === 2 && (
                <>
                  {/* Role & Period */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      프로젝트 정보
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          역할
                        </h4>
                        <p className="text-gray-200">
                          관리자 시스템 프론트엔드 전담 개발
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          기간
                        </h4>
                        <p className="text-gray-200">2024.07 ~ 2025.07</p>
                      </div>
                    </div>
                  </div>

                  {/* Main Features */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      구현한 주요 기능
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          상품 관리 (Product CRUD)
                        </h4>
                        <p className="text-gray-200 mb-4">
                          상품 목록 조회, 검색 필터링, 신규 상품 등록, 수정,
                          삭제 기능을 구현했습니다. 이미지 업로드 및 썸네일
                          미리보기 기능을 포함하여 카테고리, 해시태그, 가격,
                          상태 등 복합 필드 관리 UI를 구성했습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          주문/결제 관리
                        </h4>
                        <p className="text-gray-200 mb-4">
                          결제 상태, 배송 상태, 사용자 정보 기반 필터링을
                          구현했습니다. 배송준비중, 배송중, 배송완료 등의 상태
                          전환 처리를 통해 주문 프로세스를 효율적으로 관리할 수
                          있습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          유저 관리
                        </h4>
                        <p className="text-gray-200 mb-4">
                          회원 정보 목록, 권한 관리, 활동 로그 확인 기능을
                          구현했습니다. 이벤트 참여자, 구매자 분류를 위한 검색
                          및 통계 기능을 통해 사용자 데이터를 체계적으로 관리할
                          수 있습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          통계/대시보드
                        </h4>
                        <p className="text-gray-200 mb-4">
                          총 주문 건수, 상품별 판매량, 인기 카테고리를
                          시각화했습니다. 기간 필터(일간/주간/월간)와
                          차트(막대/선 그래프)를 통해 데이터를 직관적으로 분석할
                          수 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technical Implementation */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      기술적 구현 및 개선점
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          코드 스플리팅 + Lazy Loading 적용
                        </h4>
                        <p className="text-gray-200 mb-4">
                          초기 관리자 대시보드 로딩 속도를 최적화했습니다.
                          불필요한 컴포넌트 렌더링을 지연시켜 UX를
                          향상시켰습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          React Query 기반 상태 관리로 전환
                        </h4>
                        <p className="text-gray-200 mb-4">
                          서버 상태와 UI 상태를 분리하여 데이터 일관성을
                          확보했습니다. 중복 API 요청 방지 및 캐싱을
                          적용했습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          에러 처리 & 사용자 피드백 시스템 강화
                        </h4>
                        <p className="text-gray-200 mb-4">
                          API 호출 실패 시 Alert 메시지 처리를 구현했습니다.
                          제출 완료 시 확인 메시지 및 페이지 리디렉션 로직을
                          추가했습니다.
                        </p>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          모바일 대응을 고려한 반응형 구조 적용
                        </h4>
                        <p className="text-gray-200 mb-4">
                          사이드바 메뉴 축소, 토글형 필터링 UI를 구성했습니다.
                          모바일 접근 시 최소 기능만 표시되도록 대응했습니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Details */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      기술 스택 상세
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Frontend
                        </h4>
                        <p className="text-gray-200">
                          React 19, TypeScript, Styled Components
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          상태 관리
                        </h4>
                        <p className="text-gray-200">
                          React Query, Context API
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          차트 라이브러리
                        </h4>
                        <p className="text-gray-200">Chart.js, ApexCharts</p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          배포 환경
                        </h4>
                        <p className="text-gray-200">Netlify</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Retrospective */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      프로젝트 회고
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-600 rounded-lg p-4">
                        <p className="text-gray-200">
                          • 실제 운영자가 사용하는 시스템인 만큼,
                          사용성(Usability)과 정보 구조 설계(Information
                          Architecture)에 대한 감각을 키울 수 있던
                          경험이었습니다.
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-4">
                        <p className="text-gray-200">
                          • 데이터 흐름 구조를 정리하고, 서버-프론트 간 연동
                          설계를 하면서 실시간 데이터 처리와 상태 관리 최적화에
                          자신감을 얻게 되었습니다.
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-4">
                        <p className="text-gray-200">
                          • 관리자의 반복 업무를 자동화하고 효율화하는 기능을
                          기획부터 구현까지 맡으며, 실무에 가까운 B2B SaaS형
                          대시보드 개발 경험을 쌓았습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Project Details - 클로버 전시회 초대장 전용 */}
              {selectedProject.id === 4 && (
                <>
                  {/* Role & Period */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      프로젝트 정보
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          역할
                        </h4>
                        <p className="text-gray-200">
                          프론트엔드 개발 (모바일 대응 중심)
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          기간
                        </h4>
                        <p className="text-gray-200">2023.06 ~ 2023.08</p>
                      </div>
                    </div>
                  </div>

                  {/* Pages Details */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      주요 페이지 및 기능
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          About 페이지 – 전시 소개 및 디자인 컨셉
                        </h4>
                        <p className="text-gray-200 mb-4">
                          전시 전체 흐름을 비주얼 영상 및 타이포그래피로 전달.
                          video 태그를 활용하여 자동 재생되는 배경 영상 시퀀스를
                          구성. 사용자가 스크롤을 내릴수록 전시 주제에 대한
                          스토리텔링이 진행되는 인터랙션 설계.
                        </p>
                        <div className="bg-gray-500 rounded-lg p-4">
                          <h5 className="text-sm font-semibold text-white mb-2">
                            🎯 개선 포인트:
                          </h5>
                          <ul className="text-sm text-gray-200 space-y-1">
                            <li>
                              • 콘텐츠 간 시각적 단절 문제를 페이지 분리와
                              구분선(Linecontainer)으로 해결
                            </li>
                            <li>
                              • autoPlay, muted, loop, playsInline 속성을 모든
                              영상 요소에 통일적으로 적용하여 브라우저 간 재생
                              오류 최소화
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Projects 페이지 – 팀별 도슨트/팟캐스트 뷰어
                        </h4>
                        <p className="text-gray-200 mb-4">
                          전시 참여 팀(6개)을 Hover 가능한 .gif 요소로
                          시각화하고 클릭 시 설명 정보와 미디어 정보 표시. 각
                          팀은 팟캐스트, 도슨트, 팀원, 카테고리 등 상세 정보가
                          분리되어 구조화됨.
                        </p>
                        <div className="bg-gray-500 rounded-lg p-4">
                          <h5 className="text-sm font-semibold text-white mb-2">
                            🎯 개선 포인트:
                          </h5>
                          <ul className="text-sm text-gray-200 space-y-1">
                            <li>
                              • 각 팀의 콘텐츠가 혼재되어 있던 UI를 카테고리
                              분리 + 재사용 가능한 이미지 맵핑 구조로 정돈
                            </li>
                            <li>
                              • setTimeout, useEffect 활용하여 자동 닫힘 기능
                              구현 → UX 향상
                            </li>
                            <li>
                              • QR 이미지 로딩 문제 해결을 위해
                              description.podcastqrImage 경로 최적화
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Announcement 페이지 – 팟캐스트 상세 안내
                        </h4>
                        <p className="text-gray-200 mb-4">
                          개별 작품 페이지의 팟캐스트 QR 뷰어. 전시 설명 문구와
                          함께 모바일로의 접근을 유도하는 안내 메시지 및 QR
                          이미지 배치.
                        </p>
                        <div className="bg-gray-500 rounded-lg p-4">
                          <h5 className="text-sm font-semibold text-white mb-2">
                            🎯 개선 포인트:
                          </h5>
                          <ul className="text-sm text-gray-200 space-y-1">
                            <li>
                              • 버튼형 뒤로가기 이미지 클릭 시 navigate 처리 →
                              사용자 흐름 중단 없이 이동 가능
                            </li>
                            <li>
                              • QR 인식 영역을 크게 확보하여 모바일 스캔 편의성
                              강화
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Details */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      기술 스택 상세
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Frontend
                        </h4>
                        <p className="text-gray-200">
                          React, JavaScript, CSS Modules
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          상태 관리
                        </h4>
                        <p className="text-gray-200">useState, useEffect</p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          UI 구성 요소
                        </h4>
                        <p className="text-gray-200">
                          Modal, Video, 이미지 기반 인터랙션
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          협업 도구
                        </h4>
                        <p className="text-gray-200">Figma, GitHub</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Retrospective */}
                  <div className="bg-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                      프로젝트 회고
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-600 rounded-lg p-4">
                        <p className="text-gray-200">
                          • 디자이너의 Figma 시안과 실제 구현 사이의 시각 차이를
                          줄이기 위해 정밀한 컴포넌트 설계와 반응형 스타일링에
                          집중
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-4">
                        <p className="text-gray-200">
                          • 팀원 간 팟캐스트, 도슨트 미디어 데이터를 정적
                          객체화하고, 이를 UI와 연결하는 방식으로 효율적인 상태
                          관리 구조 구현
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-4">
                        <p className="text-gray-200">
                          • 전시의 "스토리텔링"과 "인터랙션"이라는 키워드를
                          살리기 위해 scroll 인터랙션, hover animation, modal
                          전환 등 다양한 사용자 피드백 처리에 집중
                        </p>
                      </div>
                      <div className="bg-gray-600 rounded-lg p-4">
                        <p className="text-gray-200">
                          • 특히 모바일 대응성을 고려하여 playsInline, QR 사용
                          유도, 폰트 크기 및 레이아웃 적응 방식 등 반응형 UI/UX
                          설계 능력을 키움
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Links */}
              <div className="bg-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                  프로젝트 링크
                </h3>
                <div className="flex gap-6">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors flex-1 justify-center hover:scale-105 transform duration-200 text-lg font-medium"
                    >
                      <FaGithub size={24} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 px-8 py-4 bg-[var(--accent-color)] text-white rounded-lg hover:opacity-90 transition-opacity flex-1 justify-center hover:scale-105 transform duration-200 text-lg font-medium"
                    >
                      <MdLink size={24} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 디버깅용 모달 상태 표시 */}
      <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded z-[10000] text-xs">
        모달 상태: {isModalOpen ? '열림' : '닫힘'} | 프로젝트:{' '}
        {selectedProject ? selectedProject.title : '없음'}
      </div>
    </section>
  );
};

export default Projects;
