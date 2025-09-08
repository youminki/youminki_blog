import { useState, useCallback } from 'react';

export const useGenericModal = <T>() => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const openModal = useCallback((item: T) => {
    setSelectedItem(item);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
  }, []);

  return {
    isOpen,
    selectedItem,
    openModal,
    closeModal,
  };
};
