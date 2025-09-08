import { useCallback, useMemo } from 'react';

/**
 * URL 쿼리 파라미터를 관리하는 커스텀 훅
 */
export const useUrlParams = () => {
  // 현재 URL의 쿼리 파라미터를 파싱
  const urlParams = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      tab: params.get('tab') || null,
      blogId: params.get('blogId') ? parseInt(params.get('blogId')!) : null,
      projectId: params.get('projectId')
        ? parseInt(params.get('projectId')!)
        : null,
      category: params.get('category') || null,
    };
  }, []);

  // URL 업데이트 함수
  const updateUrl = useCallback(
    (updates: {
      tab?: string | null;
      blogId?: number | null;
      projectId?: number | null;
      category?: string | null;
    }) => {
      const params = new URLSearchParams(window.location.search);

      // 각 파라미터 업데이트
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, value.toString());
        }
      });

      // URL 업데이트 (히스토리 스택에 추가)
      const newUrl = `${window.location.pathname}${
        params.toString() ? `?${params.toString()}` : ''
      }`;
      window.history.pushState({}, '', newUrl);
    },
    []
  );

  // 특정 파라미터만 제거
  const removeParam = useCallback((paramName: string) => {
    const params = new URLSearchParams(window.location.search);
    params.delete(paramName);

    const newUrl = `${window.location.pathname}${
      params.toString() ? `?${params.toString()}` : ''
    }`;
    window.history.pushState({}, '', newUrl);
  }, []);

  // 모든 파라미터 제거
  const clearParams = useCallback(() => {
    window.history.pushState({}, '', window.location.pathname);
  }, []);

  return {
    urlParams,
    updateUrl,
    removeParam,
    clearParams,
  };
};
