import { useGenericModal } from './useGenericModal';
import { useUrlParams } from './useUrlParams';
import type { Project } from '../types';

export const useModal = () => {
  const { isOpen, selectedItem, openModal, closeModal } =
    useGenericModal<Project>();
  const { updateUrl, removeParam } = useUrlParams();

  const openModalWithUrl = (project: Project) => {
    openModal(project);
    updateUrl({ projectId: project.id });
  };

  const closeModalWithUrl = () => {
    closeModal();
    removeParam('projectId');
  };

  return {
    isOpen,
    selectedProject: selectedItem,
    openModal: openModalWithUrl,
    closeModal: closeModalWithUrl,
  };
};
