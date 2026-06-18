import { useRef, useState } from "react";
import { EXPERIENCE_GROUPS } from "../data/profile";
import type { ExperienceRef } from "../data/profile";
import { useTranslation } from "react-i18next";

const Experience = () => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState<ExperienceRef>(
    EXPERIENCE_GROUPS[0]
  );

  const panelRef = useRef<HTMLElement>(null);

  const select = (value: ExperienceRef) => {
    setSelected(value);
    panelRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const base = `experience.items.${selected.key}`;

  const bullets = t(`${base}.bullets`, {
    returnObjects: true,
  }) as string[];

  const aptitudes = t(`${base}.aptitudes`, {
    returnObjects: true,
  }) as string[];

  return (
    <section
      id="experience"
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
        {t("experience.title")}
      </h2>

      {/* Teclado de experiencias */}
      <div className="flex flex-col gap-3 mb-8">
        {EXPERIENCE_GROUPS.map((exp) => {
          const isActive = selected.code === exp.code;

          return (
            <div
              key={exp.code}
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                gap-3
                md:gap-5
                border-b
                border-slate-800
                pb-3
              "
            >
              {/* Empresa */}
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-slate-500">
                    {exp.code}
                  </span>
                  <span className="text-base font-semibold text-ivory truncate">
                    {exp.company}
                  </span>
                </div>

                <div className="text-sm text-slate-400 mt-0.5 pl-8">
                  {t(`experience.items.${exp.key}.title`)}
                </div>

                <div className="text-xs text-slate-500 mt-0.5 pl-8">
                  {exp.dates} · {t(`experience.items.${exp.key}.duration`)}
                </div>
              </div>

              {/* Tecla */}
              <div className="flex shrink-0">
                <button
                  onClick={() => select(exp)}
                  className={
                    "px-3 py-1.5 rounded-lg font-mono text-sm border transition cursor-pointer " +
                    (isActive
                      ? "bg-yellow-400 text-slate-950 border-yellow-400 font-bold"
                      : "bg-slate-900 text-ivory border-slate-700 hover:border-blue-500")
                  }
                >
                  {exp.code}
                </button>
              </div>
            </div>
          );
        })}
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
        "
      >
        <div className="font-mono text-sm text-blue-400 mb-2">
          {selected.code}
        </div>

        <h3 className="text-2xl font-bold text-yellow-400 mb-2">
          {t(`${base}.title`)}
        </h3>

        <div className="text-sm text-slate-400 mb-1">
          {selected.company} · {t(`${base}.schedule`)}
        </div>

        <div className="text-sm text-slate-400 mb-1">
          {selected.dates} · {t(`${base}.duration`)}
        </div>

        <div className="text-sm text-slate-400 mb-6">
          {t(`${base}.location`)}
        </div>

        <p className="text-ivory leading-relaxed mb-4">
          {t(`${base}.intro`)}
        </p>

        <ul className="flex flex-col gap-3 mb-6">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-ivory leading-relaxed">
              <span className="text-yellow-400 shrink-0">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="text-sm font-semibold text-blue-400 mb-3">
          {t("experience.labels.aptitudes")}
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
      </article>
    </section>
  );
};

export default Experience;
