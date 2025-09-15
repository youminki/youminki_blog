/**
 * 스마트 태그 생성 유틸리티
 * 제목과 내용을 분석하여 관련성 높은 태그를 자동 생성합니다.
 */

// 기술 키워드와 태그 매핑
const TECH_KEYWORDS = {
  // Frontend Framework
  react: ['React', 'Frontend', 'JavaScript'],
  vue: ['Vue', 'Frontend', 'JavaScript'],
  angular: ['Angular', 'Frontend', 'TypeScript'],
  next: ['Next.js', 'React', 'SSR', 'Frontend'],
  nuxt: ['Nuxt', 'Vue', 'SSR', 'Frontend'],
  svelte: ['Svelte', 'Frontend', 'JavaScript'],

  // Backend & Database
  node: ['Node.js', 'Backend', 'JavaScript'],
  express: ['Express', 'Node.js', 'Backend'],
  nest: ['NestJS', 'Node.js', 'Backend', 'TypeScript'],
  mongodb: ['MongoDB', 'Database', 'NoSQL'],
  mysql: ['MySQL', 'Database', 'SQL'],
  postgresql: ['PostgreSQL', 'Database', 'SQL'],
  redis: ['Redis', 'Cache', 'Database'],

  // Language & Type
  typescript: ['TypeScript', 'JavaScript', 'Programming'],
  javascript: ['JavaScript', 'Programming'],
  python: ['Python', 'Programming'],
  java: ['Java', 'Programming'],
  go: ['Go', 'Programming'],
  rust: ['Rust', 'Programming'],

  // Tools & Libraries
  webpack: ['Webpack', 'Build Tool', 'Frontend'],
  vite: ['Vite', 'Build Tool', 'Frontend'],
  babel: ['Babel', 'Build Tool', 'JavaScript'],
  eslint: ['ESLint', 'Code Quality', 'JavaScript'],
  prettier: ['Prettier', 'Code Quality', 'Formatting'],
  jest: ['Jest', 'Testing', 'JavaScript'],
  cypress: ['Cypress', 'Testing', 'E2E'],
  storybook: ['Storybook', 'Component', 'Documentation'],

  // CSS & Styling
  css: ['CSS', 'Styling', 'Frontend'],
  scss: ['SCSS', 'CSS', 'Styling'],
  sass: ['Sass', 'CSS', 'Styling'],
  tailwind: ['Tailwind CSS', 'CSS', 'Styling'],
  'styled-components': ['Styled Components', 'CSS-in-JS', 'React'],
  emotion: ['Emotion', 'CSS-in-JS', 'React'],

  // State Management
  redux: ['Redux', 'State Management', 'React'],
  zustand: ['Zustand', 'State Management', 'React'],
  recoil: ['Recoil', 'State Management', 'React'],
  mobx: ['MobX', 'State Management', 'React'],
  context: ['Context API', 'State Management', 'React'],

  // Performance & Optimization
  performance: ['Performance', 'Optimization', 'Frontend'],
  lcp: ['LCP', 'Performance', 'Core Web Vitals'],
  fcp: ['FCP', 'Performance', 'Core Web Vitals'],
  cls: ['CLS', 'Performance', 'Core Web Vitals'],
  lazy: ['Lazy Loading', 'Performance', 'Optimization'],
  memo: ['Memoization', 'Performance', 'React'],
  virtual: ['Virtual Scrolling', 'Performance', 'Optimization'],

  // Testing
  testing: ['Testing', 'Quality Assurance'],
  unit: ['Unit Testing', 'Testing'],
  integration: ['Integration Testing', 'Testing'],
  e2e: ['E2E Testing', 'Testing'],
  tdd: ['TDD', 'Testing', 'Development'],
  bdd: ['BDD', 'Testing', 'Development'],

  // DevOps & Deployment
  docker: ['Docker', 'DevOps', 'Containerization'],
  kubernetes: ['Kubernetes', 'DevOps', 'Containerization'],
  aws: ['AWS', 'Cloud', 'DevOps'],
  vercel: ['Vercel', 'Deployment', 'Frontend'],
  netlify: ['Netlify', 'Deployment', 'Frontend'],
  github: ['GitHub', 'Version Control', 'DevOps'],
  ci: ['CI/CD', 'DevOps', 'Automation'],
  cd: ['CI/CD', 'DevOps', 'Automation'],

  // Architecture & Patterns
  microservice: ['Microservice', 'Architecture', 'Backend'],
  monolith: ['Monolith', 'Architecture', 'Backend'],
  mvc: ['MVC', 'Architecture', 'Pattern'],
  mvp: ['MVP', 'Architecture', 'Pattern'],
  clean: ['Clean Architecture', 'Architecture', 'Pattern'],
  ddd: ['DDD', 'Architecture', 'Pattern'],

  // Security
  security: ['Security', 'Authentication'],
  jwt: ['JWT', 'Authentication', 'Security'],
  oauth: ['OAuth', 'Authentication', 'Security'],
  cors: ['CORS', 'Security', 'Web'],
  csrf: ['CSRF', 'Security', 'Web'],
  xss: ['XSS', 'Security', 'Web'],
  sql: ['SQL Injection', 'Security', 'Database'],

  // Data & Analytics
  api: ['API', 'Backend', 'Integration'],
  rest: ['REST API', 'API', 'Backend'],
  graphql: ['GraphQL', 'API', 'Backend'],
  websocket: ['WebSocket', 'Real-time', 'Communication'],
  sse: ['Server-Sent Events', 'Real-time', 'Communication'],
  pwa: ['PWA', 'Progressive Web App', 'Frontend'],

  // Mobile & Cross-platform
  'react-native': ['React Native', 'Mobile', 'Cross-platform'],
  flutter: ['Flutter', 'Mobile', 'Cross-platform'],
  ionic: ['Ionic', 'Mobile', 'Cross-platform'],
  electron: ['Electron', 'Desktop', 'Cross-platform'],

  // AI & Machine Learning
  ai: ['AI', 'Machine Learning', 'Artificial Intelligence'],
  ml: ['Machine Learning', 'AI', 'Data Science'],
  tensorflow: ['TensorFlow', 'Machine Learning', 'AI'],
  pytorch: ['PyTorch', 'Machine Learning', 'AI'],

  // Development Practices
  agile: ['Agile', 'Development', 'Methodology'],
  scrum: ['Scrum', 'Agile', 'Development'],
  kanban: ['Kanban', 'Agile', 'Development'],
  refactoring: ['Refactoring', 'Code Quality', 'Development'],
  'clean-code': ['Clean Code', 'Code Quality', 'Development'],
  solid: ['SOLID', 'Principles', 'Development'],
  dry: ['DRY', 'Principles', 'Development'],
  kiss: ['KISS', 'Principles', 'Development'],

  // Problem Solving
  bug: ['Bug Fix', 'Debugging', 'Problem Solving'],
  debug: ['Debugging', 'Problem Solving'],
  error: ['Error Handling', 'Problem Solving'],
  exception: ['Exception Handling', 'Problem Solving'],
  memory: ['Memory Management', 'Performance', 'Optimization'],
  leak: ['Memory Leak', 'Performance', 'Bug Fix'],
  optimization: ['Optimization', 'Performance'],
  scalability: ['Scalability', 'Architecture', 'Performance'],

  // Experience & Learning
  experience: ['Experience', 'Learning', 'Career'],
  learning: ['Learning', 'Education', 'Growth'],
  tutorial: ['Tutorial', 'Learning', 'Education'],
  guide: ['Guide', 'Learning', 'Education'],
  'best-practice': ['Best Practice', 'Learning', 'Development'],
  tips: ['Tips', 'Learning', 'Development'],
  tricks: ['Tricks', 'Learning', 'Development'],
  patterns: ['Patterns', 'Learning', 'Development'],
} as const;

