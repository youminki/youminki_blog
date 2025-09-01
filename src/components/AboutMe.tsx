import { MdPerson } from 'react-icons/md';
import { EXPERIENCES } from '../data';

const AboutMe = () => {
  return (
    <div>
      <h2 className="section-title flex items-center gap-4">
        <MdPerson className="text-[var(--accent-color)] text-xl" />
        About me
      </h2>
      <div className="space-y-6">
        {EXPERIENCES.map((exp, index) => (
          <div key={index} className="relative">
            <div className="section-card">
              {index > 0 && (
                <div className="section-divider mb-2">
                  <div className="section-divider-dot"></div>
                </div>
              )}
              <h3 className="text-xl font-semibold text-[var(--text-primary)] compact-title">
                {exp.title}
              </h3>
              <p className="section-content">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMe;
