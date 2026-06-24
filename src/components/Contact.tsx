import { useState } from "react";
import { PROFILE } from "../data/profile";
import { useTranslation } from "react-i18next";
import SectionTitle from "./SectionTitle";

const Contact = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.socials.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = PROFILE.socials.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const groups = [
    {
      label: t("contact.catSocial"),
      links: [{ name: "LinkedIn", href: PROFILE.socials.linkedin }],
    },
    {
      label: t("contact.catRepos"),
      links: [
        { name: "GitHub", href: PROFILE.socials.github },
        { name: "GitLab", href: PROFILE.socials.gitlab },
      ],
    },
    {
      label: t("contact.catCommunities"),
      links: [
        { name: "DEV.to", href: PROFILE.socials.devto },
        { name: "Stack Overflow", href: PROFILE.socials.stackoverflow },
      ],
    },
    {
      label: t("contact.catPublic"),
      links: [
        { name: "WellFound", href: PROFILE.socials.wellfound },
        { name: "Arc.dev", href: PROFILE.socials.arc },
      ],
    },
  ];

  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-6 py-4"
    >
      <SectionTitle>{t("contact.title")}</SectionTitle>

      <div
        className="
          w-fit
          max-w-full
          mx-auto
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-8
            transition
            hover:-translate-y-1
          "
      >
        <p className="text-lg text-ivory leading-relaxed mb-3 text-center">
          {t("contact.subtitle")}
        </p>

        <p className="text-lg text-ivory leading-relaxed mb-6 text-center">
          <span className="text-yellow-400 font-semibold">
            {t("about.data.labels.contact")}
          </span>{" "}
          - {t("about.data.contact")}
        </p>

        <div className="flex flex-col gap-6">
          {/* Email: etiqueta centrada arriba + cajita con texto y botón Copiar */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-blue-400 text-center mb-2 uppercase">
              {t("contact.email")}
            </span>

            <div className="border border-yellow-400 rounded-xl p-4">
              <span className="text-ivory break-all flex items-center gap-3">
                {PROFILE.socials.email}
                <button
                  onClick={copyEmail}
                  className="text-base text-yellow-400 font-semibold shrink-0 cursor-pointer"
                >
                  {copied ? t("contact.copied") : t("contact.copy")}
                </button>
              </span>
            </div>
          </div>

          {/* Grupos de enlaces por categoría */}
          {groups.map((group) => (
            <div key={group.label} className="flex flex-col">
              {/* Título de categoría: fuera de la cajita, arriba, centrado */}
              <span className="text-sm font-semibold text-blue-400 text-center mb-2 uppercase">
                {group.label}
              </span>

              {/* Cajita con borde amarillo */}
              <div className="border border-yellow-400 rounded-xl p-4">
                <div className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <div key={link.href} className="flex flex-col min-w-0">
                      {/* Nombre del sitio encima del enlace */}
                      <span className="text-base font-semibold text-sky-300">
                        {link.name}
                      </span>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ivory hover:text-yellow-400 transition break-all"
                      >
                        {link.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
