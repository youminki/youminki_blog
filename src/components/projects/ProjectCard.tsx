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
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">이미지 없음</span>
            </div>
          )}
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
              {project.technologies.slice(0, 6).map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-700 text-gray-300 text-xs font-medium rounded-lg border border-blue-500 hover:border-blue-400 hover:bg-gray-600 transition-all duration-200 shadow-sm"
                  style={{
                    marginBottom: '8px',
                    marginRight: '8px',
                  }}
                >
                  {tech}
                </span>
              ))}
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
