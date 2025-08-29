const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React 18/19', 'TypeScript', 'Vite', 'Styled Components'],
      color: 'bg-blue-400',
    },
    {
      title: 'Development Tools',
      skills: ['ESLint + Prettier', 'Jest + RTL', 'Storybook', 'Git + CI/CD'],
      color: 'bg-green-400',
    },
  ];

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span>🛠️</span>
        Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
          >
            <h3 className="text-lg font-semibold text-white mb-6 text-center border-b border-gray-700 pb-3">
              {category.title}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors"
                >
                  <span
                    className={`w-2 h-2 ${category.color} rounded-full flex-shrink-0`}
                  ></span>
                  <span className="text-gray-300">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
