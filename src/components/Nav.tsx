import { useTranslation } from "react-i18next";
import { useState } from "react";

const Nav = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLanguage = (language: "es" | "en") => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
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

        {/* Desktop */}
        <ul className="hidden md:flex gap-8 text-ivory">
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

          <li>
            <a href="#contact">{t("nav.contact")}</a>
          </li>
        </ul>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center gap-4">
          <div className="text-sm">
            <button
              onClick={() => changeLanguage("es")}
              className={
                i18n.language.startsWith("es")
                  ? "text-yellow-400 font-bold cursor-pointer"
                  : "text-ivory hover:text-yellow-300 transition cursor-pointer"
              }
            >
              ES
            </button>

            <span className="mx-2 text-ivory">|</span>

            <button
              onClick={() => changeLanguage("en")}
              className={
                i18n.language.startsWith("en")
                  ? "text-yellow-400 font-bold cursor-pointer"
                  : "text-ivory hover:text-yellow-300 transition cursor-pointer"
              }
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="
            md:hidden
            text-ivory
            text-3xl
            cursor-pointer
          "
          aria-label="Menu"
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="
            md:hidden
            bg-slate-900
            border-t
            border-slate-800
          "
        >
          <div className="flex flex-col p-6 gap-6 text-ivory">
            <a href="#projects" onClick={closeMenu}>
              {t("nav.projects")}
            </a>

            <a href="#lab" onClick={closeMenu}>
              {t("nav.lab")}
            </a>

            <a href="#skills" onClick={closeMenu}>
              {t("nav.skills")}
            </a>

            <a href="#about" onClick={closeMenu}>
              {t("nav.about")}
            </a>

            <a href="#contact" onClick={closeMenu}>
              {t("nav.contact")}
            </a>

            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => changeLanguage("es")}
                className={
                  i18n.language.startsWith("es")
                    ? "text-yellow-400 font-bold mr-4"
                    : "text-ivory mr-4"
                }
              >
                ES
              </button>

              <button
                onClick={() => changeLanguage("en")}
                className={
                  i18n.language.startsWith("en")
                    ? "text-yellow-400 font-bold"
                    : "text-ivory"
                }
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;