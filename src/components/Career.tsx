import { MdWork } from 'react-icons/md';

const Career = () => {
  const experiences = [
    {
      title: '리프트콤마 - 프론트엔드 개발자',
      description: '2024.08 ~ 재직중 (프리랜서)',
    },
  ];

  return (
    <section>
      <h2 className="section-title flex items-center gap-4">
        <MdWork className="text-[var(--accent-color)] text-xl" />
        Career
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

export default Career;
