import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="max-w-5xl mx-auto px-6 py-24"
    >
      <h2 className="text-4xl font-bold mb-10 text-yellow-400">
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
        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          {t("about.paragraph1")}
        </p>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          {t("about.paragraph2")}
        </p>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          {t("about.paragraph3")}
        </p>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          {t("about.paragraph4")}
        </p>

        <p className="text-lg text-slate-300 leading-relaxed">
          {t("about.paragraph5")}
        </p>
      </div>
    </section>
  );
};

export default About;