import React from 'react';
import type { Project } from '../../types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = React.memo(
  ({ projects, onProjectClick }) => {
    return (
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      </div>
    );
  }
);

ProjectGrid.displayName = 'ProjectGrid';

export default ProjectGrid;
