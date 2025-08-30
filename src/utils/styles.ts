// 공통 스타일 클래스들을 함수로 추출
export const getProjectCardClasses = () =>
  'project-card bg-gray-800 rounded-xl border border-gray-700 hover:border-transparent transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl overflow-hidden relative group rainbow-border';

export const getSectionCardClasses = () => 'section-card';

export const getSkillChipClasses = (underlined: boolean) =>
  `skill-chip ${underlined ? 'skill-chip-underlined' : ''}`;

export const getModalClasses = () =>
  'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';

export const getButtonClasses = (
  variant: 'primary' | 'secondary' = 'primary'
) => {
  const baseClasses =
    'px-8 py-4 rounded-lg transition-all duration-200 flex items-center gap-4 justify-center hover:scale-105 transform';

  if (variant === 'primary') {
    return `${baseClasses} bg-[var(--accent-color)] text-white hover:opacity-90`;
  }

  return `${baseClasses} bg-gray-700 text-white hover:bg-gray-600`;
};
