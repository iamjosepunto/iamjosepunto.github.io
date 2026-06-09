import { PROFILE } from "../data/profile";
import { useTranslation } from "react-i18next";

const Nav = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: "es" | "en") => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/80 border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-bold text-xl tracking-wide"
        >
          <span className="text-blue-400">Jose</span>
          <span className="text-yellow-400"> Punto</span>
        </a>

        <ul className="hidden md:flex gap-8">
          <li>
            <a href="#projects">{t("nav.projects")}</a>
          </li>

          <li>
            <a href="#lab">{t("nav.lab")}</a>
          </li>

          <li>
            <a href="#skills">{t("nav.skills")}</a>
          </li>

          <li>
            <a href="#about">{t("nav.about")}</a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <div className="text-sm">
            <button
              onClick={() => changeLanguage("es")}
              className={
                i18n.language.startsWith("es")
                  ? "text-yellow-400 font-bold cursor-pointer"
                  : "text-slate-400 hover:text-yellow-300 transition cursor-pointer"
              }
            >
              ES
            </button>

            <span className="mx-2 text-slate-500">|</span>

            <button
              onClick={() => changeLanguage("en")}
              className={
                i18n.language.startsWith("en")
                  ? "text-yellow-400 font-bold cursor-pointer"
                  : "text-slate-400 hover:text-yellow-300 transition cursor-pointer"
              }
            >
              EN
            </button>
          </div>

          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noreferrer"
            className="
              px-4
              py-2
              rounded-xl
              bg-blue-600
              hover:bg-yellow-400
              hover:text-slate-950
              transition
              font-medium
            "
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Nav;