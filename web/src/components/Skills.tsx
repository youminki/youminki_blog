import { MdBuild } from 'react-icons/md';

const Skills = () => {
  const experiences = [
    {
      title: 'Skills (Front-end)',
      skills: [
        { name: 'React.js', underlined: true },
        { name: 'Vite', underlined: true },
        { name: 'Next.js', underlined: true },
        { name: 'Styled-components', underlined: true },
        { name: 'CSS-in-JS', underlined: true },
        { name: 'TailwindCss', underlined: false },
        { name: 'Chakra.UI', underlined: false },
        { name: 'AntD', underlined: false },
        { name: 'Shadcn', underlined: false },
        { name: 'Framer-Motion', underlined: false },
        { name: 'Axios', underlined: true },
        { name: 'Tanstack-Query', underlined: false },
        { name: 'React Hook Form', underlined: true },
        { name: 'React Context', underlined: true },
        { name: 'Zustand', underlined: false },
        { name: 'Recoil', underlined: true },
        { name: 'Redux', underlined: false },
      ],
    },
    {
      title: 'Mobile & Cross-platform',
      skills: [
        { name: 'React Native', underlined: false },
        { name: 'iOS', underlined: false },
        { name: 'SwiftUI', underlined: false },
        { name: 'Android', underlined: false },
        { name: 'Kotlin', underlined: false },
        { name: 'WebView Integration', underlined: false },
        { name: 'Native Bridge', underlined: false },
      ],
    },
    {
      title: 'Language & Deployment',
      skills: [
        { name: 'Javascript', underlined: true },
        { name: 'Typescript', underlined: true },
        { name: 'Vercel', underlined: true },
        { name: 'Netlify', underlined: true },
        { name: 'GitHub Pages', underlined: false },
        { name: 'Nginx', underlined: false },
        { name: 'CloudFlare', underlined: false },
        { name: 'Docker', underlined: false },
      ],
    },
    {
      title: 'Tools & Communication',
      skills: [
        { name: 'Git', underlined: true },
        { name: 'Github', underlined: true },
        { name: 'Gitlab', underlined: false },
        { name: 'Storybook', underlined: false },
        { name: 'Husky', underlined: false },
        { name: 'Lint-staged', underlined: false },
        { name: 'Figma', underlined: true },
        { name: 'Figjam', underlined: false },
        { name: 'Zeplin', underlined: false },
        { name: 'Discord', underlined: false },
        { name: 'Slack', underlined: true },
        { name: 'Notion', underlined: true },
        { name: 'Tistory', underlined: true },
      ],
    },
  ];

  return (
    <section className="w-full">
      <h2 className="section-title flex items-center gap-4">
        <MdBuild className="text-[var(--accent-color)] text-xl" />
        Used Tool & Skill
      </h2>
      <p className="text-[var(--text-secondary)] mb-6 text-left text-sm">
        5회 이상 사용해본 스킬은 밑줄로 표시 했습니다.
      </p>
      <div className="skills-single-row">
        {experiences.map((exp, index) => (
          <div key={index} className="skills-card">
            <div className="section-card">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] compact-title">
                {exp.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {exp.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`skill-chip ${skill.underlined ? 'skill-chip-underlined' : ''}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
