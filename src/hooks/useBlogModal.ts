import { useState, useCallback } from 'react';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  thumbnailColor: string;
  categoryColor: string;
  tags: string[];
}

export const useBlogModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const openModal = useCallback((post: BlogPost) => {
    console.log('useBlogModal - openModal 호출됨:', post.title);
    setSelectedPost(post);
    setIsOpen(true);
    console.log('useBlogModal - 상태 업데이트 완료:', {
      isOpen: true,
      selectedPost: post,
    });
  }, []);

  const closeModal = useCallback(() => {
    console.log('useBlogModal - closeModal 호출됨');
    setIsOpen(false);
    setSelectedPost(null);
    console.log('useBlogModal - 상태 업데이트 완료:', {
      isOpen: false,
      selectedPost: null,
    });
  }, []);

  console.log('useBlogModal - 현재 상태:', { isOpen, selectedPost });

  return {
    isOpen,
    selectedPost,
    openModal,
    closeModal,
  };
};
