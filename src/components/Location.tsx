import { useTranslation } from "react-i18next";
import SectionTitle from "./SectionTitle";

const Location = () => {
  const { t } = useTranslation();

  return (
    <section
      id="location"
      className="max-w-5xl mx-auto px-6 py-4"
    >
      <SectionTitle>{t("location.title")}</SectionTitle>

      <div
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-8
        "
      >
        <p className="text-ivory leading-relaxed mb-6">
          {t("location.description")}
        </p>

        <div className="rounded-2xl overflow-hidden border border-slate-800">
          <iframe
            title={t("location.title")}
            src="https://www.google.com/maps?q=45006+Toledo,+Espa%C3%B1a&output=embed"
            className="w-full h-80 md:h-96"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default Location;
