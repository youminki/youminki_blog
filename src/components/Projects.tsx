import React from 'react';
import { MdRocketLaunch } from 'react-icons/md';
import { PROJECTS_DATA } from '../data';
import ProjectGrid from './projects/ProjectGrid';
import ProjectModal from './projects/ProjectModal';
import { useModal } from '../hooks/useModal';

const Projects: React.FC = () => {
  const { isOpen, selectedProject, openModal, closeModal } = useModal();

  // 디버깅을 위한 로그
  console.log('=== Projects 컴포넌트 렌더링 ===');
  console.log('isOpen:', isOpen);
  console.log('selectedProject:', selectedProject);
  console.log('PROJECTS_DATA 길이:', PROJECTS_DATA.length);

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

      {/* 디버깅용 상태 표시 */}
      <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded z-[10000] text-xs">
        모달 상태: {isOpen ? '열림' : '닫힘'} | 프로젝트:{' '}
        {selectedProject ? selectedProject.title : '없음'}
      </div>
    </section>
  );
};

export default Projects;
