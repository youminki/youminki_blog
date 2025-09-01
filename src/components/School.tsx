import { MdSchool } from 'react-icons/md';
import { EDUCATION_DATA } from '../data';

const School = () => {
  return (
    <section>
      <h2 className="section-title flex items-center gap-4">
        <MdSchool className="text-[var(--accent-color)] text-xl" />
        School
      </h2>
      <div className="space-y-6">
        {EDUCATION_DATA.map((edu, index) => (
          <div key={index} className="relative">
            <div className="section-card">
              {index > 0 && (
                <div className="section-divider mb-2">
                  <div className="section-divider-dot"></div>
                </div>
              )}
              <h3 className="text-xl font-semibold text-[var(--text-primary)] compact-title">
                {edu.institution} {edu.degree}
              </h3>
              <p className="section-content">{edu.period}</p>
              {edu.description && (
                <p className="section-content mt-2">{edu.description}</p>
              )}
              {edu.achievements && edu.achievements.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {edu.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-[var(--text-secondary)] flex items-start"
                    >
                      <span className="text-[var(--accent-color)] mr-1">•</span>
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

export default School;
