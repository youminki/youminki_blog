import { useState } from 'react';
import { MdRocketLaunch, MdClose, MdLink } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  image: string; // Added image property
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
      image: 'https://picsum.photos/800/400?random=1',
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
      image: 'https://picsum.photos/800/400?random=2',
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

      {/* Project Cards Grid - 강제 2열 정렬 */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {projects.map(project => (
          <div
            key={project.id}
            onClick={() => {
              console.log('프로젝트 클릭됨:', project.title);
              openModal(project);
            }}
            className="bg-gray-800 rounded-xl border border-gray-700 hover:border-[var(--accent-color)] transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl overflow-hidden w-full"
            style={{ minWidth: '320px' }}
          >
            {/* Project Image - 더 작은 높이 */}
            <div className="w-full h-28 relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Project Title Overlay */}
              <div className="absolute bottom-2 left-2 right-2">
                <h3 className="text-base font-bold text-white mb-1 drop-shadow-lg line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-gray-200 text-xs drop-shadow-lg line-clamp-1">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Project Info Below Image */}
            <div className="p-4">
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full border border-gray-600"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full border border-gray-600">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Click Indicator */}
              <div className="text-center">
                <span className="text-[var(--accent-color)] text-xs font-medium">
                  클릭하여 자세히 보기
                </span>
              </div>
            </div>
          </div>
        ))}
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
            className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '1rem',
              maxWidth: '56rem',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white pr-4">
                {selectedProject.title}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700 flex-shrink-0"
                aria-label="모달 닫기"
              >
                <MdClose size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Project Image */}
              <div className="w-full h-64 rounded-xl overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  프로젝트 설명
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  주요 기능
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProject.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-300 bg-gray-700 p-3 rounded-lg"
                    >
                      <span className="w-2 h-2 bg-[var(--accent-color)] rounded-full flex-shrink-0"></span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  사용 기술
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 hover:border-[var(--accent-color)] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-4 border-t border-gray-700">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex-1 justify-center"
                  >
                    <FaGithub size={20} />
                    <span className="font-medium">GitHub</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-[var(--accent-color)] text-white rounded-lg hover:opacity-90 transition-opacity flex-1 justify-center"
                  >
                    <MdLink size={20} />
                    <span className="font-medium">Live Demo</span>
                  </a>
                )}
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
