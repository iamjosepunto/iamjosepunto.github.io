import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAccordion } from "./AccordionContext";

const Nav = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openId, toggle } = useAccordion();

  const changeLanguage = (language: "es" | "en") => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  // Alterna la seccion: si esta cerrada la abre y la centra en pantalla; si esta
  // abierta la cierra. Al abrir, espera a que la animacion de expansion termine antes
  // de centrar, para que el scroll se calcule con la seccion ya desplegada.
  const goToSection = (id: string) => {
    const willOpen = openId !== id;
    toggle(id);
    setMobileMenuOpen(false);

    if (!willOpen) return;

    const el = document.getElementById(id);
    if (!el) return;

    const centrar = () =>
      el.scrollIntoView({ behavior: "smooth", block: "center" });

    // El contenido colapsable anima su altura ~300ms; esperamos a que termine.
    const inner = el.querySelector("[data-collapsible-content]");
    let hecho = false;
    const ejecutar = () => {
      if (hecho) return;
      hecho = true;
      centrar();
    };

    if (inner) {
      const onEnd = () => {
        inner.removeEventListener("transitionend", onEnd);
        ejecutar();
      };
      inner.addEventListener("transitionend", onEnd);
      // Respaldo por si el evento no dispara.
      window.setTimeout(ejecutar, 400);
    } else {
      window.setTimeout(ejecutar, 400);
    }
  };

  const NavLink = ({ id, label }: { id: string; label: string }) => (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        goToSection(id);
      }}
      className="hover:text-yellow-300 transition cursor-pointer"
    >
      {label}
    </a>
  );

  const links: { id: string; label: string }[] = [
    { id: "about", label: t("nav.about") },
    { id: "availability", label: t("nav.availability") },
    { id: "experience", label: t("nav.experience") },
    { id: "projects", label: t("nav.projects") },
    { id: "education", label: t("nav.education") },
    { id: "languages", label: t("nav.languages") },
    { id: "skills", label: t("nav.skills") },
    { id: "lab", label: t("nav.lab") },
    { id: "downloads", label: t("nav.downloads") },
    { id: "location", label: t("nav.location") },
    { id: "contact", label: t("nav.contact") },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b border-slate-800"
      style={{ backgroundColor: "rgba(17, 29, 51, 0.8)" }}
    >
      <nav className="max-w-full mx-auto px-6 h-16 flex items-center justify-between md:justify-center gap-5">
        <span className="font-bold text-2xl tracking-wide whitespace-nowrap shrink-0">
          <span className="text-yellow-400">Jose .</span>
        </span>

        {/* Desktop */}
        <ul className="hidden md:flex gap-4 lg:gap-5 text-ivory whitespace-nowrap">
          {links.map((l) => (
            <li key={l.id}>
              <NavLink id={l.id} label={l.label} />
            </li>
          ))}
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
          className="md:hidden text-ivory text-3xl cursor-pointer"
          aria-label="Menu"
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="flex flex-col p-6 gap-6 text-ivory">
            {links.map((l) => (
              <NavLink key={l.id} id={l.id} label={l.label} />
            ))}

            <div className="pt-2 border-t border-slate-800 flex items-center">
              <button
                onClick={() => {
                  changeLanguage("en");
                  closeMenu();
                }}
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
                onClick={() => {
                  changeLanguage("es");
                  closeMenu();
                }}
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
