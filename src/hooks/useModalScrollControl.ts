import { useEffect } from 'react';

/**
 * 모달이 열릴 때 배경 스크롤을 제어하고 헤더를 숨기는 커스텀 훅
 * @param isOpen 모달이 열려있는지 여부
 */
export const useModalScrollControl = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 배경 스크롤 비활성화
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
      document.body.classList.add('modal-open');
    } else {
      // 모달이 닫힐 때 배경 스크롤 활성화
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.classList.remove('modal-open');
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);
};
