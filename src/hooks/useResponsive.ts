import { useState, useEffect } from 'react';

/**
 * 반응형 처리를 위한 커스텀 훅
 * @param breakpoint 모바일 기준점 (기본값: 768)
 * @returns { isMobile: boolean, isTablet: boolean, isDesktop: boolean, windowWidth: number }
 */
export const useResponsive = (breakpoint: number = 768) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width <= breakpoint);
      setIsTablet(width > breakpoint && width <= 1024);
      setIsDesktop(width > 1024);
    };

    // 초기 체크
    checkResponsive();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', checkResponsive);

    // 정리 함수
    return () => {
      window.removeEventListener('resize', checkResponsive);
    };
  }, [breakpoint]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    windowWidth,
  };
};
