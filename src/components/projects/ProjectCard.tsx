import React from 'react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(
  ({ project, onClick }) => {
    return (
      <div
        onClick={onClick}
        className="project-card bg-gray-800 rounded-xl border border-gray-700 hover:border-transparent transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl overflow-hidden relative group rainbow-border"
        style={{
          borderRadius: '1rem',
          padding: '1rem',
        }}
      >
        {/* Project Image - 고정 높이 300px */}
        <div
          className="w-full h-50 relative overflow-hidden p-3"
          style={{ height: '300px' }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={e => {
                console.error(
                  '이미지 로딩 실패:',
                  project.title,
                  project.image
                );
                const target = e.currentTarget;
                const fallback =
                  target.parentElement?.querySelector('.image-fallback');
                if (fallback) {
                  target.style.display = 'none';
                  (fallback as HTMLElement).style.display = 'flex';
                }
              }}
            />
          ) : null}
          <div
            className="w-full h-full bg-gray-700 flex items-center justify-center image-fallback"
            style={{ display: project.image ? 'none' : 'flex' }}
          >
            <span className="text-gray-400">이미지 없음</span>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-4">
          <h3
            className="text-xl font-bold text-white mb-3"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-gray-300 text-sm mb-4"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}
          >
            {project.description}
          </p>

          {/* Technologies - 모달과 같은 스타일로 가독성 향상 */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-blue-400 mb-3">
              사용 기술 ({project.technologies.length}개)
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.technologies.slice(0, 6).map((tech, index) => {
                // 각 기술별로 다른 색상 적용
                const getTechColors = () => {
                  const colorPalette = [
                    { bg: '#3b82f6', text: 'white', border: '#3b82f6' }, // 파란색
                    { bg: '#06b6d4', text: 'white', border: '#06b6d4' }, // 청록색
                    { bg: '#8b5cf6', text: 'white', border: '#8b5cf6' }, // 보라색
                    { bg: '#10b981', text: 'white', border: '#10b981' }, // 초록색
                    { bg: '#f59e0b', text: 'white', border: '#f59e0b' }, // 주황색
                    { bg: '#ef4444', text: 'white', border: '#ef4444' }, // 빨간색
                  ];

                  return (
                    colorPalette[index % colorPalette.length] || colorPalette[0]
                  );
                };

                const colors = getTechColors();

                return (
                  <span
                    key={index}
                    className="px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 shadow-sm"
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                      marginBottom: '8px',
                      marginRight: '8px',
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
              {project.technologies.length > 6 && (
                <span
                  className="px-4 py-2 bg-gray-600 text-gray-400 text-xs font-medium rounded-lg border border-gray-500 shadow-sm"
                  style={{
                    marginBottom: '8px',
                    marginRight: '8px',
                  }}
                >
                  +{project.technologies.length - 6}개 더
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
