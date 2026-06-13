import { useState } from "react";
import { PROJECT_GROUPS } from "../data/profile";
import type { TaskRef } from "../data/profile";
import { useTranslation } from "react-i18next";

const SUMMARY = "__summary__";

const Projects = () => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState<TaskRef | typeof SUMMARY>(
    PROJECT_GROUPS[0].tasks[0]
  );

  const isSummary = selected === SUMMARY;

  const base = isSummary
    ? ""
    : `projects.tareas.${(selected as TaskRef).key}`;

  const aptitudes = isSummary
    ? []
    : (t(`${base}.aptitudes`, { returnObjects: true }) as string[]);

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
        {t("projects.title")}
      </h2>

      {/* Teclado de tareas */}
      <div className="flex flex-col gap-3 mb-8">
        {/* Tecla especial: Resumen de proyectos */}
        <div className="flex md:justify-end border-b border-slate-800 pb-3">
          <button
            onClick={() => setSelected(SUMMARY)}
            className={
              "px-4 py-1.5 rounded-lg font-mono text-sm border transition cursor-pointer " +
              (isSummary
                ? "bg-yellow-400 text-slate-950 border-yellow-400 font-bold"
                : "bg-slate-900 text-ivory border-slate-700 hover:border-blue-500")
            }
          >
            {t("projects.summary.label")}
          </button>
        </div>

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
                  {t(`projects.proyectos.${group.proyectoKey}`)}
                </span>
              </div>
            </div>

            {/* Teclas */}
            <div className="flex flex-wrap gap-2 md:justify-end shrink-0">
              {[...group.tasks].reverse().map((task) => {
                const code = task.code.split(" - ").pop();
                const isActive =
                  !isSummary && (selected as TaskRef).code === task.code;

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
        {isSummary ? (
          <p className="text-ivory leading-relaxed whitespace-pre-line">
            {t("projects.summary.text")}
          </p>
        ) : (
          <>
            <div className="font-mono text-sm text-blue-400 mb-2">
              {(selected as TaskRef).code}
            </div>

            <h3 className="text-2xl font-bold text-yellow-400 mb-2">
              {t(`${base}.title`)}
            </h3>

            <div className="text-sm text-slate-400 mb-6">
              {(selected as TaskRef).dates} · {t(`${base}.duration`)}
            </div>

            <div className="flex flex-col gap-5">
              <Block label={t("projects.labels.resumen")} text={t(`${base}.resumen`)} />
              <Block label={t("projects.labels.objetivo")} text={t(`${base}.objetivo`)} />
              <Block
                label={t("projects.labels.funcionalidades")}
                text={t(`${base}.funcionalidades`)}
              />
              <Block
                label={t("projects.labels.responsabilidades")}
                text={t(`${base}.responsabilidades`)}
              />
              <Block label={t("projects.labels.tecnologias")} text={t(`${base}.tecnologias`)} />
              <Block label={t("projects.labels.resultado")} text={t(`${base}.resultado`)} />
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-blue-400 mb-3">
                {t("projects.labels.aptitudes")}
              </div>

              <div className="flex flex-wrap gap-2">
                {aptitudes.map((skill) => (
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
          </>
        )}
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
