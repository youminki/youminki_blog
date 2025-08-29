import { MdRocketLaunch } from 'react-icons/md';

const Projects = () => {
  const projects = [
    {
      title: '',
      description: '',
      technologies: [],
    },
  ];

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
        <MdRocketLaunch className="text-[var(--accent-color)] text-2xl" />
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
