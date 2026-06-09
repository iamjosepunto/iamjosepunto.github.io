import { useTranslation } from "react-i18next";

const skillGroups = [
  {
    titleEs: "Backend",
    titleEn: "Backend",
    descriptionEs:
      "Desarrollo backend empresarial, APIs, bases de datos y arquitecturas escalables.",
    descriptionEn:
      "Enterprise backend development, APIs, databases and scalable architectures.",
    skills: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "ASP.NET MVC",
      "REST APIs",
      "SQL Server",
      "MongoDB",
    ],
  },

  {
    titleEs: "Frontend",
    titleEn: "Frontend",
    descriptionEs:
      "Aplicaciones web modernas e interfaces de usuario responsivas.",
    descriptionEn:
      "Modern web applications and responsive user interfaces.",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Blazor",
      "Razor",
      "Tailwind CSS",
      "Vite",
    ],
  },

  {
    titleEs: "Móvil e Interactivo",
    titleEn: "Mobile & Interactive",
    descriptionEs:
      "Aplicaciones móviles y experiencias interactivas desarrolladas con Unity y .NET.",
    descriptionEn:
      "Mobile applications and interactive experiences built with Unity and .NET.",
    skills: [
      "Unity",
      ".NET Mobile",
      "C#",
    ],
  },

  {
    titleEs: "Herramientas y Metodologías",
    titleEn: "Tools & Methodologies",
    descriptionEs:
      "Flujos de desarrollo, control de versiones y metodologías ágiles.",
    descriptionEn:
      "Development workflows, version control and agile methodologies.",
    skills: [
      "Git",
      "PowerShell",
      "Scrum",
      "Agile",
      "Software Architecture",
    ],
  },

  {
    titleEs: "Inteligencia Artificial",
    titleEn: "Artificial Intelligence",
    descriptionEs:
      "Uso práctico de IA generativa aplicada al desarrollo de software y automatización.",
    descriptionEn:
      "Practical use of generative AI for software development and automation.",
    skills: [
      "ChatGPT",
      "Claude",
      "AI Assisted Development",
      "Prompt Engineering",
    ],
  },
];

const Skills = () => {
  const { t, i18n } = useTranslation();

  const isSpanish = i18n.language.startsWith("es");

  return (
    <section
      id="skills"
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <h2 className="text-4xl font-bold mb-12 text-yellow-400">
        {t("skills.title")}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {skillGroups.map((group) => (
          <div
            key={group.titleEn}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
            "
          >
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              {isSpanish ? group.titleEs : group.titleEn}
            </h3>

            <p className="text-slate-400 mb-5 text-sm">
              {isSpanish
                ? group.descriptionEs
                : group.descriptionEn}
            </p>

            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="
                    px-3
                    py-2
                    rounded-lg
                    border
                    border-yellow-400
                    bg-slate-800
                    text-sm
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;