import { useTranslation } from "react-i18next";
import SectionTitle from "./SectionTitle";

type Skill = { name: string; level: "A" | "M" | "B" };
type Category = { cat: string; skills: Skill[] };
type Subgroup = { sub: string | null; categories: Category[] };
type Group = { group: string; subgroups: Subgroup[] };

type Legend = { title: string; a: string; m: string; b: string };

const levelColor = (level: string) => {
  if (level === "A") return "text-blue-400";
  if (level === "M") return "text-green-400";
  return "text-red-400";
};

const LegendBar = ({ legend }: { legend: Legend }) => (
  <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm text-ivory">
    <span><span className="font-bold text-blue-400">[A]</span> {legend.a}</span>
    <span><span className="font-bold text-green-400">[M]</span> {legend.m}</span>
    <span><span className="font-bold text-red-400">[B]</span> {legend.b}</span>
  </div>
);

const SkillTag = ({ skill }: { skill: Skill }) => (
  <span
    className="
      px-3
      py-1
      text-sm
      rounded-full
      bg-slate-800
      border
      border-slate-700
      inline-flex
      items-center
      gap-1.5
    "
  >
    {skill.name}
    <span className={"font-bold " + levelColor(skill.level)}>
      [{skill.level}]
    </span>
  </span>
);

const CategoryBlock = ({ category }: { category: Category }) => (
  <div className="mb-4">
    {category.cat && (
      <div className="text-xs font-semibold uppercase tracking-wide text-sky-300 mb-2 text-center">
        {category.cat}
      </div>
    )}
    <div className="flex flex-col items-center gap-2">
      {category.skills.map((s) => (
        <SkillTag key={s.name + s.level} skill={s} />
      ))}
    </div>
  </div>
);

const Skills = () => {
  const { t } = useTranslation();

  const hard = t("skills.hard", { returnObjects: true }) as {
    title: string;
    groups: Group[];
  };

  const soft = t("skills.soft", { returnObjects: true }) as {
    title: string;
    categories: Category[];
  };

  const legend = t("skills.levelLegend", {
    returnObjects: true,
  }) as Legend;

  return (
    <section
      id="skills"
      className="max-w-7xl mx-auto px-6 py-4"
    >
      <SectionTitle>{t("skills.title", "Skills")}</SectionTitle>

      {/* Aptitudes técnicas */}
      <h3 className="text-2xl font-bold text-blue-400 mb-4 text-center">
        {hard.title}
      </h3>

      <div className="flex flex-col items-center gap-6 mb-12">
        {hard.groups.map((group) => (
          <div
            key={group.group}
            className="
              w-fit
              max-w-full
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
            transition
            hover:-translate-y-1
          "
          >
            <div className="text-lg font-bold text-yellow-400 italic mb-2 text-center">
              {group.group}
            </div>

            <LegendBar legend={legend} />

            <div className="border-t border-yellow-400 -mx-6 mb-4" />

            {group.subgroups.map((sub, si) => (
              <div key={si} className={sub.sub ? "mb-4" : ""}>
                {sub.sub && (
                  <div className="text-sm font-bold text-ivory uppercase tracking-wide mb-3 text-center">
                    {sub.sub}
                  </div>
                )}

                {sub.sub ? (
                  <div className="border border-yellow-400 rounded-2xl p-4">
                    {sub.categories.map((cat) => (
                      <CategoryBlock key={cat.cat} category={cat} />
                    ))}
                  </div>
                ) : (
                  sub.categories.map((cat) => (
                    <CategoryBlock key={cat.cat} category={cat} />
                  ))
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Aptitudes humanas */}
      <h3 className="text-2xl font-bold text-blue-400 mb-2 text-center">
        {soft.title}
      </h3>

      <LegendBar legend={legend} />

      <div className="flex flex-wrap justify-center gap-6">
        {soft.categories.map((cat) => (
          <div
            key={cat.cat}
            className="
              w-fit
              max-w-full
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
            transition
            hover:-translate-y-1
          "
          >
            <div className="text-lg font-bold text-yellow-400 mb-4 text-center">
              {cat.cat}
            </div>

            <div className="flex flex-col items-center gap-2">
              {cat.skills.map((s) => (
                <SkillTag key={s.name + s.level} skill={s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
