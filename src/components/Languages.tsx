import { useTranslation } from "react-i18next";
import SectionTitle from "./SectionTitle";

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
      <SectionTitle>{t("languages.title")}</SectionTitle>

      <div className="flex flex-wrap justify-center gap-6">
        {items.map((item) => (
          <div
            key={item.name}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              px-8
              py-6
              text-center
            transition
            hover:-translate-y-1
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
