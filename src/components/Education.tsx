import { useTranslation } from "react-i18next";

const Education = () => {
  const { t } = useTranslation();

  const rows: { label: string; value: string; href?: string }[] = [
    { label: t("education.labels.university"), value: t("education.university") },
    { label: t("education.labels.web"), value: t("education.web"), href: t("education.web") },
    { label: t("education.labels.location"), value: t("education.location") },
    { label: t("education.labels.faculty"), value: t("education.faculty") },
    { label: t("education.labels.degree"), value: t("education.degree") },
    { label: t("education.labels.period"), value: t("education.period") },
  ];

  return (
    <section
      id="education"
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
        {t("education.title")}
      </h2>

      <div
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-8
          flex
          flex-col
          gap-8
        "
      >
        <div className="flex justify-center shrink-0">
          <img
            src="/Logo_UAX.png"
            alt="Universidad Alfonso X el Sabio (UAX)"
            className="w-32 h-32 object-contain"
          />
        </div>

        <div className="flex flex-col divide-y divide-slate-800">
          {rows.map((row) => (
            <div
              key={row.label}
              className="
                flex
                flex-col
                sm:flex-row
                sm:gap-4
                py-2.5
              "
            >
              <span className="text-sm font-semibold text-blue-400 sm:w-48 shrink-0">
                {row.label}
              </span>

              {row.href ? (
                <a
                  href={row.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ivory hover:text-yellow-400 transition break-all"
                >
                  {row.value}
                </a>
              ) : (
                <span className="text-ivory">{row.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
