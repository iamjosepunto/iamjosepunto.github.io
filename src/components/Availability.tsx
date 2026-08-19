import { useTranslation } from "react-i18next";
import CollapsibleSection from "./CollapsibleSection";

const Availability = () => {
  const { t } = useTranslation();

  return (
    <section
      id="availability"
      className="max-w-5xl mx-auto px-6 py-0"
    >
      <CollapsibleSection title={t("availability.title")}>

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
    </CollapsibleSection>
    </section>
  );
};

export default Availability;
