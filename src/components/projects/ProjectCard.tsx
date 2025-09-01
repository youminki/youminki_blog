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

          {/* Technologies - 개선된 스타일 */}
          <div
            style={{
              marginBottom: '1rem',
            }}
          >
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--accent-color)',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              사용 기술 ({project.technologies.length}개)
            </h4>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              {project.technologies.slice(0, 6).map((tech, index) => {
                // 기술별 색상 매핑
                const getTechColor = (techName: string) => {
                  const techColors: { [key: string]: string } = {
                    // 프론트엔드
                    React: '#61dafb',
                    'React Native': '#61dafb',
                    Vue: '#4fc08d',
                    Angular: '#dd0031',
                    TypeScript: '#3178c6',
                    JavaScript: '#f7df1e',
                    HTML: '#e34f26',
                    CSS: '#1572b6',
                    Tailwind: '#06b6d4',
                    'Styled Components': '#db7093',

                    // 백엔드
                    Node: '#339933',
                    Express: '#000000',
                    Python: '#3776ab',
                    Django: '#092e20',
                    'Spring Boot': '#6db33f',
                    Java: '#ed8b00',

                    // 데이터베이스
                    MongoDB: '#47a248',
                    MySQL: '#4479a1',
                    PostgreSQL: '#336791',
                    Firebase: '#ffca28',

                    // 기타
                    Docker: '#2496ed',
                    Git: '#f05032',
                    AWS: '#ff9900',
                    Vercel: '#000000',
                    Netlify: '#00ad9f',
                  };

                  return techColors[techName] || '#6b7280';
                };

                const color = getTechColor(tech);

                return (
                  <span
                    key={index}
                    style={{
                      backgroundColor: `${color}15`,
                      color: color,
                      padding: '0.375rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      borderRadius: '0.5rem',
                      border: `1px solid ${color}30`,
                      transition: 'all 0.2s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = `${color}25`;
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = `0 2px 8px ${color}20`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = `${color}15`;
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
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-secondary)',
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  +{project.technologies.length - 6}개 더
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              marginTop: '1rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {project.githubUrl && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank');
                  }}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor =
                      'var(--accent-color)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'var(--accent-color)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor =
                      'var(--bg-secondary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  GitHub 보기
                </button>
              )}
              {project.liveUrl && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    window.open(project.liveUrl, '_blank');
                  }}
                  style={{
                    backgroundColor: 'var(--accent-color)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow =
                      '0 4px 12px var(--shadow-medium)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  라이브 데모
                </button>
              )}
              {!project.githubUrl && !project.liveUrl && (
                <button
                  onClick={onClick}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor =
                      'var(--accent-color)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'var(--accent-color)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor =
                      'var(--bg-secondary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  자세히 보기
                </button>
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
