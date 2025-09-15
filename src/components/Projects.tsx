import React from 'react';
import { MdRocketLaunch } from 'react-icons/md';
import { PROJECTS_DATA } from '../data';
import ProjectGrid from './projects/ProjectGrid';
import ProjectModal from './projects/ProjectModal';
import { useModal } from '../hooks/useModal';

const Projects: React.FC = () => {
  const { isOpen, selectedProject, openModal, closeModal } = useModal();

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
