import React from 'react';
import type { Skill } from '../../types';

interface SkillChipProps {
  skill: Skill;
}

const SkillChip: React.FC<SkillChipProps> = React.memo(({ skill }) => {
  return (
    <span
      className={`skill-chip ${skill.underlined ? 'skill-chip-underlined' : ''}`}
    >
      {skill.name}
    </span>
  );
});

SkillChip.displayName = 'SkillChip';

export default SkillChip;
