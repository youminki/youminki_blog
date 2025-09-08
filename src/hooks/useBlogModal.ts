import { useGenericModal } from './useGenericModal';
import { useUrlParams } from './useUrlParams';
import type { BlogPost } from '../types';

export const useBlogModal = () => {
  const { isOpen, selectedItem, openModal, closeModal } =
    useGenericModal<BlogPost>();
  const { updateUrl, removeParam } = useUrlParams();

  const openModalWithUrl = (post: BlogPost) => {
    openModal(post);
    updateUrl({ blogId: post.id });
  };

  const closeModalWithUrl = () => {
    closeModal();
    removeParam('blogId');
  };

  return {
    isOpen,
    selectedPost: selectedItem,
    openModal: openModalWithUrl,
    closeModal: closeModalWithUrl,
  };
};
