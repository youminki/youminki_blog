import { useState, useCallback } from 'react';
import type { Project } from '../types';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = useCallback((project: Project) => {
    console.log('useModal - openModal 호출됨:', project.title);
    setSelectedProject(project);
    setIsOpen(true);
    console.log('useModal - 상태 업데이트 완료:', {
      isOpen: true,
      selectedProject: project,
    });
  }, []);

  const closeModal = useCallback(() => {
    console.log('useModal - closeModal 호출됨');
    setIsOpen(false);
    setSelectedProject(null);
    console.log('useModal - 상태 업데이트 완료:', {
      isOpen: false,
      selectedProject: null,
    });
  }, []);

  console.log('useModal - 현재 상태:', { isOpen, selectedProject });

  return {
    isOpen,
    selectedProject,
    openModal,
    closeModal,
  };
};
