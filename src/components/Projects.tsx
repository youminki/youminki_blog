import React, { useEffect } from 'react';
import { MdRocketLaunch } from 'react-icons/md';
import { PROJECTS_DATA } from '../data';
import ProjectGrid from './projects/ProjectGrid';
import ProjectModal from './projects/ProjectModal';
import { useModal } from '../hooks/useModal';
import { useUrlParams } from '../hooks/useUrlParams';

const Projects: React.FC = () => {
  const { isOpen, selectedProject, openModal, closeModal } = useModal();
  const { urlParams } = useUrlParams();

  // URL에서 프로젝트 모달 열기
  useEffect(() => {
    if (urlParams.projectId) {
      const project = PROJECTS_DATA.find(
        proj => proj.id === urlParams.projectId
      );
      if (project) {
        openModal(project);
      }
    }
  }, [urlParams.projectId, openModal]);

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
        <MdRocketLaunch className="text-[var(--accent-color)] text-2xl" />
        Projects
      </h2>

      <ProjectGrid projects={PROJECTS_DATA} onProjectClick={openModal} />

      <ProjectModal
        project={selectedProject}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default Projects;
