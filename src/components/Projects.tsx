import { PROJECTS } from "../data/profile";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { i18n } = useTranslation();

  const isSpanish = i18n.language.startsWith("es");

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <h2 className="text-4xl font-bold mb-12 text-yellow-400">
        {isSpanish ? "Mis proyectos" : "My projects"}
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <article
            key={project.title}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              overflow-hidden
              hover:border-blue-500
              transition
            "
          >
            <img
              src={project.banner}
              alt={project.title}
              className="
                w-full
                h-56
                object-cover
              "
            />

            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-blue-400">
                {project.title}
              </h3>

              <p className="text-slate-400 mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="
                      px-3
                      py-1
                      text-sm
                      rounded-full
                      bg-slate-800
                      border
                      border-yellow-400
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    text-yellow-400
                    hover:text-yellow-300
                  "
                >
                  {isSpanish
                    ? "Ver repositorio →"
                    : "View repository →"}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;