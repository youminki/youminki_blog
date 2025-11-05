export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  image: string;
  images?: string[];
}

export interface Skill {
  name: string;
  underlined: boolean;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'link' | 'github';
  value: string;
  url?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// 데이터 관련 추가 타입들
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
  summary: string;
  quote: string;
}

export interface SocialLink {
  url: string;
  label: string;
}

export interface AppConfig {
  title: string;
  description: string;
  version: string;
  author: string;
  keywords: string[];
}

// 블로그 관련 타입들
export interface BlogPost {
  id: number;
  title: string;
  url: string;
  category: string;
  date: string;
  tags: string[];
  postType?: 'react19' | 'typescript59' | 'custom';
  summary: string;
}
