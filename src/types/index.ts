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
  icon: React.ComponentType<any>;
}
