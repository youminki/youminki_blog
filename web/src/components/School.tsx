import { MdSchool } from 'react-icons/md';

const School = () => {
  const experiences = [
    {
      title: '명지대학교 컴퓨터공학과',
      description: '2019.03 ~ 2025.08 (4년제, 졸업)',
    },
  ];

  return (
    <section>
      <h2 className="section-title flex items-center gap-4">
        <MdSchool className="text-[var(--accent-color)] text-xl" />
        School
      </h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
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
    </section>
  );
};

export default School;
