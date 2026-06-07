import { motion } from "framer-motion";

interface ProjectsProps {
  projects: any[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 bg-[#0a0f1c]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-400 font-semibold">PORTFOLIO</p>
          <h2 className="text-5xl font-bold mt-3">Featured Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -10 }}
              className="bg-[#1e2937] rounded-3xl overflow-hidden border border-slate-700 hover:border-indigo-500 transition-all"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-slate-400 mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      className="flex-1 text-center py-3 border border-slate-600 rounded-2xl hover:bg-slate-800 transition"
                    >
                      GitHub
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      className="flex-1 text-center py-3 bg-indigo-600 rounded-2xl hover:bg-indigo-700 transition"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
