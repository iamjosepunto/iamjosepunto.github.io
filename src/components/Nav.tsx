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
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b border-slate-800"
      style={{ backgroundColor: "rgba(17, 29, 51, 0.8)" }}
    >
      <nav className="max-w-full mx-auto px-6 h-16 flex items-center justify-between md:justify-center gap-5">
        <a
          href="#"
          className="font-bold text-2xl tracking-wide whitespace-nowrap shrink-0"
        >
          <span className="text-yellow-400">Jose .</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex gap-4 lg:gap-5 text-ivory whitespace-nowrap">
          <li>
            <a href="#about">{t("nav.about")}</a>
          </li>

          <li>
            <a href="#availability">{t("nav.availability")}</a>
          </li>

          <li>
            <a href="#experience">{t("nav.experience")}</a>
          </li>

          <li>
            <a href="#projects">{t("nav.projects")}</a>
          </li>

          <li>
            <a href="#education">{t("nav.education")}</a>
          </li>

          <li>
            <a href="#languages">{t("nav.languages")}</a>
          </li>

          <li>
            <a href="#skills">{t("nav.skills")}</a>
          </li>

          <li>
            <a href="#lab">{t("nav.lab")}</a>
          </li>

          <li>
            <a href="#downloads">{t("nav.downloads")}</a>
          </li>

          <li>
            <a href="#location">{t("nav.location")}</a>
          </li>

          <li>
            <a href="#contact">{t("nav.contact")}</a>
          </li>
        </ul>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center gap-4">
          <div className="text-base flex items-center">
            <button
              onClick={() => changeLanguage("en")}
              className={
                i18n.language.startsWith("en")
                  ? "text-yellow-400 font-bold cursor-pointer flex items-center gap-2"
                  : "text-ivory hover:text-yellow-300 transition cursor-pointer flex items-center gap-2"
              }
            >
              <img src="/Bandera_En.jpg" alt="EN" className="w-6 h-4 object-cover rounded-sm" />
              EN
            </button>

            <span className="mx-2 text-ivory">|</span>

            <button
              onClick={() => changeLanguage("es")}
              className={
                i18n.language.startsWith("es")
                  ? "text-yellow-400 font-bold cursor-pointer flex items-center gap-2"
                  : "text-ivory hover:text-yellow-300 transition cursor-pointer flex items-center gap-2"
              }
            >
              ES
              <img src="/Bandera_Es.jpg" alt="ES" className="w-6 h-4 object-cover rounded-sm" />
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
            <a href="#about" onClick={closeMenu}>
              {t("nav.about")}
            </a>

            <a href="#availability" onClick={closeMenu}>
              {t("nav.availability")}
            </a>

            <a href="#experience" onClick={closeMenu}>
              {t("nav.experience")}
            </a>

            <a href="#projects" onClick={closeMenu}>
              {t("nav.projects")}
            </a>

            <a href="#education" onClick={closeMenu}>
              {t("nav.education")}
            </a>

            <a href="#languages" onClick={closeMenu}>
              {t("nav.languages")}
            </a>

            <a href="#skills" onClick={closeMenu}>
              {t("nav.skills")}
            </a>

            <a href="#lab" onClick={closeMenu}>
              {t("nav.lab")}
            </a>

            <a href="#downloads" onClick={closeMenu}>
              {t("nav.downloads")}
            </a>

            <a href="#location" onClick={closeMenu}>
              {t("nav.location")}
            </a>

            <a href="#contact" onClick={closeMenu}>
              {t("nav.contact")}
            </a>

            <div className="pt-2 border-t border-slate-800 flex items-center">
              <button
                onClick={() => changeLanguage("en")}
                className={
                  i18n.language.startsWith("en")
                    ? "text-yellow-400 font-bold mr-4 flex items-center gap-2"
                    : "text-ivory mr-4 flex items-center gap-2"
                }
              >
                <img src="/Bandera_En.jpg" alt="EN" className="w-6 h-4 object-cover rounded-sm" />
                EN
              </button>

              <button
                onClick={() => changeLanguage("es")}
                className={
                  i18n.language.startsWith("es")
                    ? "text-yellow-400 font-bold flex items-center gap-2"
                    : "text-ivory flex items-center gap-2"
                }
              >
                ES
                <img src="/Bandera_Es.jpg" alt="ES" className="w-6 h-4 object-cover rounded-sm" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
