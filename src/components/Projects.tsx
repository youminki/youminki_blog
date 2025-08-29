import { useState } from 'react';
import { MdRocketLaunch, MdClose, MdLink } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import projectImg1 from '../assets/projectImg1.jpg';
import projectImg2 from '../assets/projectImg2.jpg';

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
        '사용자 맞춤형 패션 추천과 개인 옷장 기능을 중심으로 한 웹 서비스로, 웹앱 + 하이브리드 앱(iOS/Android) 형태로 제작되었습니다. 관리자 페이지를 별도로 구축하여 상품/유저/주문/통계 관리가 가능한 통합 운영 시스템도 구현하였습니다.',
      technologies: [
        'React 19',
        'TypeScript',
        'React Native',
        'Expo',
        'WebView',
        'Styled Components',
        'React Query',
        'Vite',
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
      ],
    },

    {
      id: 2,
      title: '멜픽 관리자 웹',
      description:
        'Melpik 관리자 페이지는 사용자 웹과 하이브리드 앱에서 발생하는 주문, 상품, 유저 데이터를 통합 관리할 수 있는 내부 운영 시스템입니다.',
      technologies: ['React', 'JavaScript', 'CSS3', 'LocalStorage'],
      image: projectImg2,
      githubUrl: 'https://github.com/youminki/todo-app',
      liveUrl: 'https://todo-app-demo.vercel.app',
      features: [
        'CRUD 기능',
        '로컬 스토리지',
        '반응형 디자인',
        '드래그 앤 드롭',
      ],
    },
    {
      id: 3,
      title: 'ADHD 감정일기 웹 서비스',
      description:
        '사용자의 기록을 기록하고, 집약 세션을 통해 목표를 향해 경기를 준비하기 위해 만들었습니다.',
      technologies: ['React', 'OpenWeather API', 'Geolocation', 'Tailwind CSS'],
      image: projectImg1,
      githubUrl: 'https://github.com/youminki/weather-app',
      liveUrl: 'https://weather-app-demo.vercel.app',
      features: ['실시간 날씨', '위치 기반', '5일 예보', '아이콘 표시'],
    },
    {
      id: 4,
      title: '클로버 전시회 초대장',
      description:
        '‘In a row’는 클로버 전시회를 소개하고, 각 팀의 디자인 철학과 이야기를 전달하기 위한 웹 초대장입니다.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      image: projectImg1,
      githubUrl: 'https://github.com/youminki/youminki_blog',
      liveUrl: 'https://youminki-blog.vercel.app',
      features: [
        '반응형 디자인',
        '다크/라이트 테마 전환',
        '모던한 UI/UX',
        'SEO 최적화',
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
