import { useState } from "react";
import { PROJECT_GROUPS } from "../data/profile";
import type { Task } from "../data/profile";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language.startsWith("es");

  const [selected, setSelected] = useState<Task>(
    PROJECT_GROUPS[0].tasks[0]
  );

  const labels = isSpanish
    ? {
        resumen: "Resumen",
        objetivo: "Objetivo",
        funcionalidades: "Funcionalidades",
        responsabilidades: "Responsabilidades",
        tecnologias: "Tecnologías",
        resultado: "Resultado",
        aptitudes: "Aptitudes",
      }
    : {
        resumen: "Summary",
        objetivo: "Objective",
        funcionalidades: "Features",
        responsabilidades: "Responsibilities",
        tecnologias: "Technologies",
        resultado: "Result",
        aptitudes: "Skills",
      };

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-6 py-4"
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
        {isSpanish ? "Mis proyectos" : "My projects"}
      </h2>

      {/* Teclado de tareas */}
      <div className="flex flex-col gap-3 mb-8">
        {PROJECT_GROUPS.map((group) => (
          <div
            key={`${group.empresa}-${group.proyecto}`}
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-3
              border-b
              border-slate-800
              pb-3
            "
          >
            {/* Empresa + Proyecto */}
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-slate-500">
                  {group.empresa}
                </span>
                <span className="text-sm text-slate-400 truncate">
                  {group.empresaName}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-mono text-xs text-blue-400">
                  {group.proyecto}
                </span>
                <span className="text-base font-semibold text-ivory truncate">
                  {group.proyectoName}
                </span>
              </div>
            </div>

            {/* Teclas */}
            <div className="flex flex-wrap gap-2 md:justify-end shrink-0">
              {[...group.tasks].reverse().map((task) => {
                const code = task.code.split(" - ").pop();
                const isActive = selected.code === task.code;

                return (
                  <button
                    key={task.code}
                    onClick={() => setSelected(task)}
                    className={
                      "px-3 py-1.5 rounded-lg font-mono text-sm border transition cursor-pointer " +
                      (isActive
                        ? "bg-yellow-400 text-slate-950 border-yellow-400 font-bold"
                        : "bg-slate-900 text-ivory border-slate-700 hover:border-blue-500")
                    }
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Panel de detalle */}
      <article
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-8
        "
      >
        <div className="font-mono text-sm text-blue-400 mb-2">
          {selected.code}
        </div>

        <h3 className="text-2xl font-bold text-yellow-400 mb-2">
          {selected.title}
        </h3>

        <div className="text-sm text-slate-400 mb-6">
          {selected.dates} · {selected.duration}
        </div>

        <div className="flex flex-col gap-5">
          <Block label={labels.resumen} text={selected.resumen} />
          <Block label={labels.objetivo} text={selected.objetivo} />
          <Block
            label={labels.funcionalidades}
            text={selected.funcionalidades}
          />
          <Block
            label={labels.responsabilidades}
            text={selected.responsabilidades}
          />
          <Block label={labels.tecnologias} text={selected.tecnologias} />
          <Block label={labels.resultado} text={selected.resultado} />
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold text-blue-400 mb-3">
            {labels.aptitudes}
          </div>

          <div className="flex flex-wrap gap-2">
            {selected.aptitudes.map((skill) => (
              <span
                key={skill}
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
                {skill}
              </span>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};

const Block = ({ label, text }: { label: string; text: string }) => (
  <div>
    <div className="text-sm font-semibold text-blue-400 mb-1">
      {label}
    </div>
    <p className="text-ivory leading-relaxed">{text}</p>
  </div>
);

export default Projects;
