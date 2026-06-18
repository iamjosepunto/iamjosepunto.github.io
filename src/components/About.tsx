import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  const data = t("about.data", { returnObjects: true }) as {
    labels: Record<string, string>;
    name: string;
    birth: string;
    nationality: string;
    resident: string;
    cv: string;
    email: string;
    contact: string;
    availability: string;
    workmode: string;
  };

  const rows: { label: string; value: string; href?: string }[] = [
    { label: data.labels.name, value: data.name },
    { label: data.labels.birth, value: data.birth },
    { label: data.labels.nationality, value: data.nationality },
    { label: data.labels.resident, value: data.resident },
    { label: data.labels.cv, value: data.cv, href: data.cv },
    { label: data.labels.email, value: data.email, href: `mailto:${data.email}` },
    { label: data.labels.contact, value: data.contact },
    { label: data.labels.availability, value: data.availability },
    { label: data.labels.workmode, value: data.workmode },
  ];

  return (
    <section
      id="about"
      className="max-w-5xl mx-auto px-6 py-4"
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
        {t("about.title")}
      </h2>

      <div
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-8
        "
      >
        <p className="text-lg text-ivory leading-relaxed mb-6">
          {t("about.paragraph1")}
        </p>

        <p className="text-lg text-ivory leading-relaxed mb-6">
          {t("about.paragraph2")}
        </p>

        <p className="text-lg text-ivory leading-relaxed mb-6">
          {t("about.paragraph3")}
        </p>

        <p className="text-lg text-ivory leading-relaxed mb-6">
          {t("about.paragraph4")}
        </p>

        <p className="text-lg text-ivory leading-relaxed">
          {t("about.paragraph5")}
        </p>
      </div>

      <div
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-8
          mt-6
          flex
          flex-col
          divide-y
          divide-slate-800
        "
      >
        {rows.map((row) => (
          <div
            key={row.label}
            className="
              flex
              flex-col
              sm:flex-row
              sm:justify-center
              sm:gap-4
              py-2.5
            "
          >
            <span className="text-sm font-semibold text-blue-400 sm:w-40 shrink-0">
              {row.label}
            </span>

            {row.href ? (
              <a
                href={row.href}
                target="_blank"
                rel="noreferrer"
                className="text-ivory hover:text-yellow-400 transition break-all sm:w-72"
              >
                {row.value}
              </a>
            ) : (
              <span className="text-ivory sm:w-72">{row.value}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
