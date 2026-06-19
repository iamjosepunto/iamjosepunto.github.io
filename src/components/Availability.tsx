import { useTranslation } from "react-i18next";
import SectionTitle from "./SectionTitle";

const Availability = () => {
  const { t } = useTranslation();

  return (
    <section
      id="availability"
      className="max-w-5xl mx-auto px-6 py-4"
    >
      <SectionTitle>{t("availability.title")}</SectionTitle>

      <div
        className="
          bg-slate-900
          border
          border-yellow-400
          rounded-2xl
          p-8
            transition
            hover:-translate-y-1
          "
      >
        <h3 className="text-2xl font-bold text-yellow-400 mb-3">
          {t("availability.cta.title")}
        </h3>

        <p className="text-lg text-ivory leading-relaxed">
          {t("availability.cta.text")}
        </p>
      </div>
    </section>
  );
};

export default Availability;