// 카테고리별 기본 태그
const CATEGORY_DEFAULT_TAGS = {
  React: ['React', 'Frontend', 'JavaScript'],
  TypeScript: ['TypeScript', 'JavaScript', 'Programming'],
  'Next.js': ['Next.js', 'React', 'SSR'],
  JavaScript: ['JavaScript', 'Programming'],
  Performance: ['Performance', 'Optimization', 'Frontend'],
  Frontend: ['Frontend', 'Web Development'],
  Programming: ['Programming', 'Development'],
  '경험했던 이슈': ['Experience', 'Problem Solving', 'Learning'],
} as const;

/**
 * 텍스트에서 키워드를 추출하는 함수
 */
const extractKeywords = (text: string): string[] => {
  const lowerText = text.toLowerCase();
  const keywords: string[] = [];

  for (const [keyword, tags] of Object.entries(TECH_KEYWORDS)) {
    if (lowerText.includes(keyword)) {
      keywords.push(...tags);
    }
  }

  return keywords;
};

/**
 * 제목에서 관련 키워드를 추출하는 함수
 */
const extractTitleKeywords = (title: string): string[] => {
  const keywords: string[] = [];

  // 제목에서 더 정확한 매칭을 위한 패턴
  const titlePatterns = [
    { pattern: /react/i, tags: ['React', 'Frontend', 'JavaScript'] },
    {
      pattern: /typescript/i,
      tags: ['TypeScript', 'JavaScript', 'Programming'],
    },
    { pattern: /next\.?js/i, tags: ['Next.js', 'React', 'SSR'] },
    { pattern: /javascript/i, tags: ['JavaScript', 'Programming'] },
    { pattern: /performance/i, tags: ['Performance', 'Optimization'] },
    { pattern: /optimization/i, tags: ['Optimization', 'Performance'] },
    { pattern: /testing/i, tags: ['Testing', 'Quality Assurance'] },
    { pattern: /api/i, tags: ['API', 'Backend'] },
    { pattern: /database/i, tags: ['Database', 'Backend'] },
    { pattern: /security/i, tags: ['Security', 'Authentication'] },
    { pattern: /deployment/i, tags: ['Deployment', 'DevOps'] },
    { pattern: /docker/i, tags: ['Docker', 'DevOps', 'Containerization'] },
    { pattern: /aws/i, tags: ['AWS', 'Cloud', 'DevOps'] },
    { pattern: /error/i, tags: ['Error Handling', 'Problem Solving'] },
    { pattern: /bug/i, tags: ['Bug Fix', 'Debugging', 'Problem Solving'] },
    { pattern: /memory/i, tags: ['Memory Management', 'Performance'] },
    { pattern: /leak/i, tags: ['Memory Leak', 'Performance', 'Bug Fix'] },
    { pattern: /scalability/i, tags: ['Scalability', 'Architecture'] },
    { pattern: /refactoring/i, tags: ['Refactoring', 'Code Quality'] },
    { pattern: /clean/i, tags: ['Clean Code', 'Code Quality'] },
    { pattern: /architecture/i, tags: ['Architecture', 'Design Pattern'] },
    { pattern: /pattern/i, tags: ['Design Pattern', 'Architecture'] },
    { pattern: /best practice/i, tags: ['Best Practice', 'Learning'] },
    { pattern: /tutorial/i, tags: ['Tutorial', 'Learning', 'Education'] },
    { pattern: /guide/i, tags: ['Guide', 'Learning', 'Education'] },
    { pattern: /experience/i, tags: ['Experience', 'Learning', 'Career'] },
    { pattern: /learning/i, tags: ['Learning', 'Education', 'Growth'] },
  ];

  for (const { pattern, tags } of titlePatterns) {
    if (pattern.test(title)) {
      keywords.push(...tags);
    }
  }

  return keywords;
};

