import { useGenericModal } from './useGenericModal';
import type { Project } from '../types';

export const useModal = () => {
  const { isOpen, selectedItem, openModal, closeModal } =
    useGenericModal<Project>();

  return {
    isOpen,
    selectedProject: selectedItem,
    openModal,
    closeModal,
  };
};
