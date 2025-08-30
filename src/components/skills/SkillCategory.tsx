import React from 'react';
import type { SkillCategory as SkillCategoryType } from '../../types';
import SkillChip from './SkillChip';

interface SkillCategoryProps {
  category: SkillCategoryType;
}

const SkillCategory: React.FC<SkillCategoryProps> = React.memo(
  ({ category }) => {
    return (
      <div className="skills-card">
        <div className="section-card">
          <h3 className="text-base font-semibold text-[var(--text-primary)] compact-title">
            {category.title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {category.skills.map((skill, skillIndex) => (
              <SkillChip key={skillIndex} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

SkillCategory.displayName = 'SkillCategory';

export default SkillCategory;