/**
 * 내용에서 관련 키워드를 추출하는 함수
 */
const extractContentKeywords = (content: string): string[] => {
  return extractKeywords(content);
};

/**
 * 태그의 관련성을 계산하는 함수
 */
const calculateTagRelevance = (
  tag: string,
  title: string,
  content: string
): number => {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();
  const lowerTag = tag.toLowerCase();

  let score = 0;

  // 제목에서 발견되면 높은 점수
  if (lowerTitle.includes(lowerTag)) {
    score += 10;
  }

  // 내용에서 발견되면 중간 점수
  const contentMatches = (lowerContent.match(new RegExp(lowerTag, 'g')) || [])
    .length;
  score += contentMatches * 2;

  // 태그 길이에 따른 가중치 (짧은 태그는 더 일반적)
  if (tag.length <= 3) {
    score *= 0.5;
  } else if (tag.length <= 6) {
    score *= 0.8;
  }

  return score;
};

/**
 * 태그를 관련성 순으로 정렬하는 함수
 */
const sortTagsByRelevance = (
  tags: string[],
  title: string,
  content: string
): string[] => {
  return tags
    .map(tag => ({
      tag,
      relevance: calculateTagRelevance(tag, title, content),
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .map(item => item.tag);
};

/**
 * 스마트 태그를 생성하는 메인 함수
 */
export const generateSmartTags = (
  title: string,
  content: string,
  category: string,
  existingTags: string[] = []
): string[] => {
  // 1. 카테고리 기본 태그
  const categoryTags =
    CATEGORY_DEFAULT_TAGS[category as keyof typeof CATEGORY_DEFAULT_TAGS] || [];

  // 2. 제목에서 키워드 추출
  const titleKeywords = extractTitleKeywords(title);

  // 3. 내용에서 키워드 추출
  const contentKeywords = extractContentKeywords(content);

  // 4. 기존 태그와 합치기
  const allTags = [
    ...categoryTags,
    ...titleKeywords,
    ...contentKeywords,
    ...existingTags,
  ];

  // 5. 중복 제거
  const uniqueTags = Array.from(new Set(allTags));

  // 6. 관련성 순으로 정렬
  const sortedTags = sortTagsByRelevance(uniqueTags, title, content);

  // 7. 상위 8개 태그만 반환 (너무 많으면 UI가 복잡해짐)
  return sortedTags.slice(0, 8);
};

/**
 * 태그의 우선순위를 결정하는 함수
 */
export const getTagPriority = (
  tag: string,
  title: string,
  content: string
): 'high' | 'medium' | 'low' => {
  const relevance = calculateTagRelevance(tag, title, content);

  if (relevance >= 8) return 'high';
  if (relevance >= 4) return 'medium';
  return 'low';
};

/**
 * 태그를 그룹화하는 함수
 */
export const groupTagsByType = (
  tags: string[]
): {
  technologies: string[];
  concepts: string[];
  tools: string[];
  practices: string[];
  others: string[];
} => {
  const groups = {
    technologies: [] as string[],
    concepts: [] as string[],
    tools: [] as string[],
    practices: [] as string[],
    others: [] as string[],
  };

  const techKeywords = [
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'Java',
    'Go',
    'Rust',
  ];
  const conceptKeywords = [
    'Performance',
    'Architecture',
    'Security',
    'Scalability',
    'Optimization',
  ];
  const toolKeywords = [
    'Docker',
    'AWS',
    'GitHub',
    'Vercel',
    'Webpack',
    'Vite',
    'ESLint',
  ];
  const practiceKeywords = [
    'Testing',
    'Refactoring',
    'Clean Code',
    'Best Practice',
    'TDD',
    'Agile',
  ];

  tags.forEach(tag => {
    if (techKeywords.some(keyword => tag.includes(keyword))) {
      groups.technologies.push(tag);
    } else if (conceptKeywords.some(keyword => tag.includes(keyword))) {
      groups.concepts.push(tag);
    } else if (toolKeywords.some(keyword => tag.includes(keyword))) {
      groups.tools.push(tag);
    } else if (practiceKeywords.some(keyword => tag.includes(keyword))) {
      groups.practices.push(tag);
    } else {
      groups.others.push(tag);
    }
  });

  return groups;
};
