import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchProjects } from "../services/api";
import { Github, ExternalLink, Code2 } from "lucide-react";
import ProjectModal from "./ProjectModal";
import type { Project } from "../types";
import { resolveProjectImage } from "../utils/projectImage";

export default function Projects() {
  // Destructure both t and i18n to listen for language toggles
  const { t, i18n } = useTranslation();
  const language = (
    i18n.resolvedLanguage || i18n.language
  ).toLowerCase().startsWith("de")
    ? "de"
    : "en";
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Modal tracking states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const {
    data: projects,
    isLoading,
    error,
    refetch,
  } = useQuery({
    // Adding i18n.language here clears the old cache and forces a fresh network
    // request to your Django server every single time the user clicks "Deutsch" or "English"
    queryKey: ["projects", i18n.language],
    queryFn: fetchProjects,
  });

  // fetchProjects normalizes both paginated and plain API responses.
  const projectsArray: Project[] = [...(projects ?? [])].sort(
    (a, b) => Number(a.id ?? 0) - Number(b.id ?? 0)
  );

  return (
    <section id="projects" className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section - Always visible */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            {t("projects.title")}
          </h2>
          <p className="text-lg sm:text-base text-slate-800 dark:text-slate-200 max-w-2xl mx-auto leading-relaxed">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Content Section */}
        {isLoading ? (
          // Loading skeleton
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : error ? (
          // Error state
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
              {t("projects.error")}
            </h3>
            <p className="text-base sm:text-base text-slate-700 dark:text-slate-300">
              {t("projects.errorText") || "Please try again later."}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-5 inline-flex items-center rounded-lg bg-cyan-700 px-5 py-2.5 font-medium text-white transition-colors hover:bg-cyan-800"
            >
              {t("projects.retry")}
            </button>
          </div>
        ) : projectsArray.length === 0 ? (
          // Empty state - No projects
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
              {t("projects.noProjects")}
            </h3>
            <p className="text-base sm:text-base text-slate-700 dark:text-slate-300">
              {t("projects.noProjectsText") ||
                "Check back soon for new projects!"}
            </p>
          </div>
        ) : (
          // Projects grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsArray.map((project: Project, index: number) => (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={resolveProjectImage(
                      project.image,
                      `https://picsum.photos/seed/${project.id || index}/400/300`,
                    )}
                    alt={
                      language === "de"
                        ? project.title_de || project.title
                        : project.title_en || project.title
                    }
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                    {language === "de"
                      ? project.title_de || project.title
                      : project.title_en || project.title}
                  </h3>
                  <p className="text-base sm:text-base text-slate-700 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                    {language === "de"
                      ? project.description_de || project.description
                      : project.description_en || project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.slice(0, 5).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-base sm:text-xs rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-900 dark:text-cyan-400 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {(project.github_url || project.github_link) && (
                      <a
                        href={project.github_url || project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-cyan-100 dark:hover:bg-cyan-900 transition-colors"
                        title={t("projects.github")}
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {(project.live_url || project.live_demo || project.liveUrl) && (
                      <a
                        href={project.live_url || project.live_demo || project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-cyan-100 dark:hover:bg-cyan-900 transition-colors"
                        title={t("projects.liveDemo")}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setIsModalOpen(true);
                      }}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-cyan-100 dark:hover:bg-cyan-900 transition-colors"
                      title={t("projects.details")}
                    >
                      <Code2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Global Project Modal Anchor Point */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProject(null);
          }}
          t={t}
        />
      )}
    </section>
  );
}
