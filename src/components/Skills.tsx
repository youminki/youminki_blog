import React from 'react';
import { MdBuild } from 'react-icons/md';
import { SKILLS_DATA } from '../data/skills';
import SkillCategory from './skills/SkillCategory';

const Skills: React.FC = () => {
  return (
    <section className="w-full">
      <h2 className="section-title flex items-center gap-4">
        <MdBuild className="text-[var(--accent-color)] text-xl" />
        Used Tool & Skill
      </h2>
      <p className="text-[var(--text-secondary)] mb-8 text-left text-sm leading-relaxed">
        <span className="text-red-500 font-medium">5회 이상</span> 사용해본
        스킬은 <span className="text-red-500 font-medium">밑줄</span>로 표시
        했습니다.
      </p>
      <div className="skills-single-row">
        {SKILLS_DATA.map((category, index) => (
          <SkillCategory key={index} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
