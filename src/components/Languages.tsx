import { useTranslation } from "react-i18next";

type LanguageItem = {
  name: string;
  level: string;
};

const Languages = () => {
  const { t } = useTranslation();

  const items = t("languages.items", {
    returnObjects: true,
  }) as LanguageItem[];

  return (
    <section
      id="languages"
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
        {t("languages.title")}
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.name}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
            "
          >
            <h3 className="text-xl font-bold text-blue-400 mb-2">
              {item.name}
            </h3>

            <p className="text-ivory">{item.level}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Languages;
