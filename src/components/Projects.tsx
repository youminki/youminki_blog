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
      title: '포트폴리오 웹사이트',
      description:
        'React와 TypeScript를 사용한 개인 포트폴리오 웹사이트입니다. 반응형 디자인과 다크 테마를 적용했습니다.',
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
    {
      id: 2,
      title: '투두 리스트 앱',
      description:
        '사용자 친화적인 인터페이스로 일정을 관리할 수 있는 투두 리스트 애플리케이션입니다.',
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
      title: '날씨 정보 앱',
      description:
        '실시간 날씨 정보를 제공하는 웹 애플리케이션으로, 사용자 위치 기반 날씨 데이터를 표시합니다.',
      technologies: ['React', 'OpenWeather API', 'Geolocation', 'Tailwind CSS'],
      image: 'https://picsum.photos/800/400?random=3',
      githubUrl: 'https://github.com/youminki/weather-app',
      liveUrl: 'https://weather-app-demo.vercel.app',
      features: ['실시간 날씨', '위치 기반', '5일 예보', '아이콘 표시'],
    },
    {
      id: 4,
      title: '쇼핑몰 웹사이트',
      description:
        '전자상거래 기능을 갖춘 쇼핑몰 웹사이트로, 상품 검색과 장바구니 기능을 제공합니다.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: 'https://picsum.photos/800/400?random=4',
      githubUrl: 'https://github.com/youminki/shopping-mall',
      liveUrl: 'https://shopping-mall-demo.vercel.app',
      features: ['상품 검색', '장바구니', '결제 시스템', '관리자 패널'],
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
                <p className="text-gray-300 text-sm mb-5 px-6 line-clamp-2 leading-relaxed">
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
                    {project.technologies.slice(0, 3).map((tech, index) => (
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
              maxWidth: '800px',
              minWidth: '40vw',
              maxHeight: '85vh',
              minHeight: '70vh',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start p-8 border-b border-gray-700 bg-gray-900 rounded-t-2xl flex-shrink-0">
              <h2 className="text-3xl font-bold text-white pr-4 leading-tight">
                {selectedProject.title}
              </h2>
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

              {/* Features */}
              <div className="bg-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></span>
                  주요 기능
                </h3>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {selectedProject.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-4 text-gray-200 bg-gray-600 p-6 rounded-lg hover:bg-gray-500 transition-colors"
                    >
                      <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full flex-shrink-0"></span>
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
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
