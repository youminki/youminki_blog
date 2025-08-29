const Projects = () => {
  const projects = [
    {
      title: 'Melpik 의류 대여 서비스',
      description:
        'React, TypeScript, Vite를 활용한 풀스택 웹 애플리케이션으로, 사용자 인증부터 상품 관리, 대여 서비스, 결제 시스템까지 전체 기능을 구현했습니다.',
      technologies: ['React', 'TypeScript', 'Vite', 'Styled Components'],
    },
  ];

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span>🚀</span>
        Projects
      </h2>
      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-8 hover:bg-gray-750 transition-colors"
          >
            <div className="grid grid-cols-1 gap-6">
              <h3 className="text-2xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-colors"
                  >
                    {tech}
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

export default Projects;
