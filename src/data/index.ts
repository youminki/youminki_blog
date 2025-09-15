// 내부 import
import { PROJECTS_DATA } from './projects';
import { SKILLS_DATA } from './skills';
import { PERSONAL_INFO, CONTACT_INFO, SOCIAL_LINKS } from './personal';
import {
  EXPERIENCES,
  EDUCATION_DATA,
  CAREER_GOALS,
  WORK_EXPERIENCES,
} from './career';
import { BLOG_POSTS, getAllCategories } from './blog';

import {
  APP_CONFIG,
  THEME_CONFIG,
  COLORS,
  LAYOUT,
  ANIMATIONS,
  SOCIAL_PLATFORMS,
  SKILL_LEVELS,
  PROJECT_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from './constants';
import type { Project, Skill, SkillCategory, BlogPost } from '../types';

// 프로젝트 데이터
export { PROJECTS_DATA };
export type { Project };

// 스킬 데이터
export { SKILLS_DATA };
export type { Skill, SkillCategory };

// 블로그 데이터
export { BLOG_POSTS, getAllCategories };
export type { BlogPost };

// 개인 정보 및 연락처
export { PERSONAL_INFO, CONTACT_INFO, SOCIAL_LINKS };

// 경력 및 교육
export { EXPERIENCES, EDUCATION_DATA, CAREER_GOALS, WORK_EXPERIENCES };
export type {
  Experience,
  Education,
  CareerGoal,
  WorkExperience,
} from './career';

// 상수 데이터
export {
  APP_CONFIG,
  THEME_CONFIG,
  COLORS,
  LAYOUT,
  ANIMATIONS,
  SOCIAL_PLATFORMS,
  SKILL_LEVELS,
  PROJECT_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};

// 전체 데이터 객체 (선택적 사용)
export const DATA = {
  projects: PROJECTS_DATA,
  skills: SKILLS_DATA,
  personal: PERSONAL_INFO,
  contact: CONTACT_INFO,
  social: SOCIAL_LINKS,
  experiences: EXPERIENCES,
  workExperiences: WORK_EXPERIENCES,
  education: EDUCATION_DATA,
  careerGoals: CAREER_GOALS,
  config: APP_CONFIG,
  theme: THEME_CONFIG,
  colors: COLORS,
  layout: LAYOUT,
  animations: ANIMATIONS,
} as const;

// 데이터 검증 함수들
export const validateProjectData = (projects: Project[]): boolean => {
  return projects.every(
    project =>
      project.id &&
      project.title &&
      project.description &&
      project.technologies &&
      project.features &&
      project.image
  );
};

export const validateSkillData = (skills: SkillCategory[]): boolean => {
  return skills.every(
    category =>
      category.title &&
      category.skills &&
      category.skills.every(skill => skill.name !== undefined)
  );
};

// 데이터 필터링 유틸리티
export const getProjectsByTechnology = (technology: string): Project[] => {
  return PROJECTS_DATA.filter(project =>
    project.technologies.some(tech =>
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};

export const getSkillsByCategory = (categoryTitle: string): Skill[] => {
  const category = SKILLS_DATA.find(cat =>
    cat.title.toLowerCase().includes(categoryTitle.toLowerCase())
  );
  return category?.skills || [];
};

export const getUnderlinedSkills = (): Skill[] => {
  return SKILLS_DATA.flatMap(category =>
    category.skills.filter(skill => skill.underlined)
  );
};
