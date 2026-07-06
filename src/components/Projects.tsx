import { useRef, useState } from "react";
import { PROJECT_GROUPS } from "../data/profile";
import type { TaskRef } from "../data/profile";
import { useTranslation } from "react-i18next";
import SectionTitle from "./SectionTitle";

const SUMMARY = "__summary__";

const Projects = () => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState<TaskRef | typeof SUMMARY>(
    SUMMARY
  );

  const panelRef = useRef<HTMLElement>(null);

  const select = (value: TaskRef | typeof SUMMARY) => {
    setSelected(value);
    panelRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const isSummary = selected === SUMMARY;

  const summaryRow = (
    <div
      className="
        flex
        flex-col
        md:flex-row
        md:items-center
        gap-3
        border-b
        border-slate-800
        pb-3
      "
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="text-base font-semibold text-ivory whitespace-nowrap">
          {t("projects.summary.label")}
        </span>

        <span
          aria-hidden="true"
          className="
            hidden
            md:block
            flex-1
            border-t-2
            border-dashed
            border-slate-600
          "
        />

        <span
          aria-hidden="true"
          className="hidden md:block text-slate-600 font-mono"
        >
          &gt;&gt;
        </span>
      </div>

      <div className="flex md:justify-end shrink-0">
        <button
          onClick={() => select(SUMMARY)}
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
    </div>
  );

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-6 py-4"
    >
      <SectionTitle>{t("projects.title")}</SectionTitle>

      {/* Teclado de tareas */}
      <div className="flex flex-col gap-3 mb-8">
        {/* Tecla especial: Resumen de proyectos (arriba) */}
        {summaryRow}

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

              <div className="text-xs text-slate-500 mt-0.5 pl-8">
                {group.dates}
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
                    onClick={() => select(task)}
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

        {/* Tecla especial: Resumen de proyectos (abajo) */}
        {summaryRow}
      </div>

      {/* Panel de detalle */}
      <article
        ref={panelRef}
        className="
          scroll-mt-20
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-8
            transition
            hover:-translate-y-1
          "
      >
        {/* Panel Summary: visible sólo en modo resumen, pero siempre en el DOM */}
        <div className={isSummary ? "text-ivory leading-relaxed" : "hidden"}>
          <div className="font-semibold mb-3">
            {"<<"}{t("projects.summary.label")}{">>"}
          </div>

          <div className="flex flex-col gap-1">
            {PROJECT_GROUPS.map((group) => (
              <div key={`${group.empresa}-${group.proyecto}`}>
                <div className="mt-2">
                  • {group.empresa}-{group.proyecto}-
                  {t(`projects.proyectos.${group.proyectoKey}`)}
                </div>

                {group.tasks.map((task) => {
                  const code = task.code.split(" - ").pop();
                  return (
                    <div key={task.code} className="pl-6">
                      <button
                        onClick={() => select(task)}
                        className="
                          text-left
                          text-ivory
                          hover:text-yellow-400
                          transition
                          cursor-pointer
                        "
                      >
                        {">"}{code}-{t(`projects.tareas.${task.key}.title`)}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Detalle de CADA tarea: se renderizan TODAS para SEO (Google indexa todo el
            texto). Sólo la seleccionada es visible; el resto se ocultan por CSS pero
            permanecen en el DOM. */}
        {PROJECT_GROUPS.map((group) =>
          group.tasks.map((task) => {
            const taskBase = `projects.tareas.${task.key}`;
            const taskAptitudes = t(`${taskBase}.aptitudes`, {
              returnObjects: true,
            }) as string[];
            const isVisible =
              !isSummary && (selected as TaskRef).code === task.code;

            return (
              <div
                key={task.code}
                className={isVisible ? "" : "hidden"}
              >
                <div className="font-mono text-sm text-blue-400 mb-2">
                  {task.code}
                </div>

                <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                  {t(`${taskBase}.title`)}
                </h3>

                <div className="text-sm text-slate-400 mb-6">
                  {task.dates} · {t(`${taskBase}.duration`)} · {group.empresaName}
                </div>

                {task.url && (
                  <a
                    href={task.url}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-block
                      mb-6
                      text-yellow-400
                      hover:text-yellow-300
                      break-all
                    "
                  >
                    {t("projects.labels.viewSite")} → {task.url}
                  </a>
                )}

                <div className="flex flex-col gap-5">
                  <Block label={t("projects.labels.resumen")} text={t(`${taskBase}.resumen`)} />
                  <Block label={t("projects.labels.objetivo")} text={t(`${taskBase}.objetivo`)} />
                  <Block
                    label={t("projects.labels.funcionalidades")}
                    text={t(`${taskBase}.funcionalidades`)}
                  />
                  <Block
                    label={t("projects.labels.responsabilidades")}
                    text={t(`${taskBase}.responsabilidades`)}
                  />
                  <Block label={t("projects.labels.tecnologias")} text={t(`${taskBase}.tecnologias`)} />
                  <Block label={t("projects.labels.resultado")} text={t(`${taskBase}.resultado`)} />
                </div>

                <div className="mt-6">
                  <div className="text-sm font-semibold text-blue-400 mb-3">
                    {t("projects.labels.aptitudes")}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {taskAptitudes.map((skill) => (
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
              </div>
            );
          })
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
