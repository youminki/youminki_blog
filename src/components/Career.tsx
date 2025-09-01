import { MdWork } from 'react-icons/md';
import { WORK_EXPERIENCES } from '../data';

const Career = () => {
  return (
    <section>
      <h2 className="section-title flex items-center gap-4">
        <MdWork className="text-[var(--accent-color)] text-xl" />
        Career
      </h2>
      <div className="space-y-6">
        {WORK_EXPERIENCES.map((exp, index) => (
          <div key={index} className="relative">
            <div className="section-card">
              {index > 0 && (
                <div className="section-divider mb-2">
                  <div className="section-divider-dot"></div>
                </div>
              )}
              <h3 className="text-xl font-semibold text-[var(--text-primary)] compact-title">
                {exp.company} - {exp.position}
              </h3>
              <p className="section-content">
                {exp.period} ({exp.type === 'freelance' ? '프리랜서' : '정규직'}
                )
              </p>
              {exp.description && (
                <p className="section-content mt-2">{exp.description}</p>
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {exp.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-[var(--text-secondary)] flex items-start"
                    >
                      <span className="text-[var(--accent-color)] mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Career;
