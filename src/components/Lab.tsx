import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const labs = [
  {
    titleEs: "Desarrollo Asistido por IA",
    titleEn: "AI Assisted Development",

    descriptionEs:
      "Investigación y aplicación práctica de herramientas de IA generativa como ChatGPT y Claude para mejorar el desarrollo de software, la documentación, la depuración y la productividad.",

    descriptionEn:
      "Research and practical application of generative AI tools such as ChatGPT and Claude to improve software development, documentation, debugging and productivity.",
  },

  {
    titleEs: "Arquitectura de Software",
    titleEn: "Software Architecture",

    descriptionEs:
      "Diseño y evaluación de arquitecturas Full Stack escalables utilizando .NET, React, APIs REST, SQL y MongoDB.",

    descriptionEn:
      "Design and evaluation of scalable Full Stack architectures using .NET, React, REST APIs, SQL and MongoDB.",
  },

  {
    titleEs: "Automatización y Productividad",
    titleEn: "Automation & Productivity",

    descriptionEs:
      "Desarrollo de herramientas, scripts y flujos de trabajo orientados a reducir tareas repetitivas y mejorar la eficiencia.",

    descriptionEn:
      "Development of tools, scripts and workflows focused on reducing repetitive tasks and improving development efficiency.",
  },

  {
    titleEs: "Experimentos con Unity",
    titleEn: "Unity Experiments",

    descriptionEs:
      "Aplicaciones interactivas, técnicas de renderizado, sistemas de juego y proyectos experimentales desarrollados con Unity y C#.",

    descriptionEn:
      "Interactive applications, rendering techniques, game systems and experimental projects developed with Unity and C#.",
  },

  {
    titleEs: "Utilidades PowerShell",
    titleEn: "PowerShell Utilities",

    descriptionEs:
      "Herramientas de línea de comandos y scripts de automatización para simplificar tareas administrativas y flujos de desarrollo.",

    descriptionEn:
      "Command-line tools and automation scripts created to simplify system administration and development workflows.",
  },

  {
    titleEs: "Investigación Tecnológica",
    titleEn: "Technology Research",

    descriptionEs:
      "Exploración continua de nuevas tecnologías, frameworks, metodologías y buenas prácticas de ingeniería.",

    descriptionEn:
      "Continuous exploration of emerging technologies, frameworks, methodologies and engineering practices.",
  },
];

const Lab = () => {
  const { t, i18n } = useTranslation();

  const isSpanish = i18n.language.startsWith("es");

  return (
    <section
      id="lab"
      className="max-w-6xl mx-auto px-6 py-4"
    >
      <h2
        className="
          text-4xl
          font-bold
          mb-6
          text-yellow-400
          text-center
          w-full
        "
      >
        {t("lab.title")}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {labs.map((item) => (
          <motion.div
            key={item.titleEn}
            whileHover={{ y: -4 }}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
            "
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              {isSpanish ? item.titleEs : item.titleEn}
            </h3>

            <p className="text-ivory">
              {isSpanish
                ? item.descriptionEs
                : item.descriptionEn}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Lab;