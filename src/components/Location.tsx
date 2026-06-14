import { useTranslation } from "react-i18next";

const Location = () => {
  const { t } = useTranslation();

  return (
    <section
      id="location"
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
        {t("location.title")}
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
          {t("location.place")}
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
